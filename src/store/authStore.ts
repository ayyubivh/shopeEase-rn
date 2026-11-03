import { create } from "zustand";
import type { User } from "../api/types";
import { api } from "../api/client";
import { STORAGE_KEYS, storage } from "./storage";

type AuthState = {
    token: string | null;
    user: User | null;
    setSession: (token: string, user: User) => void;
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
    setSession: (token, user) => {
        api.defaults.headers.common.Authorization = `Bearer ${token}`;
        storage.set(STORAGE_KEYS.token, token);
        storage.set(STORAGE_KEYS.user, JSON.stringify(user));
        set({ token, user });
    },
    logout: () => {
        delete api.defaults.headers.common.Authorization;
        storage.remove(STORAGE_KEYS.token);
        storage.remove(STORAGE_KEYS.user);
        set({ token: null, user: null });
    },
}));
