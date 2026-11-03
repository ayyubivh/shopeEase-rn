import { useCallback, useEffect, useRef, useState } from "react";
import { getProductsPage } from "../api/endpoints";
import type { Product, ProductsQuery } from "../api/types";

type Filters = Omit<ProductsQuery, "page" | "limit">;

// Server-side paginated product list; resets and refetches page 1 whenever the filters change.
export function useProductPages(filters: Filters, limit = 6) {
    const { category, minRating, sort } = filters;
    const [products, setProducts] = useState<Product[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isLoadingMore, setIsLoadingMore] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const page = useRef(0);
    const hasMore = useRef(false);
    const busy = useRef(false);
    const requestId = useRef(0);

    const fetchPage = useCallback(
        async (next: number) => {
            const id = ++requestId.current;
            busy.current = true;
            if (next === 1) setIsLoading(true);
            else setIsLoadingMore(true);
            setError(null);
            try {
                const res = await getProductsPage({ page: next, limit, category, minRating, sort });
                if (id !== requestId.current) return;
                page.current = res.pagination.page;
                hasMore.current = res.pagination.hasNextPage;
                setProducts((prev) => (next === 1 ? res.products : [...prev, ...res.products]));
            } catch (e) {
                if (id === requestId.current)
                    setError(e instanceof Error ? e.message : "Could not load products. Please try again.");
            } finally {
                if (id === requestId.current) {
                    busy.current = false;
                    setIsLoading(false);
                    setIsLoadingMore(false);
                }
            }
        },
        [limit, category, minRating, sort],
    );

    useEffect(() => {
        page.current = 0;
        hasMore.current = false;
        setProducts([]);
        fetchPage(1);
        return () => {
            requestId.current++;
            busy.current = false;
        };
    }, [fetchPage]);

    const loadMore = useCallback(() => {
        if (!busy.current && hasMore.current) fetchPage(page.current + 1);
    }, [fetchPage]);

    const reload = useCallback(() => fetchPage(1), [fetchPage]);

    return { products, isLoading, isLoadingMore, error, hasMore: hasMore.current, loadMore, reload };
}
