from fastapi import APIRouter, Depends
from schema.users import UserCreate

router = APIRouter()

@router.post("/register")
def CriarUser(user: UserCreate):
    