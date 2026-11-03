import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import FilterScreen from "../features/FilterScreen";
import LoginScreen from "../features/LoginScreen";
import RegisterScreen from "../features/RegisterScreen";
import { useAuthStore } from "../store/authStore";
import { linking } from "./linking";
import MainDrawer from "./MainDrawer";
import type { AuthStackParamList, RootStackParamList } from "./types";

const Root = createNativeStackNavigator<RootStackParamList>();
const Auth = createNativeStackNavigator<AuthStackParamList>();

function AuthStack() {
    return (
        <Auth.Navigator screenOptions={{ headerShown: false }}>
            <Auth.Screen name="Login" component={LoginScreen} />
            <Auth.Screen name="Register" component={RegisterScreen} />
        </Auth.Navigator>
    );
}

export default function AppNavigator() {
    const token = useAuthStore((state) => state.token);

    return (
        <NavigationContainer linking={linking}>
            <Root.Navigator screenOptions={{ headerShown: false }}>
                {token ? (
                    <>
                        <Root.Screen name="Main" component={MainDrawer} />
                        <Root.Screen
                            name="Filter"
                            component={FilterScreen}
                            options={{
                                presentation: "formSheet",
                                animation: "slide_from_bottom",
                                sheetAllowedDetents: [0.5],
                                sheetGrabberVisible: true,
                            }}
                        />
                    </>
                ) : (
                    <Root.Screen name="Auth" component={AuthStack} />
                )}
            </Root.Navigator>
        </NavigationContainer>
    );
}
