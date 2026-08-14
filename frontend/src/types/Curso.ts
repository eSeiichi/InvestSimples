export type Curso = {
  id: string;
  titulo: string;
  descricao?: string;
  nivel: string;
  capa_url?: string;
  total_aulas: number;
};

export type CreateCurso ={
  titulo: string;
  descricao?: string;
  nivel: string;
  capa_url?: string;
  total_aulas: number;
}

export type UpdateCurso ={
  titulo: string
  descricao?: string;
  nivel?: string;
  capa_url?: string;
}