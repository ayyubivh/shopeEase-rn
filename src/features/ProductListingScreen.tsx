import React, { useMemo, useState } from "react";
import { ActivityIndicator, FlatList, StyleSheet, Text, View } from "react-native";
import { useRoute } from "@react-navigation/native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import ProductCard from "../components/ProductCard";
import Screen from "../components/Screen";
import { useOpenProduct } from "../navigation/openProduct";
import type { HomeStackParamList } from "../navigation/types";
import type { Product } from "../api/types";
import { useProducts } from "../hooks/useCatalog";
import { useFilterStore } from "../store/filterStore";
import { colors } from "../theme/colors";
import { spacing } from "../theme/spacing";

const PAGE_SIZE = 6;
const NO_PRODUCTS: Product[] = [];

type Props = NativeStackScreenProps<HomeStackParamList, "ProductListing">;

export default function ProductListingScreen(_: Props) {
    const category = useRoute<Props["route"]>().params?.category ?? null;
    const { data, isLoading, error } = useProducts();
    const products = data ?? NO_PRODUCTS;
    const [page, setPage] = useState(1);
    const openProduct = useOpenProduct();
    const { sort, minRating } = useFilterStore();

    // The API returns the full list, so paginate on the client.
    const filtered = useMemo(() => {
        const list = products.filter(
            (p) => (!category || p.category === category) && p.rating >= minRating,
        );
        if (sort === "priceAsc") return [...list].sort((a, b) => a.price - b.price);
        if (sort === "priceDesc") return [...list].sort((a, b) => b.price - a.price);
        if (sort === "rating") return [...list].sort((a, b) => b.rating - a.rating);
        return list;
    }, [products, category, sort, minRating]);
    const visible = filtered.slice(0, page * PAGE_SIZE);
    const hasMore = visible.length < filtered.length;

    return (
        <Screen edges={["left", "right", "bottom"]}>
            <FlatList
                data={visible}
                keyExtractor={(p) => String(p.id)}
                numColumns={2}
                columnWrapperStyle={styles.columns}
                contentContainerStyle={styles.content}
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) => (
                    <View style={styles.cell}>
                        <ProductCard product={item} onPress={() => openProduct(item.id)} />
                    </View>
                )}
                onEndReachedThreshold={0.4}
                onEndReached={() => hasMore && setPage((p) => p + 1)}
                ListFooterComponent={hasMore ? <ActivityIndicator color={colors.primary} style={styles.footer} /> : undefined}
                ListEmptyComponent={
                    isLoading ? (
                        <ActivityIndicator color={colors.primary} style={styles.footer} />
                    ) : (
                        <Text style={styles.empty}>{error ?? "No products found"}</Text>
                    )
                }
            />
        </Screen>
    );
}

const styles = StyleSheet.create({
    content: { paddingTop: spacing.md, paddingBottom: spacing.lg },
    columns: { gap: 12, marginBottom: 12 },
    cell: { flex: 1 },
    footer: { paddingVertical: spacing.md },
    empty: { textAlign: "center", paddingVertical: spacing.xl, color: colors.textSecondary },
});
