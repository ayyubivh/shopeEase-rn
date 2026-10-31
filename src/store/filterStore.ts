import { create } from "zustand";

export type SortOption = "none" | "priceAsc" | "priceDesc" | "rating";

type FilterState = {
    sort: SortOption;
    minRating: number;
    set: (patch: Partial<Pick<FilterState, "sort" | "minRating">>) => void;
    reset: () => void;
};

export const useFilterStore = create<FilterState>((set) => ({
    sort: "none",
    minRating: 0,
    set: (patch) => set(patch),
    reset: () => set({ sort: "none", minRating: 0 }),
}));
