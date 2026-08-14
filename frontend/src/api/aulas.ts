import api from './axios'

//lista 
export async function getAulas(id: string) {
    const response = await api.get(`/cursos/${id}/aulas`);

    return response.data;
}

