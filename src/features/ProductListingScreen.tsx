import React, { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, StyleSheet, Text, View } from "react-native";
import { useRoute } from "@react-navigation/native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import ProductCard from "../components/ProductCard";
import Screen from "../components/Screen";
import type { HomeStackParamList } from "../navigation/TabStacks";
import { useProductStore } from "../store/productStore";
import { colors } from "../theme/colors";
import { spacing } from "../theme/spacing";

const PAGE_SIZE = 6;

type Props = NativeStackScreenProps<HomeStackParamList, "ProductListing">;

export default function ProductListingScreen(_: Props) {
    const category = useRoute<Props["route"]>().params?.category ?? null;
    const { products, productsLoading: isLoading, productsError: error, fetchProducts } = useProductStore();
    const [page, setPage] = useState(1);

    useEffect(() => {
        if (products.length === 0) {
            fetchProducts();
        }
    }, [products.length, fetchProducts]);

    // The API returns the full list, so paginate on the client.
    const filtered = category ? products.filter((p) => p.category === category) : products;
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
                        <ProductCard product={item} />
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
