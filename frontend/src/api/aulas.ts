import api from "./axios";
import type { AulaData, Aula, AulaUpdate } from "../types/Aula";

//criar aula
export async function postAula(
  curso_id: string,
  data: AulaData
): Promise<Aula> {
  const response = await api.post<Aula>(
    `/cursos/${curso_id}/aulas`,
    data,
  );
  return response.data;
}

//listar aulas do curso
export async function getAulas(curso_id: string): Promise<Aula[]> {
  const response = await api.get<Aula[]>(`/cursos/${curso_id}/aulas`);

  return response.data;
}

//retorna apenas uma aula
export async function getAula(
  curso_id: string,
  aula_id: string,
): Promise<Aula> {
  const response = await api.get<Aula>(
    `/cursos/${curso_id}/aulas/${aula_id}`,
  );

  return response.data;
}

//editar aula
export async function patchAula(
  curso_id: string,
  aula_id: string,
  data: AulaUpdate
): Promise<Aula> {
  const response = await api.patch<Aula>(
    `/cursos/${curso_id}/aulas/${aula_id}`,
    data,
  );

  return response.data;
}
