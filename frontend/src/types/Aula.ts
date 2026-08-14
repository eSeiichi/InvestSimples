export type Aula ={
    id: string,
    titulo: string,
    descricao?: string,
    conteudo?: string,
    url_video?: string,
    duracao_minutos?: number,
    ordem: number
}
export type CreateAula = {
    titulo: string,
    descricao?: string,
    conteudo?: string,
    url_video?: string,
    duracao_minutos?: number,
    ordem: number
}
export type UpdateAula = {
    titulo?: string,
    descricao?: string,
    conteudo?: string,
    url_video?: string,
    duracao_minutos?: number,
    ordem?: number
}