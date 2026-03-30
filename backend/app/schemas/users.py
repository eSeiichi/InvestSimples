from pydantic import BaseModel, EmailStr, ConfigDict
from typing import Optional, Literal
from uuid import UUID

# Base pública — campos que podem aparecer em respostas
class UserBase(BaseModel):
    nome: str
    username: Optional[str] = None
    email: EmailStr                             # valida formato de e-mail automaticamente
    role: Literal["aluno", "admin"] = "aluno"  # Literal é melhor que str puro: só aceita esses dois valores

    model_config = ConfigDict(
        str_strip_whitespace=True,
        str_min_length=1
    )

# Dados que chegam no POST 
class UserCreate(UserBase):
    senha: str                                 

# Resposta pública da API
class UserResponse(UserBase):
    id: UUID

    model_config = ConfigDict(
        from_attributes=True,                   # serializa objeto ORM direto
        str_strip_whitespace=True
    )

# Atualização parcial — PATCH /me
class UserUpdate(BaseModel):
    nome: Optional[str] = None
    username: Optional[str] = None
    email: Optional[EmailStr] = None

    model_config = ConfigDict(
        str_strip_whitespace=True,
        str_min_length=1                        # se vier, não pode ser vazio
    )