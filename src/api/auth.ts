import { api } from "./client";

export type User = {
    id: number;
    email: string;
    name: string;
    avatar: string | null;
    role: string;
};

export type LoginResponse = {
    token: string;
    user: User;
};

export async function loginApi(email: string, password: string) {
    const response = await api.post<LoginResponse>("/api/auth/login", { email, password });
    return response.data;
}
