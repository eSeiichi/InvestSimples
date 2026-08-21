import type { AulaResponse} from "./Aula"

//type padrão de curso, utilizado /cursos/
export type Curso = {
  id: string;
  titulo: string;
  descricao?: string | null;
  nivel: string;
  capa_url?: string;
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
  aulas: AulaResponse[];
};

export type CreateCurso ={
  titulo: string,
  descricao?: string,
  nivel: string,
  capa_url?: string,
  total_aulas: number;
};

export type UpdateCurso ={
  titulo: string,
  descricao?: string,
  nivel?: string,
  capa_url?: string;
};