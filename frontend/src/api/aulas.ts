import api from './axios'
import type { AulaData, AulaResponse , UpdateAula} from '../types/Aula';

//criar aula
export async function postAulas(curso_id:string , data:AulaData) {
    try{
        const response = await api.post<AulaResponse>(
            `/cursos/${curso_id}/aulas`,
            data
        )
        return response.data
    }catch (error:any){
        if (error.response?.status === 404) {
            alert("Curso não encontrado")
        }
        else {
            console.log(error)
        }
    }
}

//listar aulas do curso
export async function getAulas(curso_id: string) {
    const response = await api.get(`/cursos/${curso_id}/aulas`);

    return response.data;
}

export async function patchAulas(curso_id:string, aula_id:string, data:UpdateAula) {
    const response = await api.patch<AulaResponse>(
        `cursos/${curso_id}/aulas/${aula_id}`,
        data
    )
}