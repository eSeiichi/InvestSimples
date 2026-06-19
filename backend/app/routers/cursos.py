from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from uuid import UUID
from app.dependencies import get_current_user, get_db
from app.models.users import Usuario
from app.models.curso import Curso, Aula
from app.schemas.curso import (
    CursoCreate, CursoResponse, CursoListResponse, CursoUpdate,
    AulaCreate, AulaResponse, AulaUpdate
)

router = APIRouter(prefix="/cursos", tags=["Cursos"])

# ── Rotas de Cursos ──────────────────────────────────────────

@router.get("/", response_model=list[CursoListResponse])
def listar_cursos(db: Session = Depends(get_db)):
    """Lista todos os cursos disponíveis com total de aulas."""
    cursos = db.query(Curso).all()
    resultado = []
    for curso in cursos:
        # Conta o número de aulas associadas a este curso
        total = db.query(Aula).filter(Aula.curso_id == curso.id).count()
        item = CursoListResponse.model_validate(curso)
        item.total_aulas = total
        resultado.append(item)
    return resultado

@router.get("/{curso_id}", response_model=CursoResponse)
def obter_curso(curso_id: UUID, db: Session = Depends(get_db)):
    """Retorna um curso específico com todas as suas aulas."""
    curso = db.query(Curso).filter(Curso.id == curso_id).first()
    if not curso:
        raise HTTPException(status_code=404, detail="Curso não encontrado")
    return curso

@router.post("/", response_model=CursoResponse, status_code=201)
def criar_curso(dados: CursoCreate, db: Session = Depends(get_db),
                usuario: Usuario = Depends(get_current_user)):
    """Cria um novo curso. Acesso restrito a administradores."""
    if usuario.role != "admin":
        raise HTTPException(status_code=403, detail="Apenas admins podem criar cursos")
    curso = Curso(**dados.model_dump())
    db.add(curso)
    db.commit()
    db.refresh(curso)
    return curso

@router.patch("/{curso_id}", response_model=CursoResponse)
def atualizar_curso(
      curso_id: UUID,
      dados: CursoUpdate,  # Usar a classe CursoUpdate (campos opcionais)
      db: Session = Depends(get_db),
      usuario: Usuario = Depends(get_current_user)  # ← Valida o token JWT
  ):
      # Verifica se é admin
      if usuario.role != "admin":
          raise HTTPException(status_code=403, detail="Apenas admins podem atualizar cursos")

      curso = db.query(Curso).filter(Curso.id == curso_id).first()
      if not curso:
          raise HTTPException(status_code=404, detail="Curso não encontrado")

      # Atualiza apenas campos preenchidos (exclude_none=True)
      for campo, valor in dados.model_dump(exclude_none=True).items():
          setattr(curso, campo, valor)

      db.commit()
      db.refresh(curso)
      return curso

# ── Rotas de Aulas ──────────────────────────────────────────

@router.post("/{curso_id}/aulas", response_model=AulaResponse, status_code=201)
def criar_aula(curso_id: UUID, dados: AulaCreate, db: Session = Depends(get_db),
               usuario: Usuario = Depends(get_current_user)):
    """Adiciona uma nova aula a um curso. Acesso restrito a administradores."""
    if usuario.role != "admin":
        raise HTTPException(status_code=403, detail="Apenas admins podem criar aulas")
    # Verifica se o curso existe antes de criar a aula
    curso = db.query(Curso).filter(Curso.id == curso_id).first()
    if not curso:
        raise HTTPException(status_code=404, detail="Curso não encontrado")
    # Cria a aula associada ao curso
    aula = Aula(**dados.model_dump(), curso_id=curso_id)
    db.add(aula)
    db.commit()
    db.refresh(aula)
    return aula

@router.get("/{curso_id}/aulas", response_model=list[AulaResponse])
def listar_aulas(curso_id: UUID, db: Session = Depends(get_db)):
    """Lista todas as aulas de um curso, ordenadas pela ordem definida."""
    return db.query(Aula).filter(Aula.curso_id == curso_id).order_by(Aula.ordem).all()

@router.patch("/{curso_id}/aulas/{aula_id}", response_model=AulaResponse)
def atualizar_aula(
    curso_id: UUID,
    aula_id: UUID,
    dados: AulaUpdate,  
    db: Session = Depends(get_db),
    usuario: Usuario = Depends(get_current_user)  # ←Valida o token JWT
  ):
    """Atualiza uma aula específica dentro de um cursoespecífico (apenas admin)."""
    # Verifica se é admin
    if usuario.role != "admin":
        raise HTTPException(status_code=403,detail="Apenas admins podem atualizar aulas")
    # Verifica se o curso existe
    curso = db.query(Curso).filter(Curso.id == curso_id).first()
    if not curso:
        raise HTTPException(status_code=404, detail="Curso não encontrado")
    # Verifica se a aula existe e pertence ao curso
    aula = db.query(Aula).filter(Aula.id == aula_id, Aula.curso_id == aula_id).first()
    if not aula:
        raise HTTPException(status_code=404, detail="Aula não encontrada ou não pertence ao curso")
    
    # Atualiza apenas campos preenchidos
    for campo, valor in dados.model_dum(exclude_none=True).items():
        setattr(aula, campo, valor)
    db.commit()
    db.refresh(curso)
    return aula