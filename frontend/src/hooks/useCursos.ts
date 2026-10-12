import { useCallback, useEffect, useState } from "react";
import { getCursos } from "../api/cursos";
import type { Curso } from "../types/Curso";

export function useCursos() {
  const [cursos, setCursos] = useState<Curso[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const recarregar = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      setCursos(await getCursos());
    } catch {
      setError("Não foi possível carregar os cursos.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    recarregar();
  }, [recarregar]);

  return { cursos, loading, error, recarregar };
}