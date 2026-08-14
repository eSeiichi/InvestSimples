export type User ={
    id: string,
    nome: string,
    username?: string,
    email: string,
    role: "aluno" | "admin";
}
export type LoginData = {
    email: string,
    senha: string;
}

export type LoginResponse = {
    access_token: string,
    token_type: string;
}