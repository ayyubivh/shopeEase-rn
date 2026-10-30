import React from "react";
import { Image, StyleProp, StyleSheet, Text, View, ViewStyle } from "react-native";
import { Product } from "../api/products";
import { colors, homeColors } from "../theme/colors";

type ProductCardProps = {
    product: Product;
    style?: StyleProp<ViewStyle>;
};

export default function ProductCard({ product, style }: ProductCardProps) {
    return (
        <View style={[styles.card, style]}>
            <Image source={{ uri: product.image }} style={styles.image} resizeMode="cover" />
            <Text style={styles.name} numberOfLines={1}>
                {product.name}
            </Text>
            <View style={styles.row}>
                <Text style={styles.price}>${product.price.toFixed(2)}</Text>
                <Text style={styles.rating}>★ {product.rating.toFixed(1)}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        flex: 1,
        padding: 10,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: colors.inputBorder,
        backgroundColor: homeColors.surface,
    },
    image: {
        width: "100%",
        aspectRatio: 1,
        borderRadius: 14,
        backgroundColor: homeColors.imagePlaceholder,
    },
    name: {
        marginTop: 10,
        fontSize: 15,
        fontWeight: "600",
        color: colors.textPrimary,
    },
    row: {
        marginTop: 4,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    price: {
        fontSize: 15,
        fontWeight: "700",
        color: colors.primary,
    },
    rating: {
        fontSize: 13,
        color: colors.textSecondary,
    },
});
