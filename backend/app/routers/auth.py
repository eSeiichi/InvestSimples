from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session

from app.dependencies import get_db, get_current_user
from app.models.users import Usuario
from app.schemas.users import UserCreate, UserResponse, UserUpdate
from app.core.security import hash_senha, verificar_senha, criar_token

router = APIRouter(prefix="/auth", tags=["auth"])

# ── Rotas de Autenticação ──────────────────────────────────────────

@router.post("/register", response_model=UserResponse, status_code=201)
def criar_usuario(user: UserCreate, db: Session = Depends(get_db)):
    """Cria uma nova conta de usuário.

    Retorna erro 400 se o e-mail já estiver em uso.
    A senha é hasheada antes de ser armazenada.
    """
    # Verifica se já existe um usuário com esse e-mail
    existente = db.query(Usuario).filter(Usuario.email == user.email).first()
    if existente:
        raise HTTPException(status_code=400, detail="Email já cadastrado")

    # Cria o objeto com a senha já hasheada — nunca salva a senha pura
    novo_usuario = Usuario(
        nome=user.nome,
        username=user.username,
        email=user.email,
        senha_hash=hash_senha(user.senha),
        role=user.role,
    )
    db.add(novo_usuario)
    db.commit()
    db.refresh(novo_usuario)   # Atualiza o objeto com o ID gerado pelo banco
    return novo_usuario

@router.post("/login")
def login(form: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    """Autentica o usuário e retorna o JWT.

    Usa o padrão OAuth2 (username + password).
    O campo 'username' é tratado como e-mail para validação.
    """
    # Busca o usuário pelo e-mail (campo 'username' do OAuth2)
    usuario = db.query(Usuario).filter(Usuario.email == form.username).first()
    if not usuario or not verificar_senha(form.password, usuario.senha_hash):
        raise HTTPException(status_code=401, detail="Email ou senha incorretos")

    # Gera o token JWT com o ID do usuário como subject e role
    token = criar_token({"sub": str(usuario.id), "role": usuario.role})
    return {"access_token": token, "token_type": "bearer"}

# Rotas protegidas - requerem autenticação via JWT

@router.get("/me", response_model=UserResponse)
def perfil(usuario: Usuario = Depends(get_current_user)):
    """Retorna o perfil do usuário autenticado pelo JWT."""
    return usuario
@router.patch("/me", response_model=UserResponse)
def atualizar_perfil(dados: UserUpdate, db: Session = Depends(get_db), usuario: Usuario = Depends(get_current_user)):
    """Atualiza os dados do usuário autenticado.

 Campos None são ignorados (atualização parcial).
    """
    for campo, valor in dados.model_dump(exclude_none=True).items():
        setattr(usuario, campo, valor)
    db.commit()
    db.refresh(usuario)
    return usuario