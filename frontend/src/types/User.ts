//types de login
export type LoginData = {
    email: string,
    senha: string;
}

export type LoginResponse = {
    access_token: string,
    token_type: string;
}

//types de Registro
export type RegisterData = {
    nome: string,
    username?: string,
    email: string,
    senha: string,
    role?: string | "aluno";
}

export type RegisterResponse = {
    id: string,
    nome: string,
    username?: string,
    email: string,
    senha: string,
    role?: string;
}

//types de usuário
export type UserData ={
    id: string;
    nome: string,
    username?: string,
    email: string,
    senha_hash: string,
    role: "aluno" | "admin";
}

export type UserResponse = RegisterResponse