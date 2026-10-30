import { create } from "zustand";
import { Category, Product, fetchCategoriesApi, fetchProductsApi } from "../api/products";

type ProductState = {
    products: Product[];
    productsLoading: boolean;
    productsError: string | null;
    fetchProducts: () => Promise<void>;

    categories: Category[];
    categoriesLoading: boolean;
    categoriesError: string | null;
    fetchCategories: () => Promise<void>;
};

const toMessage = (e: unknown, fallback: string) => (e instanceof Error ? e.message : fallback);

export const useProductStore = create<ProductState>((set) => ({
    products: [],
    productsLoading: false,
    productsError: null,

    fetchProducts: async () => {
        set({ productsLoading: true, productsError: null });
        try {
            const products = await fetchProductsApi();
            set({ products, productsLoading: false });
        } catch (e) {
            set({ productsError: toMessage(e, "Could not load products. Please try again."), productsLoading: false });
        }
    },

    categories: [],
    categoriesLoading: false,
    categoriesError: null,

    fetchCategories: async () => {
        set({ categoriesLoading: true, categoriesError: null });
        try {
            const categories = await fetchCategoriesApi();
            set({ categories, categoriesLoading: false });
        } catch (e) {
            set({ categoriesError: toMessage(e, "Could not load categories."), categoriesLoading: false });
        }
    },
}));
