import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { SvgProps } from "react-native-svg";
import CartIcon from "../assets/icons/cart.svg";
import CategoriesIcon from "../assets/icons/categories.svg";
import HomeIcon from "../assets/icons/home.svg";
import ProfileIcon from "../assets/icons/profile.svg";
import CartScreen from "../features/CartScreen";
import CategoriesScreen from "../features/CategoriesScreen";
import HomeScreen from "../features/HomeScreen";
import ProfileScreen from "../features/ProfileScreen";

export type MainTabParamList = {
    Home: undefined;
    Categories: undefined;
    Cart: undefined;
    Profile: undefined;
};

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
            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen name="Categories" component={CategoriesScreen} />
            <Tab.Screen name="Cart" component={CartScreen} />
            <Tab.Screen name="Profile" component={ProfileScreen} />
        </Tab.Navigator>
    );
}
