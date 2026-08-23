import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import type { AulaResponse } from "../../types/Aula";
import { getAula } from "../../api/aulas";
import CourseSidebar from "../../components/Course/CourseSidebar/CourseSidebar";
import RedirectButton from "../../components/form/RedirectButton/RedirectButton";

function Aula() {
  const { cursoId } = useParams<{ cursoId: string }>();
  const { aulaId } = useParams<{ aulaId: string }>();

  const [aula, setAula] = useState<AulaResponse | null>(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function carregarAula() {
      if (!cursoId || !aulaId) {
        setError("Curso ou aula não informado.");
        setLoading(false);
        return;
      }

      try {
        const data = await getAula(cursoId, aulaId);
        setAula(data);
      } catch {
        setError("Não foi possível carregar a aula.");
      } finally {
        setLoading(false);
      }
    }

    carregarAula();
  }, [cursoId, aulaId]);

  if (loading) {
    return <p>Carregando Aula...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!aula) {
    return <p>Aula não encontrada.</p>;
  }

  return (
    <div>
      <div>
        <CourseSidebar />
        <RedirectButton link={`/cursos/${cursoId}`}>
            <h2>Voltar</h2>
        </RedirectButton>
      </div>
      <div>
        <h1>{aula.titulo}</h1>
        <h2>{aula.descricao}</h2>
        
      </div>
    </div>
  );
}

export default Aula;
