from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from uuid import UUID
from datetime import datetime, timezone
from app.dependencies import get_current_user, get_db
from app.models.users import Usuario
from app.models.curso import Aula
from app.models.progresso import Progresso
from app.schemas.progresso import ProgressoResponse

router = APIRouter(prefix="/progresso", tags=["Progresso"])

@router.post("/{aula_id}/concluir", response_model=ProgressoResponse, status_code=201)
def concluir_aula(aula_id: UUID, db: Session = Depends(get_db),
                  usuario: Usuario = Depends(get_current_user)):
    """Marca uma aula como concluída pelo usuário logado."""
    aula = db.query(Aula).filter(Aula.id == aula_id).first()
    if not aula:
        raise HTTPException(status_code=404, detail="Aula não encontrada")

    progresso = db.query(Progresso).filter(
        Progresso.usuario_id == usuario.id,
        Progresso.aula_id == aula_id
    ).first()
    if progresso:
        raise HTTPException(status_code=400, detail="Aula já concluída")

    progresso = Progresso(
        usuario_id=usuario.id,
        aula_id=aula_id,
        concluida=True,
        data_conclusao=datetime.now(timezone.utc)
    )
    db.add(progresso)
    db.commit()
    db.refresh(progresso)
    return progresso

@router.delete("/{aula_id}/concluir", status_code=204)
def desconcluir_aula(aula_id: UUID, db: Session = Depends(get_db),
                     usuario: Usuario = Depends(get_current_user)):
    """Desmarca uma aula como concluída."""
    progresso = db.query(Progresso).filter(
        Progresso.usuario_id == usuario.id,
        Progresso.aula_id == aula_id
    ).first()
    if not progresso:
        raise HTTPException(status_code=404, detail="Progresso não encontrado")
    db.delete(progresso)
    db.commit()

@router.get("/curso/{curso_id}", response_model=list[ProgressoResponse])
def progresso_no_curso(curso_id: UUID, db: Session = Depends(get_db),
                       usuario: Usuario = Depends(get_current_user)):
    """Retorna o progresso do usuário logado em um curso."""
    aulas = db.query(Aula).filter(Aula.curso_id == curso_id).all()
    aula_ids = [aula.id for aula in aulas]
    if not aula_ids:
        raise HTTPException(status_code=404, detail="Curso não encontrado ou sem aulas")
    return db.query(Progresso).filter(
        Progresso.usuario_id == usuario.id,
        Progresso.aula_id.in_(aula_ids)
    ).all()
