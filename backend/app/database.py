from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, DeclarativeBase
from app.core.config import settings

#instanciando engine do sqlalchemy
engine = create_engine(settings.DATABASE_URL)

#instanciando session do sqlalchemy
SessionLocal = sessionmaker(bind=engine, autocommit=False, autoflush=False)

#Criando classe Base, para ser utilizada na instância de tables nos models/
class Base(DeclarativeBase):
    pass