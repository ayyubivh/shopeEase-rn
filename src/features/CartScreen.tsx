import React from "react";
import { FlatList, Image, Pressable, StyleSheet, Text, View } from "react-native";
import Screen from "../components/Screen";
import { CartItem, useCartStore } from "../store/cartStore";
import { colors, homeColors } from "../theme/colors";
import { spacing } from "../theme/spacing";

function Row({ item }: { item: CartItem }) {
    const setQuantity = useCartStore((s) => s.setQuantity);
    return (
        <View style={styles.row}>
            <Image source={{ uri: item.product.image }} style={styles.image} />
            <View style={styles.info}>
                <Text style={styles.name} numberOfLines={1}>{item.product.name}</Text>
                <Text style={styles.price}>${(item.product.price * item.quantity).toFixed(2)}</Text>
            </View>
            <View style={styles.qty}>
                <Pressable hitSlop={8} onPress={() => setQuantity(item.product.id, item.quantity - 1)}>
                    <Text style={styles.qtyButton}>−</Text>
                </Pressable>
                <Text style={styles.qtyText}>{item.quantity}</Text>
                <Pressable hitSlop={8} onPress={() => setQuantity(item.product.id, item.quantity + 1)}>
                    <Text style={styles.qtyButton}>+</Text>
                </Pressable>
            </View>
        </View>
    );
}

export default function CartScreen() {
    const items = useCartStore((s) => s.items);
    const total = items.reduce((sum, i) => sum + i.product.price * i.quantity, 0);

    return (
        <Screen edges={["left", "right"]}>
            <FlatList
                data={items}
                keyExtractor={(i) => String(i.product.id)}
                renderItem={({ item }) => <Row item={item} />}
                contentContainerStyle={styles.content}
                ListEmptyComponent={<Text style={styles.empty}>Your cart is empty</Text>}
            />
            {items.length > 0 && (
                <View style={styles.footer}>
                    <Text style={styles.totalLabel}>Total</Text>
                    <Text style={styles.total}>${total.toFixed(2)}</Text>
                </View>
            )}
        </Screen>
    );
}

const styles = StyleSheet.create({
    content: { paddingVertical: spacing.md, gap: 12 },
    row: { flexDirection: "row", alignItems: "center", gap: 12, padding: 10, borderRadius: 16, borderWidth: 1, borderColor: colors.inputBorder },
    image: { width: 56, height: 56, borderRadius: 12, backgroundColor: homeColors.imagePlaceholder },
    info: { flex: 1 },
    name: { fontSize: 15, fontWeight: "700", color: colors.textPrimary },
    price: { marginTop: 2, fontSize: 14, color: colors.textSecondary },
    qty: { flexDirection: "row", alignItems: "center", gap: 12 },
    qtyButton: { fontSize: 22, fontWeight: "700", color: colors.primary },
    qtyText: { fontSize: 16, fontWeight: "700", color: colors.textPrimary, minWidth: 16, textAlign: "center" },
    empty: { textAlign: "center", paddingVertical: spacing.xl, color: colors.textSecondary },
    footer: { flexDirection: "row", justifyContent: "space-between", paddingVertical: spacing.md, borderTopWidth: 1, borderTopColor: colors.inputBorder },
    totalLabel: { fontSize: 16, color: colors.textSecondary },
    total: { fontSize: 20, fontWeight: "800", color: colors.textPrimary },
});
