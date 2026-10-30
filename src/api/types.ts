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
