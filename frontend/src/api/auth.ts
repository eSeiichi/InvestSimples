import api from "./axios"
import type { UserData, UserResponse, LoginData, LoginResponse, RegisterData, RegisterResponse } from "../types/User"

export async function login(data: LoginData): Promise<LoginResponse> {

    const response = await api.post<LoginResponse>(
        "/auth/login/",
        data
    );
    return response.data;
}

export async function register(data: RegisterData): Promise<RegisterResponse> {
    const response = await api.post<RegisterResponse>(
        "/auth/register/",
        data
    );
    return response.data;

}

export async function getMe(): Promise<UserResponse> {

    const response = await api.get<UserResponse>(
        "/auth/me/"
    );
    return response.data;

}

export async function patchMe(data: UserData): Promise<UserResponse> {

    const response = await api.patch<UserResponse>(
        "/auth/me/",
        data
    );
    return response.data;
}