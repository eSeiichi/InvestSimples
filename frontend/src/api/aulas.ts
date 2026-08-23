import api from "./axios";
import type { AulaData, AulaResponse, UpdateAula } from "../types/Aula";

//criar aula
export async function postAulas(curso_id: string, data: AulaData): Promise<AulaResponse>{
  try {
    const response = await api.post<AulaResponse>(
      `/cursos/${curso_id}/aulas`,
      data,
    );
    return response.data;
  } catch (error: any) {
    if (error.response?.status === 404) {
      alert("Curso não encontrado");
    } else {
      console.log(error);
    }
    throw error;
  }
}

//listar aulas do curso
export async function getAulas(curso_id: string):Promise<AulaResponse[]> {
  const response = await api.get<AulaResponse[]>(`/cursos/${curso_id}/aulas`);

  return response.data;
}

//retorna apenas uma aula
export async function getAula(
  curso_id: string,
  aula_id: string,
): Promise<AulaResponse> {
  const response = await api.get<AulaResponse>(
    `/cursos/${curso_id}/aulas/${aula_id}`,
  );

  return response.data;
}

//editar aula
export async function patchAulas(
  curso_id: string,
  aula_id: string,
  data: UpdateAula,
): Promise<AulaResponse> {
  const response = await api.patch<AulaResponse>(
    `/cursos/${curso_id}/aulas/${aula_id}`,
    data,
  );

  return response.data;
}
