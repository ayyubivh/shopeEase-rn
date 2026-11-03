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

export type Pagination = {
    page: number;
    limit: number;
    totalItems: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
};

export type ProductsPage = {
    products: Product[];
    pagination: Pagination;
};

export type ProductsQuery = {
    page?: number;
    limit?: number;
    category?: string;
    minRating?: number;
    sort?: "price_asc" | "price_desc" | "rating" | "name" | "newest";
};
