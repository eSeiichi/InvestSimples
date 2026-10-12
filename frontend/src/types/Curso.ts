import type { Aula} from "./Aula"

//type padrão de curso, utilizado /cursos/
export type Curso = {
  id: string;
  titulo: string;
  descricao?: string | null;
  nivel: string;
  capa_url?: string | null;
  total_aulas: number;
};

//type que contém informação do curso + lista de aulas
//utilizado no /cursos/idCurso
export type ListCurso = {
  id: string;
  titulo: string;
  descricao?: string | null;
  nivel: string;
  capa_url?: string | null;
  aulas: Aula[];
};

export type CreateCurso ={
  titulo: string,
  descricao?: string | null,
  nivel: string,
  capa_url?: string | null
};

export type UpdateCurso ={
  titulo: string,
  descricao?: string | null,
  nivel?: string,
  capa_url?: string | null;
};