import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CartScreen from "../features/CartScreen";
import CategoriesScreen from "../features/CategoriesScreen";
import HomeScreen from "../features/HomeScreen";
import ProductListingScreen from "../features/ProductListingScreen";
import ProfileScreen from "../features/ProfileScreen";
import MenuButton from "./MenuButton";
import { stackScreenOptions } from "./stackOptions";

export type HomeStackParamList = {
    HomeMain: undefined;
    ProductListing: { category?: string | null } | undefined;
};
export type CategoriesStackParamList = { CategoriesMain: undefined };
export type CartStackParamList = { CartMain: undefined };
export type ProfileStackParamList = { ProfileMain: undefined };

const HomeStack = createNativeStackNavigator<HomeStackParamList>();
const CategoriesStack = createNativeStackNavigator<CategoriesStackParamList>();
const CartStack = createNativeStackNavigator<CartStackParamList>();
const ProfileStack = createNativeStackNavigator<ProfileStackParamList>();

const renderMenu = () => <MenuButton />;

export function HomeStackNavigator() {
    return (
        <HomeStack.Navigator screenOptions={stackScreenOptions}>
            <HomeStack.Screen
                name="HomeMain"
                component={HomeScreen}
                options={{ title: "ShopEase", headerLeft: renderMenu }}
            />
            <HomeStack.Screen
                name="ProductListing"
                component={ProductListingScreen}
                options={({ route }) => ({ title: route.params?.category ?? "All products" })}
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
                options={{ title: "Categories", headerLeft: renderMenu }}
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
