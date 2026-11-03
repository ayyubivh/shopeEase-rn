import React from "react";
import { ActivityIndicator, FlatList, StyleSheet, Text, View } from "react-native";
import { useRoute } from "@react-navigation/native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import ProductCard from "../components/ProductCard";
import Screen from "../components/Screen";
import { useOpenProduct } from "../navigation/openProduct";
import type { HomeStackParamList } from "../navigation/types";
import { useProductPages } from "../hooks/useProductPages";
import { useFilterStore } from "../store/filterStore";
import { colors } from "../theme/colors";
import { spacing } from "../theme/spacing";

const PAGE_SIZE = 6;
const SORT_PARAM = { priceAsc: "price_asc", priceDesc: "price_desc", rating: "rating" } as const;

type Props = NativeStackScreenProps<HomeStackParamList, "ProductListing">;

export default function ProductListingScreen(_: Props) {
    const category = useRoute<Props["route"]>().params?.category ?? null;
    const openProduct = useOpenProduct();
    const { sort, minRating } = useFilterStore();
    const { products, isLoading, isLoadingMore, error, loadMore } = useProductPages(
        {
            category: category ?? undefined,
            minRating: minRating > 0 ? minRating : undefined,
            sort: sort === "none" ? undefined : SORT_PARAM[sort],
        },
        PAGE_SIZE,
    );

    return (
        <Screen edges={["left", "right", "bottom"]}>
            <FlatList
                data={products}
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
                onEndReached={loadMore}
                ListFooterComponent={isLoadingMore ? <ActivityIndicator color={colors.primary} style={styles.footer} /> : undefined}
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
