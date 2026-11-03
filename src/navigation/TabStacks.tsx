import React from "react";
import { Pressable, StyleSheet, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
    CardStyleInterpolators,
    StackCardStyleInterpolator,
    StackNavigationOptions,
    createStackNavigator,
} from "@react-navigation/stack";
import CartScreen from "../features/CartScreen";
import CategoriesScreen from "../features/CategoriesScreen";
import EditAddressScreen from "../features/EditAddressScreen";
import HomeScreen from "../features/HomeScreen";
import ProductDetailScreen from "../features/ProductDetailScreen";
import ProductListingScreen from "../features/ProductListingScreen";
import ProfileScreen from "../features/ProfileScreen";
import { colors } from "../theme/colors";
import MenuButton from "./MenuButton";
import { stackScreenOptions } from "./stackOptions";
import type {
    CartStackParamList,
    CategoriesStackParamList,
    HomeStackParamList,
    ProfileStackParamList,
} from "./types";

const HomeStack = createStackNavigator<HomeStackParamList>();
const CategoriesStack = createNativeStackNavigator<CategoriesStackParamList>();
const CartStack = createNativeStackNavigator<CartStackParamList>();
const ProfileStack = createNativeStackNavigator<ProfileStackParamList>();

const renderMenu = () => <MenuButton />;

const forRiseAndFade: StackCardStyleInterpolator = ({ current, layouts }) => ({
    cardStyle: {
        opacity: current.progress,
        transform: [
            {
                translateY: current.progress.interpolate({
                    inputRange: [0, 1],
                    outputRange: [layouts.screen.height * 0.12, 0],
                }),
            },
            { scale: current.progress.interpolate({ inputRange: [0, 1], outputRange: [0.92, 1] }) },
        ],
    },
});

const homeStackOptions: StackNavigationOptions = {
    headerShadowVisible: false,
    headerTintColor: colors.primary,
    headerTitleStyle: { fontWeight: "700", color: colors.textPrimary },
    cardStyle: { backgroundColor: colors.white },
    gestureEnabled: true,
};

const styles = StyleSheet.create({
    filterButton: { marginRight: 16 },
    filterText: { fontSize: 16, fontWeight: "700", color: colors.primary },
});

function FilterButton() {
    const navigation = useNavigation();
    return (
        <Pressable onPress={() => navigation.navigate("Filter")} hitSlop={12} accessibilityLabel="Filters" style={styles.filterButton}>
            <Text style={styles.filterText}>Filter</Text>
        </Pressable>
    );
}

export function HomeStackNavigator() {
    return (
        <HomeStack.Navigator screenOptions={homeStackOptions}>
            <HomeStack.Screen
                name="HomeMain"
                component={HomeScreen}
                options={{ title: "ShopEase", headerLeft: renderMenu }}
            />
            <HomeStack.Screen
                name="ProductListing"
                component={ProductListingScreen}
                options={({ route }) => ({
                    title: route.params?.category ?? "All products",
                    headerRight: () => <FilterButton />,
                })}
            />
            <HomeStack.Screen
                name="ProductDetail"
                component={ProductDetailScreen}
                options={{
                    title: "Product",
                    cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
                }}
            />
            <HomeStack.Screen
                name="EditAddress"
                component={EditAddressScreen}
                options={{
                    title: "Edit address",
                    cardStyleInterpolator: forRiseAndFade,
                }}
            />
        </HomeStack.Navigator>
    );
}

export function CategoriesStackNavigator() {
    return (
        <CategoriesStack.Navigator screenOptions={stackScreenOptions}>
            <CategoriesStack.Screen
                name="CategoriesMain"
                component={CategoriesScreen}
                options={{ title: "Categories", headerLeft: renderMenu, headerShadowVisible: false }}
            />
        </CategoriesStack.Navigator>
    );
}

export function CartStackNavigator() {
    return (
        <CartStack.Navigator screenOptions={stackScreenOptions}>
            <CartStack.Screen
                name="CartMain"
                component={CartScreen}
                options={{ title: "My Cart", headerLeft: renderMenu }}
            />
        </CartStack.Navigator>
    );
}

export function ProfileStackNavigator() {
    return (
        <ProfileStack.Navigator screenOptions={stackScreenOptions}>
            <ProfileStack.Screen
                name="ProfileMain"
                component={ProfileScreen}
                options={{ title: "Profile", headerLeft: renderMenu }}
            />
        </ProfileStack.Navigator>
    );
}
