from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy import String, Text, Integer, ForeignKey
from uuid import uuid4, UUID
from typing import Optional
from app.database import Base

class Curso(Base):
    __tablename__ = "cursos"

    id: Mapped[UUID] = mapped_column(primary_key=True, default=uuid4)
    titulo: Mapped[str] = mapped_column(String(200), nullable=False)
    descricao: Mapped[Optional[str]] = mapped_column(Text, nullable=True)
    nivel: Mapped[str] = mapped_column(String(20), default="iniciante")
    capa_url: Mapped[Optional[str]] = mapped_column(String(500), nullable=True)

    aulas: Mapped[list["Aula"]] = relationship("Aula", back_populates="curso")

class Aula(Base):
    __tablename__ = "aulas"

    id: Mapped[UUID] = mapped_column(primary_key=True, default=uuid4)
    titulo: Mapped[str] = mapped_column(String(200), nullable=False)
    descricao: Mapped[Optional[str]] = mapped_column(Text, nullable=True)
    conteudo: Mapped[Optional[str]] = mapped_column(Text, nullable=True)
    url_video: Mapped[Optional[str]] = mapped_column(String(500), nullable=True)
    duracao_minutos: Mapped[Optional[int]] = mapped_column(Integer, nullable=True)
    ordem: Mapped[int] = mapped_column(Integer, default=0)
    curso_id: Mapped[UUID] = mapped_column(ForeignKey("cursos.id"), nullable=False)

    curso: Mapped["Curso"] = relationship("Curso", back_populates="aulas")