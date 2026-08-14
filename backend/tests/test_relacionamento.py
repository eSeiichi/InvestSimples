from app.database import SessionLocal
from app.models.curso import Curso, Aula

db = SessionLocal()

try:
    curso = db.query(Curso).first()

    if curso is None:
        print("Nenhum curso encontrado.")
    else:
        print("Curso:", curso.titulo)
        print("Aulas:", curso.aulas)
        print("Quantidade:", len(curso.aulas))

        if curso.aulas:
            aula = curso.aulas[0]

            print("\nPrimeira aula:")
            print("Título:", aula.titulo)
            print("Curso relacionado:", aula.curso.titulo)

finally:
    db.close()