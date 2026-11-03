import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { SvgProps } from "react-native-svg";
import CartIcon from "../assets/icons/cart.svg";
import CategoriesIcon from "../assets/icons/categories.svg";
import HomeIcon from "../assets/icons/home.svg";
import ProfileIcon from "../assets/icons/profile.svg";
import { selectCartCount, useCartStore } from "../store/cartStore";
import type { MainTabParamList } from "./types";
import {
    CartStackNavigator,
    CategoriesStackNavigator,
    HomeStackNavigator,
    ProfileStackNavigator,
} from "./TabStacks";

const Tab = createBottomTabNavigator<MainTabParamList>();

const ICONS: Record<keyof MainTabParamList, React.FC<SvgProps>> = {
    Home: HomeIcon,
    Categories: CategoriesIcon,
    Cart: CartIcon,
    Profile: ProfileIcon,
};

const ACTIVE_COLOR = '#5B6B2D';
const INACTIVE_COLOR = '#666B75';

export default function HomeTabs() {
    const cartCount = useCartStore(selectCartCount);

    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarActiveTintColor: ACTIVE_COLOR,
                tabBarInactiveTintColor: INACTIVE_COLOR,
                tabBarLabelStyle: { fontSize: 12, fontWeight: '500' },
                tabBarIcon: ({ color, size }) => {
                    const Icon = ICONS[route.name];
                    return <Icon width={size} height={size} color={color} />;
                },
            })}
        >
            <Tab.Screen name="Home" component={HomeStackNavigator} />
            <Tab.Screen name="Categories" component={CategoriesStackNavigator} />
            <Tab.Screen
                name="Cart"
                component={CartStackNavigator}
                options={{ tabBarBadge: cartCount > 0 ? cartCount : undefined }}
            />
            <Tab.Screen name="Profile" component={ProfileStackNavigator} />
        </Tab.Navigator>
    );
}
