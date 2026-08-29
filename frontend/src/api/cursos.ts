import api from "./axios";
import type { Curso, CreateCurso, UpdateCurso, ListCurso } from "../types/Curso"
// modo demonstração (remover junto com src/mocks)
import { demoAtivo } from "../mocks/demo";
import { listarCursosDemo, obterCursoDemo } from "../mocks/cursosDemo";


export async function getCursos(): Promise<Curso[]> {
    // modo demonstração
    if (demoAtivo()) {
        return listarCursosDemo();
    }

    const response = await api.get("/cursos/");

    return response.data;
}

export async function getCurso(id: string): Promise<ListCurso> {
    // modo demonstração
    if (demoAtivo()) {
        const curso = obterCursoDemo(id);
        if (curso) {
            return curso;
        }
    }

    const response = await api.get<ListCurso>(`/cursos/${id}`);

    return response.data;
}

export async function postCurso(data: CreateCurso): Promise<CreateCurso> {

    const response = await api.post<CreateCurso>(
        "/cursos/",
        data
    );
    return response.data;
}

export async function patchCurso(id: string, data: UpdateCurso): Promise<Curso> {
    const response = await api.patch<Curso>(
        `/cursos/${id}`,
        data
    );
    return response.data;
}