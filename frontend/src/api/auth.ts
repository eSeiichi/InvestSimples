import api from "./axios"
import type { UserData, UserResponse, LoginData, LoginResponse, RegisterData, RegisterResponse } from "../types/User"

export async function login(data: LoginData): Promise<LoginResponse> {
    // a rota usa OAuth2PasswordRequestForm: espera username/password
    // como formulário, não como JSON
    const corpo = new URLSearchParams({
        username: data.email,
        password: data.senha,
    });
    const formData = new URLSearchParams();

    formData.append("email", data.email)
    formData.append("senha", data.senha)

    const response = await api.post<LoginResponse>(
        "/auth/login",
        corpo,
        { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
        "/auth/login/",
        formData
    );
    return response.data;
}

export async function register(data: RegisterData): Promise<RegisterResponse> {
    const response = await api.post<RegisterResponse>(
        "/auth/register",
        data
    );
    return response.data;

}

export async function getMe(): Promise<UserResponse> {

    const response = await api.get<UserResponse>(
        "/auth/me"
    );
    return response.data;

}

export async function patchMe(data: UserData): Promise<UserResponse> {

    const response = await api.patch<UserResponse>(
        "/auth/me",
        data
    );
    return response.data;
}