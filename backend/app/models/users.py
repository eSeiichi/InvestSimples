from sqlalchemy.orm import Mapped, mapped_column
from sqlalchemy import String
from uuid import UUID, uuid4
from app.database import Base
from typing import Optional

class Usuario(Base):
    __tablename__ = "usuarios"

    # uuid gerado automaticamente no momento da criação
    id: Mapped[UUID] = mapped_column(primary_key=True, default=uuid4)
    nome: Mapped[str] = mapped_column(String(100), nullable=False)
    username: Mapped[Optional[str]] = mapped_column(String(50), unique=True, nullable=True)
    email: Mapped[str] = mapped_column(String(200), unique=True, index=True)
    senha_hash: Mapped[str] = mapped_column(String(200))  # nunca salva a senha pura
    role: Mapped[str] = mapped_column(String(20), default="aluno")