import { useCallback, useEffect, useState } from "react";
import { getCurso } from "../api/cursos";
import type { ListCurso } from "../types/Curso";

export function useCurso(cursoId: string | undefined) {
  const [curso, setCurso] = useState<ListCurso | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const recarregar = useCallback(async () => {
    if (!cursoId) {
      setError("Id do curso não informado");
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);
    try {
      setCurso(await getCurso(cursoId));
    } catch {
      setError("Não foi possível carregar o curso.");
    } finally {
      setLoading(false);
    }
  }, [cursoId]);

  useEffect(() => {
    recarregar();
  }, [recarregar]);

  return { curso, loading, error, recarregar };
}