import api from "./axios"
import type { UserData, UserResponse, LoginData, LoginResponse, RegisterData, RegisterResponse } from "../types/User"

export async function login(data: LoginData) {
    try {
        const response = await api.post<LoginResponse>(
            "/auth/login/",
            data
        )
        return response.data;
    } catch (error: any) {
        if (error.response?.status === 401) {
            alert("Email ou senha incorretos")
        } else {
            console.log(error)
        }
    }
}

export async function register(data: RegisterData) {
    try {
        const response = await api.post<RegisterResponse>(
            "/auth/register/",
            data
        )
        return response.data;
    } catch (error: any) {
        if (error.response?.status === 401) {
            alert("Não foi possível criar usuário")
        } else {
            console.log(error)
        }
    }
}

export async function getMe() {
    try {
        const response = await api.get<UserResponse>(
            "/auth/me/"
        )
        return response.data;
    } catch (error: any) {
        if (error.response?.status === 401) {
            alert("Não foi possível encontrar perfil")
        } else {
            console.log(error)
        }
    }
}

export async function patchMe(data: UserData) {
    try {
        const response = await api.patch<UserResponse>(
            "/auth/me/",
            data
        )
        return response.data;
    } catch (error: any) {
        if (error.response?.status === 401) {
            alert("Não foi possível criar usuário")
        } else {
            console.log(error)
        }

    }
}