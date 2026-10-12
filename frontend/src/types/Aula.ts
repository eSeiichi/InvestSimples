export type Aula ={
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
    descricao?: string | null,
    conteudo?: string | null,
    url_video?: string | null,
    duracao_minutos?: number | null,
    ordem: number;
}

export type AulaUpdate = {
    titulo?: string,
    descricao?: string | null,
    conteudo?: string | null,
    url_video?: string | null,
    duracao_minutos?: number | null,
    ordem?: number;
}