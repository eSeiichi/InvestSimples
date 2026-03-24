from pydantic import BaseModel, ConfigDict
from typing import Optional
from uuid import UUID
from datetime import datetime

class ProgressoCreate(BaseModel):
    aula_id: UUID                          # enviado no POST /progresso/{aula_id}/concluir

class ProgressoResponse(BaseModel):
    id: UUID
    usuario_id: UUID
    aula_id: UUID
    concluida: bool = False

    model_config = ConfigDict(
        from_attributes=True               # serializa ORM direto
    )

# Calculado no router — não vem do ORM, então sem from_attributes
class ProgressoCursoResponse(BaseModel):
    curso_id: UUID
    titulo_curso: str
    total_aulas: int
    aulas_concluidas: int
    percentual: float                      # 0.0 a 100.0
    certificado_disponivel: bool           # True quando percentual == 100.0

    model_config = ConfigDict(
        str_strip_whitespace=True
    )