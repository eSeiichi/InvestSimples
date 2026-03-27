from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.orm import Session
from jose import jwt, JWTError
from app.database import SessionLocal
from app.core.config import settings
from app.models.users import Usuario

# não sei ainda como funciona
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/auth/login")

#instancia uma session do sqlalchemy para ser utilizado routers/
def get_db():
    """Abre uma sessão do banco e garante que ela fecha ao fim do request."""
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


def get_current_user(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)) -> Usuario:
    """Decodifica o JWT e retorna o usuário logado. Levanta 401 se inválido."""
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Token inválido ou expirado",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, settings.SECRET_KEY, algorithms=[settings.ALGORITHM])
        user_id: str = payload.get("sub")
        if user_id is None:
            raise credentials_exception
    except JWTError:
        raise credentials_exception

    usuario = db.query(Usuario).filter(Usuario.id == user_id).first()
    if usuario is None:
        raise credentials_exception
    return usuario



def require_admin(usuario: Usuario = Depends(get_current_user)):
    """Bloqueia o endpoint com 403 se o usuário não for admin."""
    if usuario.role != "admin":
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Acesso restrito a administradores")
    return usuario