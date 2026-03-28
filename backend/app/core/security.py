from passlib.context import CryptContext
from datetime import datetime, timedelta, timezone
from jose import jwt
from app.core.config import settings

# contexto de hash — bcrypt é o algoritmo mais seguro para senhas
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# ── SENHA ─────────────────────────────────────────────────────────────────────

def hash_senha(senha: str) -> str:
    """Recebe a senha pura e retorna o hash para salvar no banco.
    Nunca salve a senha pura — sempre passe por essa função antes do db.add()."""
    return pwd_context.hash(senha)

def verificar_senha(senha_pura: str, senha_hash: str) -> bool:
    """Compara a senha digitada com o hash salvo no banco.
    Retorna True se bater, False se não bater."""
    return pwd_context.verify(senha_pura, senha_hash)

# ── JWT ───────────────────────────────────────────────────────────────────────

def criar_token(data: dict) -> str:
    """Gera um JWT assinado com os dados do usuário.
    O campo 'sub' (subject) deve ser o id do usuário como string."""
    payload = data.copy()

    # define quando o token expira
    expira = datetime.now(timezone.utc) + timedelta(
        minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES
    )
    payload.update({"exp": expira})

    return jwt.encode(payload, settings.SECRET_KEY, algorithm=settings.ALGORITHM)

def decodificar_token(token: str) -> dict:
    """Decodifica e valida o JWT. Levanta JWTError se inválido ou expirado.
    Usado no dependencies.py para extrair o usuário do token."""
    return jwt.decode(token, settings.SECRET_KEY, algorithms=[settings.ALGORITHM])