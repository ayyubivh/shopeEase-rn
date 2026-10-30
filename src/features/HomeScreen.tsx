import React, { useEffect, useMemo, useState } from "react";
import {
    ActivityIndicator,
    FlatList,
    Pressable,
    RefreshControl,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    View,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../navigation/AppNavigator";
import ProductCard from "../components/ProductCard";
import Screen from "../components/Screen";
import { useAuthStore } from "../store/authStore";
import { useProductStore } from "../store/productStore";
import { colors, homeColors } from "../theme/colors";
import { spacing } from "../theme/spacing";

const HOME_LIMIT = 10;
const CARD_WIDTH = 160;

export default function HomeScreen() {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const user = useAuthStore((s) => s.user);
    const {
        products,
        productsLoading: isLoading,
        productsError: error,
        fetchProducts,
        categories,
        fetchCategories,
    } = useProductStore();
    const [query, setQuery] = useState("");
    const [category, setCategory] = useState<string | null>(null);

    useEffect(() => {
        fetchProducts();
        fetchCategories();
    }, [fetchProducts, fetchCategories]);

    const refresh = () => {
        fetchProducts();
        fetchCategories();
    };

    const visible = useMemo(() => {
        const q = query.trim().toLowerCase();
        return products
            .filter(
                (p) =>
                    (!category || p.category === category) &&
                    (!q || p.name.toLowerCase().includes(q)),
            )
            .slice(0, HOME_LIMIT);
    }, [products, query, category]);

    const header = (
        <View>
            <Text style={styles.greeting}>Hi, {user?.name?.split(" ")[0] ?? "there"}</Text>
            <Text style={styles.subtitle}>What are you shopping for today?</Text>

            <TextInput
                value={query}
                onChangeText={setQuery}
                placeholder="Search products"
                placeholderTextColor={colors.placeholder}
                style={styles.search}
            />

            <View style={styles.banner}>
                <View style={styles.bannerCircle} />
                <Text style={styles.bannerTag}>WEEKEND SALE</Text>
                <Text style={styles.bannerTitle}>Up to 40% off{"\n"}electronics</Text>
                <Pressable style={styles.bannerButton} onPress={() => setCategory("Electronics")}>
                    <Text style={styles.bannerButtonText}>Shop now</Text>
                </Pressable>
            </View>

            <View style={styles.sectionRow}>
                <Text style={styles.sectionTitle}>Categories</Text>
                {category && (
                    <Pressable onPress={() => setCategory(null)}>
                        <Text style={styles.seeAll}>Clear</Text>
                    </Pressable>
                )}
            </View>
            <FlatList
                horizontal
                data={categories}
                keyExtractor={(c) => c.name}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.categoryList}
                renderItem={({ item }) => {
                    const active = item.name === category;
                    return (
                        <Pressable
                            style={[styles.categoryChip, active && styles.categoryChipActive]}
                            onPress={() => setCategory(active ? null : item.name)}
                        >
                            <Text style={[styles.categoryText, active && styles.categoryTextActive]}>
                                {item.name}
                            </Text>
                        </Pressable>
                    );
                }}
            />

            <View style={[styles.sectionRow, styles.popularRow]}>
                <Text style={styles.sectionTitle}>Popular now</Text>
                <Pressable onPress={() => navigation.navigate("ProductListing", { category })}>
                    <Text style={styles.seeAll}>View all</Text>
                </Pressable>
            </View>
        </View>
    );

    const empty = isLoading ? (
        <ActivityIndicator color={colors.primary} style={styles.state} />
    ) : error ? (
        <View style={styles.state}>
            <Text style={styles.errorText}>{error}</Text>
            <Pressable onPress={fetchProducts}>
                <Text style={styles.seeAll}>Retry</Text>
            </Pressable>
        </View>
    ) : (
        <Text style={[styles.subtitle, styles.state]}>No products found</Text>
    );

    return (
        <Screen style={styles.screen}>
            <ScrollView
                contentContainerStyle={styles.content}
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="handled"
                refreshControl={<RefreshControl refreshing={isLoading && products.length > 0} onRefresh={refresh} />}

            >
                {header}
                {visible.length === 0 ? (
                    empty
                ) : (
                    <FlatList
                        horizontal
                        data={visible}
                        keyExtractor={(p) => String(p.id)}
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={styles.productRow}
                        renderItem={({ item }) => <ProductCard product={item} style={styles.productCard} />}
                    />
                )}
            </ScrollView>
        </Screen>
    );
}

const styles = StyleSheet.create({
    screen: { paddingHorizontal: 0 },
    content: { paddingHorizontal: spacing.screen, paddingTop: spacing.md, paddingBottom: spacing.lg },
    productRow: { gap: 12 },
    productCard: { width: CARD_WIDTH, flex: 0 },
    greeting: { fontSize: 30, fontWeight: "800", color: colors.textPrimary },
    subtitle: { fontSize: 15, color: colors.textSecondary, marginTop: 2 },
    search: {
        marginTop: spacing.md,
        height: 52,
        paddingHorizontal: spacing.md,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: colors.inputBorder,
        backgroundColor: colors.inputBackground,
        fontSize: 16,
        color: colors.textPrimary,
    },
    banner: {
        marginTop: spacing.md,
        padding: spacing.lg,
        borderRadius: 24,
        backgroundColor: homeColors.banner,
        overflow: "hidden",
    },
    bannerCircle: {
        position: "absolute",
        right: -60,
        top: -20,
        width: 200,
        height: 200,
        borderRadius: 100,
        borderWidth: 24,
        borderColor: homeColors.bannerCircle,
    },
    bannerTag: { fontSize: 13, fontWeight: "700", letterSpacing: 0.5, color: homeColors.bannerText },
    bannerTitle: { marginTop: spacing.sm, fontSize: 26, fontWeight: "800", color: colors.white },
    bannerButton: {
        alignSelf: "flex-start",
        marginTop: spacing.md,
        paddingHorizontal: spacing.md,
        paddingVertical: 10,
        borderRadius: 14,
        backgroundColor: colors.primary,
    },
    bannerButtonText: { fontSize: 16, fontWeight: "700", color: colors.white },
    sectionRow: {
        marginTop: spacing.lg,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    sectionTitle: { fontSize: 22, fontWeight: "800", color: colors.textPrimary },
    popularRow: { marginBottom: spacing.sm + 4 },
    seeAll: { fontSize: 15, fontWeight: "700", color: colors.primary },
    categoryList: { gap: 10, paddingTop: spacing.sm + 4 },
    categoryChip: {
        paddingHorizontal: spacing.md,
        paddingVertical: 12,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: colors.inputBorder,
        backgroundColor: homeColors.surface,
    },
    categoryChipActive: { backgroundColor: colors.primary, borderColor: colors.primary },
    categoryText: { fontSize: 14, fontWeight: "600", color: colors.textPrimary },
    categoryTextActive: { color: colors.white },
    state: { alignItems: "center", paddingVertical: spacing.xl },
    errorText: { color: homeColors.error, marginBottom: spacing.sm, textAlign: "center" },
});
