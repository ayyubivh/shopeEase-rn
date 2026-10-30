import { create } from "zustand";
import { loginApi, User } from "../api/auth";
import { api } from "../api/client";
import { STORAGE_KEYS, storage } from "./storage";

type AuthState = {
    token: string | null;
    user: User | null;
    isLoading: boolean;
    error: string | null;
    login: (email: string, password: string) => Promise<boolean>;
    logout: () => void;
};

function loadSession(): { token: string | null; user: User | null } {
    const token = storage.getString(STORAGE_KEYS.token) ?? null;
    const rawUser = storage.getString(STORAGE_KEYS.user);
    let user: User | null = null;
    try {
        user = rawUser ? (JSON.parse(rawUser) as User) : null;
    } catch {
        user = null;
    }
    if (token) {
        api.defaults.headers.common.Authorization = `Bearer ${token}`;
    }
    return { token, user };
}

export const useAuthStore = create<AuthState>((set) => ({
    ...loadSession(),
    isLoading: false,
    error: null,
    login: async (email, password) => {
        set({ isLoading: true, error: null });
        try {

            const data = await loginApi(email, password);
            api.defaults.headers.common.Authorization = `Bearer ${data.token}`;
            storage.set(STORAGE_KEYS.token, data.token);
            storage.set(STORAGE_KEYS.user, JSON.stringify(data.user));
            set({ token: data.token, user: data.user, isLoading: false });
            return true;

        } catch (e) {

            const message = e instanceof Error ? e.message : "Something went wrong. Please try again.";
            set({ error: message, isLoading: false });
            return false;
        }
    },
    logout: () => {
        delete api.defaults.headers.common.Authorization;
        storage.remove(STORAGE_KEYS.token);
        storage.remove(STORAGE_KEYS.user);
        set({ token: null, user: null, error: null });
    },
}));
