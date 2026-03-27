from pydantic import BaseModel, EmailStr, ConfigDict
from typing import Optional, Literal
from uuid import UUID

#Schema base de usuário
class UserBase(BaseModel):
    nome: str 
    username: Optional[str] = None
    email: EmailStr                     #valida formato de e-mail automaticamente
    senha: str
    role: Literal["aluno", "admin"] = "aluno"   #role padrão aluno 
    model_config = ConfigDict(
        str_strip_whitespace=True,
        str_min_length=1
        )

#dados que chegam do POST
class UserCreate(UserBase):
    senha: str

# Resposta pública da api
class UserResponse(UserBase):
    id: UUID

    model_config = ConfigDict(
        from_attributes= True,          #serializa objeto ORM direto
    )

# Atualização parcial de dados
class UserUpdate(BaseModel):
    nome: Optional[str] = None
    username: Optional[str] = None
    email: Optional[EmailStr] = None

    model_config = ConfigDict(
        str_strip_whitespace=True,
        str_min_length=1
    )