from pydantic import BaseModel, EmailStr, ConfigDict
from typing import Optional
from uuid import UUID

#Schema para a criação de usuário (dados que chegam pelo POST)
class UserCreate(BaseModel):
    nome: str 
    username: Optional[str] = None
    email: EmailStr                     #valida formato de e-mail automaticamente
    senha: str
    role: str = "aluno"                 #role padrão aluno
    model_config = ConfigDict(
        str_strip_whitespace=True,
        str_min_length=1
        )

# Schema de resposta após login ou consulta 
class UserResponse(BaseModel):
    id: UUID
    nome: str
    username: Optional[str] = None
    email: str
    role: str

    model_config = ConfigDict(
        from_attributes= True,          #serializa objeto ORM direto
        str_strip_whitespace = True
    )


class UserGet(BaseModel):
    nome: str
    username: str
    email: str
    role: str

    model_config = ConfigDict(
        from_attributes=True,
        str_strip_whitespace=True
    )

class UserUpdate(BaseModel):
    nome: Optional[str] = None
    username: Optional[str] = None
    email: Optional[EmailStr] = None

    model_config = ConfigDict(
        str_strip_whitespace=True,
        str_min_length=1
    )