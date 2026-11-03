import React, { useEffect, useRef } from "react";
import { ActivityIndicator, Animated, FlatList, StyleSheet, Text, View } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { useIsFocused } from "@react-navigation/native";
import ProductCard from "../components/ProductCard";
import { useOpenProduct } from "../navigation/openProduct";
import type { CategoryTabParamList } from "../navigation/types";
import { useProducts } from "../hooks/useCatalog";
import { colors } from "../theme/colors";
import { spacing } from "../theme/spacing";

const Tab = createMaterialTopTabNavigator<CategoryTabParamList>();

function CategoryProducts({ category }: { category: string }) {
    const { data, isLoading, error } = useProducts();
    const openProduct = useOpenProduct();
    const focused = useIsFocused();
    const opacity = useRef(new Animated.Value(0)).current;

    // Fade the list in each time its tab becomes the visible one.
    useEffect(() => {
        if (focused) {
            opacity.setValue(0);
            Animated.timing(opacity, { toValue: 1, duration: 300, useNativeDriver: true }).start();
        }
    }, [focused, opacity]);

    const items = (data ?? []).filter((p) => p.category === category);

    return (
        <Animated.View style={[styles.page, { opacity }]}>
            {isLoading && !data ? (
                <ActivityIndicator color={colors.primary} style={styles.state} />
            ) : (
                <FlatList
                    data={items}
                    keyExtractor={(p) => String(p.id)}
                    numColumns={2}
                    columnWrapperStyle={styles.columns}
                    contentContainerStyle={styles.content}
                    renderItem={({ item }) => (
                        <View style={styles.cell}>
                            <ProductCard product={item} onPress={() => openProduct(item.id)} />
                        </View>
                    )}
                    ListEmptyComponent={
                        <Text style={styles.empty}>{error ?? `No ${category} products`}</Text>
                    }
                />
            )}
        </Animated.View>
    );
}

const Electronics = () => <CategoryProducts category="Electronics" />;
const Fashion = () => <CategoryProducts category="Fashion" />;
const HomeCategory = () => <CategoryProducts category="Home" />;

export default function CategoriesScreen() {
    return (
        <Tab.Navigator
            screenOptions={{
                tabBarActiveTintColor: colors.primary,
                tabBarInactiveTintColor: colors.textSecondary,
                tabBarIndicatorStyle: { backgroundColor: colors.primary },
                tabBarLabelStyle: { fontWeight: "700", textTransform: "none" },
            }}
        >
            <Tab.Screen name="Electronics" component={Electronics} />
            <Tab.Screen name="Fashion" component={Fashion} />
            <Tab.Screen name="Home" component={HomeCategory} />
        </Tab.Navigator>
    );
}

const styles = StyleSheet.create({
    page: { flex: 1, backgroundColor: colors.white },
    content: { padding: spacing.screen },
    columns: { gap: 12, marginBottom: 12 },
    cell: { flex: 1 },
    state: { paddingVertical: spacing.xl },
    empty: { textAlign: "center", paddingVertical: spacing.xl, color: colors.textSecondary },
});
