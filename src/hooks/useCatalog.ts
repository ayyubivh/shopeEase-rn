import { useCallback, useEffect, useRef, useState } from "react";
import { getCategories, getProducts } from "../api/endpoints";

// Shared, de-duplicated cache so screens showing the same list don't refetch or race each other.
function createResource<T>(fetcher: () => Promise<T>, fallbackError: string) {
    let data: T | undefined;
    let inFlight: Promise<T> | null = null;

    const load = (force = false): Promise<T> => {
        if (!force && data !== undefined) return Promise.resolve(data);
        if (inFlight) return inFlight;
        inFlight = fetcher()
            .then((result) => {
                data = result;
                return result;
            })
            .finally(() => {
                inFlight = null;
            });
        return inFlight;
    };

    function useResource() {
        const [value, setValue] = useState<T | undefined>(data);
        const [isLoading, setIsLoading] = useState(data === undefined);
        const [error, setError] = useState<string | null>(null);
        const mounted = useRef(true);

        const run = useCallback(async (force: boolean) => {
            setIsLoading(true);
            setError(null);
            try {
                const result = await load(force);
                if (mounted.current) setValue(result);
            } catch (e) {
                if (mounted.current) setError(e instanceof Error ? e.message : fallbackError);
            } finally {
                if (mounted.current) setIsLoading(false);
            }
        }, []);

        useEffect(() => {
            mounted.current = true;
            run(false);
            return () => {
                mounted.current = false;
            };
        }, [run]);

        const reload = useCallback(() => run(true), [run]);

        return { data: value, isLoading, error, reload };
    }

    return useResource;
}

export const useProducts = createResource(getProducts, "Could not load products. Please try again.");
export const useCategories = createResource(getCategories, "Could not load categories.");
