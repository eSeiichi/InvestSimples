import api from "./axios";
import type { AulaData, AulaResponse, UpdateAula } from "../types/Aula";
// modo demonstração (remover junto com src/mocks)
import { demoAtivo } from "../mocks/demo";
import { obterAulaDemo, obterCursoDemo } from "../mocks/cursosDemo";

//criar aula
export async function postAulas(
  curso_id: string,
  data: AulaData
): Promise<AulaResponse> {
  const response = await api.post<AulaResponse>(
    `/cursos/${curso_id}/aulas`,
    data,
  );
  return response.data;
}

//listar aulas do curso
export async function getAulas(curso_id: string): Promise<AulaResponse[]> {
  // modo demonstração
  if (demoAtivo()) {
    const curso = obterCursoDemo(curso_id);
    if (curso) {
      return curso.aulas;
    }
  }

  const response = await api.get<AulaResponse[]>(`/cursos/${curso_id}/aulas`);

  return response.data;
}

//retorna apenas uma aula
export async function getAula(
  curso_id: string,
  aula_id: string,
): Promise<AulaResponse> {
  // modo demonstração
  if (demoAtivo()) {
    const aula = obterAulaDemo(curso_id, aula_id);
    if (aula) {
      return aula;
    }
  }

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
