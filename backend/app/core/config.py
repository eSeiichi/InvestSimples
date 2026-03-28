from pathlib import Path
from pydantic_settings import BaseSettings
from pydantic import ConfigDict

ENV_PATH = Path(__file__).resolve().parents[3] / ".env"

class Settings(BaseSettings):
    DATABASE_URL: str
    SECRET_KEY: str
    ALGORITHM: str 
    ACCESS_TOKEN_EXPIRE_MINUTES: int 

    model_config = ConfigDict(env_file=str(ENV_PATH))        # lê automaticamente do arquivo .env

settings = Settings()