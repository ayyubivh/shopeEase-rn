import { api } from "./client";

export type Product = {
    id: number;
    name: string;
    description: string;
    price: number;
    category: string;
    stock: number;
    image: string;
    images: string[];
    rating: number;
};

export type Category = {
    name: string;
    count: number;
};

export async function fetchProductsApi() {
    const response = await api.get<{ products: Product[] }>("/api/products");
    return response.data.products;
}

export async function fetchCategoriesApi() {
    const response = await api.get<{ categories: Category[] }>("/api/categories");
    return response.data.categories;
}
