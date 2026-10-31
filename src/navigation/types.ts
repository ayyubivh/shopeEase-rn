import type { NavigatorScreenParams } from "@react-navigation/native";

export type Address = {
    fullName: string;
    street: string;
    city: string;
    phone: string;
};

export type AuthStackParamList = {
    Login: undefined;
    Register: undefined;
};

export type HomeStackParamList = {
    HomeMain: undefined;
    ProductListing: { category?: string | null } | undefined;
    ProductDetail: { id: number; address?: Address };
    EditAddress: { address?: Address };
};
export type CategoriesStackParamList = { CategoriesMain: undefined };
export type CartStackParamList = { CartMain: undefined };
export type ProfileStackParamList = { ProfileMain: undefined };

export type MainTabParamList = {
    Home: NavigatorScreenParams<HomeStackParamList>;
    Categories: NavigatorScreenParams<CategoriesStackParamList>;
    Cart: NavigatorScreenParams<CartStackParamList>;
    Profile: NavigatorScreenParams<ProfileStackParamList>;
};

export type DrawerParamList = {
    Tabs: NavigatorScreenParams<MainTabParamList>;
    MyOrders: undefined;
    Help: undefined;
};

// Logged-out users only ever see Auth; logged-in users see Main (+ the Filter modal).
export type RootStackParamList = {
    Auth: NavigatorScreenParams<AuthStackParamList>;
    Main: NavigatorScreenParams<DrawerParamList>;
    Filter: undefined;
};

export type CategoryTabParamList = {
    Electronics: undefined;
    Fashion: undefined;
    Home: undefined;
};

declare global {
    namespace ReactNavigation {
        interface RootParamList extends RootStackParamList {}
    }
}
