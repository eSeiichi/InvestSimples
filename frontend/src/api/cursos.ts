import api from "./axios";
import type { Curso, CreateCurso, UpdateCurso } from "../types/Curso"


export async function getCursos() {
    const response = await api.get("/cursos/");

    return response.data;
}

export async function getCurso(id: string) {
    const response = await api.get(`/cursos/${id}`);

    return response.data;
}

export async function postCurso(data: CreateCurso) {
    try {
        const response = await api.post<CreateCurso>(
            "/cursos/",
            data

        )
        return response.data
    } catch (error:any) {
        if (error.response?.status === 403) {
            alert("Você não tem permissão para criar cursos")
        }
    }
}

export async function patchCurso(id: string, data: UpdateCurso): Promise<Curso> {
    const response = await api.patch<Curso>(
        `/cursos/${id}`,
        data
    )
    return response.data
}