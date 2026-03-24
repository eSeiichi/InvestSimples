from pydantic import BaseModel, ConfigDict
from typing import Optional
from uuid import UUID


# Aulas

class AulaBase(BaseModel):
    titulo = str
    descricao = Optional[str] = None        # descricao do conteúdo da aula
    conteudo: Optional[str] = None          # texto de conteúdo com md e html
    url_video = Optional[str] = None        # vídeo da aula
    duracao_minutos: Optional[int] = None   # exibido na sidebar ao lado do título
    ordem: int = 0                          # posição dentro do módulo

    model_config = ConfigDict(
        str_strip_whitespace=True,
        str_min_length=1                    # título não pode ser vazio
    )

class AulaCreate(AulaBase):
    curso_id: UUID                         # aula sempre pertence a um módulo

class AulaResponse():
    id: UUID
    curso_id: UUID

    model_config = ConfigDict(
        from_attributes=True,               # serializa ORM
        str_strip_whitespace=True
    )

# Cursos

class CursoBase(BaseModel):
    titulo: str
    descricao: Optional[str] = None
    nivel: str = "iniciante"                # iniciante/intermediário/avançado
    capa_url: Optional[str] = None

    model_config = ConfigDict(
        str_strip_whitespace=True,
        str_min_length=1
    )

class CursoCreate(CursoBase):
    pass

class CursoListResponse(CursoBase):
    id: UUID
    total_aulas: int = 0                   # calculado no router

    model_config = ConfigDict(
        from_attributes=True,
        str_strip_whitespace=True
    )

