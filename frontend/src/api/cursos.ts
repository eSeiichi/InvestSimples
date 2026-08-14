import api from "./axios";

export async function getCursos() {
    const response = await api.get("/cursos/");

    return response.data;
}

export async function getCurso(id: string) {
    const response = await api.get(`/cursos/${id}`);

    return response.data;
}

export async function getAulas(id: string) {
    const response = await api.get(`/cursos/${id}/aulas`);

    return response.data;
}