import React, { useEffect, useState } from "react";
import { ActivityIndicator, Image, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import type { StackScreenProps } from "@react-navigation/stack";
import PrimaryButton from "../components/PrimaryButton";
import Screen from "../components/Screen";
import { getProduct } from "../api/endpoints";
import type { Product } from "../api/types";
import type { HomeStackParamList } from "../navigation/types";
import { useCartStore } from "../store/cartStore";
import { colors, homeColors } from "../theme/colors";
import { spacing } from "../theme/spacing";

type Props = StackScreenProps<HomeStackParamList, "ProductDetail">;

export default function ProductDetailScreen({ navigation, route }: Props) {
    const { id, address } = route.params;
    const [product, setProduct] = useState<Product | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [added, setAdded] = useState(false);
    const addToCart = useCartStore((s) => s.add);

    useEffect(() => {
        let cancelled = false;
        setProduct(null);
        setError(null);
        getProduct(id)
            .then((p) => !cancelled && setProduct(p))
            .catch((e) => !cancelled && setError(e instanceof Error ? e.message : "Could not load product."));
        return () => {
            cancelled = true;
        };
    }, [id]);

    useEffect(() => {
        if (product) navigation.setOptions({ title: product.name });
    }, [navigation, product]);

    if (error) {
        return (
            <Screen style={styles.center}>
                <Text style={styles.error}>{error}</Text>
            </Screen>
        );
    }
    if (!product) {
        return (
            <Screen style={styles.center}>
                <ActivityIndicator color={colors.primary} />
            </Screen>
        );
    }

    return (
        <Screen edges={["left", "right", "bottom"]} style={styles.screen}>
            <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
                <ScrollView horizontal pagingEnabled showsHorizontalScrollIndicator={false}>
                    {(product.images.length ? product.images : [product.image]).map((uri, i) => (
                        <Image key={`${uri}-${i}`} source={{ uri }} style={styles.hero} resizeMode="cover" />
                    ))}
                </ScrollView>
                <Text style={styles.category}>{product.category}</Text>
                <Text style={styles.name}>{product.name}</Text>
                <View style={styles.row}>
                    <Text style={styles.price}>${product.price.toFixed(2)}</Text>
                    <Text style={styles.rating}>★ {product.rating.toFixed(1)}</Text>
                </View>
                <Text style={styles.description}>{product.description}</Text>

                <View style={styles.addressCard}>
                    <Text style={styles.addressTitle}>Delivery address</Text>
                    {address ? (
                        <Text style={styles.addressText}>
                            {address.fullName}
                            {"\n"}
                            {address.street}, {address.city}
                            {"\n"}
                            {address.phone}
                        </Text>
                    ) : (
                        <Text style={styles.addressText}>No address set</Text>
                    )}
                    <Pressable onPress={() => navigation.navigate("EditAddress", { address })}>
                        <Text style={styles.link}>{address ? "Edit address" : "Add address"}</Text>
                    </Pressable>
                </View>
            </ScrollView>
            <View style={styles.footer}>
                <PrimaryButton
                    title={added ? "Added ✓ Add another" : "Add to cart"}
                    onPress={() => {
                        addToCart(product);
                        setAdded(true);
                    }}
                    disabled={product.stock <= 0}
                />
            </View>
        </Screen>
    );
}

const styles = StyleSheet.create({
    screen: { paddingHorizontal: 0 },
    center: { alignItems: "center", justifyContent: "center" },
    content: { padding: spacing.screen, paddingBottom: spacing.lg },
    hero: { width: 320, height: 320, borderRadius: 20, marginRight: 12, backgroundColor: homeColors.imagePlaceholder },
    category: { marginTop: spacing.md, fontSize: 13, fontWeight: "700", color: colors.primary },
    name: { marginTop: 4, fontSize: 24, fontWeight: "800", color: colors.textPrimary },
    row: { flexDirection: "row", justifyContent: "space-between", marginTop: spacing.sm },
    price: { fontSize: 22, fontWeight: "800", color: colors.textPrimary },
    rating: { fontSize: 16, color: colors.textSecondary },
    description: { marginTop: spacing.md, fontSize: 15, lineHeight: 22, color: colors.textSecondary },
    addressCard: {
        marginTop: spacing.lg,
        padding: spacing.md,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: colors.inputBorder,
        gap: 6,
    },
    addressTitle: { fontSize: 16, fontWeight: "800", color: colors.textPrimary },
    addressText: { fontSize: 14, color: colors.textSecondary, lineHeight: 20 },
    link: { fontSize: 15, fontWeight: "700", color: colors.primary },
    footer: { padding: spacing.screen },
    error: { color: homeColors.error, textAlign: "center" },
});
