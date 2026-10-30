import { api } from "./client";
import type { Category, LoginResponse, Product } from "./types";

// Every backend endpoint lives here; screens use these through hooks in src/hooks.
export const loginApi = (email: string, password: string) =>
    api.post<LoginResponse>("/api/auth/login", { email, password }).then((r) => r.data);

export const getProducts = () =>
    api.get<{ products: Product[] }>("/api/products").then((r) => r.data.products);

export const getCategories = () =>
    api.get<{ categories: Category[] }>("/api/categories").then((r) => r.data.categories);
