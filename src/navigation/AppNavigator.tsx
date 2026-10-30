import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ProductListingScreen from "../features/ProductListingScreen";
import LoginScreen from "../features/LoginScreen";
import { useAuthStore } from "../store/authStore";
import HomeTabs from "./HomeTabs";

export type RootStackParamList = {
    Main: undefined;
    Login: undefined;
    ProductListing: { category?: string | null } | undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
    const token = useAuthStore(state => state.token);

    return (
        <NavigationContainer >
            <Stack.Navigator initialRouteName={token ? "Main" : "Login"} screenOptions={{ headerShown: false }}>
                <Stack.Screen name="Main" component={HomeTabs} />
                <Stack.Screen name="Login" component={LoginScreen} />
                <Stack.Screen name="ProductListing" component={ProductListingScreen} />
            </Stack.Navigator>
        </NavigationContainer>)
}