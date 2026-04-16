from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from uuid import UUID
from app.dependencies import get_current_user, get_db
from app.models.users import Usuario
from app.models.curso import Curso, Aula
from app.schemas.curso import (
    CursoCreate, CursoResponse, CursoListResponse,
    AulaCreate, AulaResponse
)

router = APIRouter(prefix="/cursos", tags=["Cursos"])

# ── Cursos ──────────────────────────────────────────

@router.get("/", response_model=list[CursoListResponse])
def listar_cursos(db: Session = Depends(get_db)):
    """Lista todos os cursos disponíveis."""
    cursos = db.query(Curso).all()
    resultado = []
    for curso in cursos:
        total = db.query(Aula).filter(Aula.curso_id == curso.id).count()
        item = CursoListResponse.model_validate(curso)
        item.total_aulas = total
        resultado.append(item)
    return resultado

@router.get("/{curso_id}", response_model=CursoResponse)
def obter_curso(curso_id: UUID, db: Session = Depends(get_db)):
    """Retorna um curso com todas as suas aulas."""
    curso = db.query(Curso).filter(Curso.id == curso_id).first()
    if not curso:
        raise HTTPException(status_code=404, detail="Curso não encontrado")
    return curso

@router.post("/", response_model=CursoResponse, status_code=201)
def criar_curso(dados: CursoCreate, db: Session = Depends(get_db),
                usuario: Usuario = Depends(get_current_user)):
    """Cria um novo curso. Apenas admins."""
    if usuario.role != "admin":
        raise HTTPException(status_code=403, detail="Apenas admins podem criar cursos")
    curso = Curso(**dados.model_dump())
    db.add(curso)
    db.commit()
    db.refresh(curso)
    return curso

# ── Aulas ──────────────────────────────────────────

@router.post("/{curso_id}/aulas", response_model=AulaResponse, status_code=201)
def criar_aula(curso_id: UUID, dados: AulaCreate, db: Session = Depends(get_db),
               usuario: Usuario = Depends(get_current_user)):
    """Adiciona uma aula a um curso. Apenas admins."""
    if usuario.role != "admin":
        raise HTTPException(status_code=403, detail="Apenas admins podem criar aulas")
    curso = db.query(Curso).filter(Curso.id == curso_id).first()
    if not curso:
        raise HTTPException(status_code=404, detail="Curso não encontrado")
    aula = Aula(**dados.model_dump(), curso_id=curso_id)
    db.add(aula)
    db.commit()
    db.refresh(aula)
    return aula

@router.get("/{curso_id}/aulas", response_model=list[AulaResponse])
def listar_aulas(curso_id: UUID, db: Session = Depends(get_db)):
    """Lista todas as aulas de um curso ordenadas."""
    return db.query(Aula).filter(Aula.curso_id == curso_id).order_by(Aula.ordem).all()