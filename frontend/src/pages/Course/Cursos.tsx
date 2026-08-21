import { useEffect, useState } from "react";
import { getCursos } from "../../api/cursos";
import type { Curso } from "../../types/Curso";
import CourseCard from "../../Components/Course/CourseCard/CourseCard";

function Cursos() {
    const [cursos, setCursos] = useState<Curso[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function carregarCursos() {
            try {
                const data = await getCursos();
                setCursos(data);
            } catch (error) {
                setError("Não foi possível carregar os cursos.");
            } finally {
                setLoading(false);
            }
        }

        carregarCursos();
    }, []);

    if (loading) {
        return <p>Carregando cursos...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }
    return (
        <main>
            <h1>Cursos</h1>

            <div>
                {cursos.map((curso) => (
                    <CourseCard
                        key={curso.id}
                        id={curso.id}
                        titulo={curso.titulo}
                        descricao={curso.descricao}
                        nivel={curso.nivel}
                        capa_url={curso.capa_url}
                        total_aulas={curso.total_aulas}
                        />
                    ))}
            </div>
        </main>
    );
}

export default Cursos;