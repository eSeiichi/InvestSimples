import api from "./axios"
import type { User, LoginData, LoginResponse } from "../types/User"

export async function login(data: LoginData) {
    try {
        const response = await api.post<LoginResponse>(
            "/auth/login/",
            data
        )
        return response.data;
    } catch (error) {
        if (error.response?.status === 401) {
            alert("Email ou senha incorretos")
        }
    }
}

