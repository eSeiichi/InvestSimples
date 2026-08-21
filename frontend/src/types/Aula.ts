export type AulaResponse ={
    id: string,
    titulo: string,
    descricao?: string,
    conteudo?: string,
    url_video?: string,
    duracao_minutos?: number,
    ordem: number,
    curso_id: string;
}
export type AulaData = {
    titulo: string,
    descricao?: string,
    conteudo?: string,
    url_video?: string,
    duracao_minutos?: number,
    ordem: number;
}

export type UpdateAula = {
    titulo?: string,
    descricao?: string,
    conteudo?: string,
    url_video?: string,
    duracao_minutos?: number,
    ordem?: number;
}