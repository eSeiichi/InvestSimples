from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.database import engine, Base
from app.models import users  # importa todos os models para o Base reconhecer
from app.routers import auth, cursos

# cria as tabelas automaticamente
Base.metadata.create_all(bind=engine)

app = FastAPI(title="InvestSimples", version="1.0.0")

# libera o frontend React acessar o backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # porta padrão do Vite
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

#--registra as rotas -------------

# instanciando router do auth (user)
app.include_router(auth.router)


@app.get("/")
def root():
    return {"message": "InvestSimples API rodando"}