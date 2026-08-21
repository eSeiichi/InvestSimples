import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import RedirectButton from "../../components/form/RedirectButton/RedirectButton"
import { getCurso } from "../../api/cursos";
import type { ListCurso } from "../../types/Curso";
import styles from "./Curso.module.css";

function Curso() {
  const { cursoId } = useParams<{ cursoId: string }>();

  const [curso, setCurso] = useState<ListCurso | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function carregarCurso() {
      if (!cursoId) {
        setError("Curso não informado.");
        setLoading(false);
        return;
      }

      try {
        const data = await getCurso(cursoId);
        setCurso(data);
      } catch {
        setError("Não foi possível carregar o curso.");
      } finally {
        setLoading(false);
      }
    }

    carregarCurso();
  }, [cursoId]);

  if (loading) {
    return <p>Carregando curso...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!curso) {
    return <p>Curso não encontrado.</p>;
  }

  return (
    <div className={styles.curso}>
      <div>
        <RedirectButton link="/cursos">
            <h1>voltar</h1>
        </RedirectButton>
      </div>
      <div>
        <h1>{curso.titulo}</h1>

        <p>{curso.descricao}</p>

        <p>Nível: {curso.nivel}</p>
      </div>
      <div>
        <h2>Aulas</h2>

        {curso.aulas.map((aula) => (
          <Link to={`/cursos/${curso.id}/aulas/${aula.id}`}>
            <div key={aula.id}>
              <h3>{aula.titulo}</h3>
              <p>{aula.descricao}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Curso;
