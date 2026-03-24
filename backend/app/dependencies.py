# from fastapi import Depends, HTTPException, status
# from app.models.usuario import Usuario
# from app.dependencies import get_current_user

# Dependência que só deixa passar se o usuário for admin
# def require_admin(usuario: Usuario = Depends(get_current_user)):
#     if usuario.role != "admin":
#         raise HTTPException(
#             status_code=status.HTTP_403_FORBIDDEN,
#             detail="Acesso restrito a administradores"
#         )
#     return usuario