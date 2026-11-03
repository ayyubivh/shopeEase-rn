import { api } from "./client";
import type { Category, LoginResponse, Product, ProductsPage, ProductsQuery } from "./types";

export const loginApi = (email: string, password: string) =>
    api.post<LoginResponse>("/api/auth/login", { email, password }).then((r) => r.data);

export const registerApi = async (name: string, email: string, password: string) => {
    const r = await api.post<Partial<LoginResponse>>("/api/auth/register", { name, email, password });
    return r.data.token && r.data.user ? (r.data as LoginResponse) : loginApi(email, password);
};

export const getProduct = (id: number) =>
    api.get<{ product: Product }>(`/api/products/${id}`).then((r) => r.data.product);

export const getProducts = () =>
    api.get<ProductsPage>("/api/products", { params: { limit: 100 } }).then((r) => r.data.products);

export const getProductsPage = (params: ProductsQuery) =>
    api.get<ProductsPage>("/api/products", { params }).then((r) => r.data);

export const getCategories = () =>
    api.get<{ categories: Category[] }>("/api/categories").then((r) => r.data.categories);
