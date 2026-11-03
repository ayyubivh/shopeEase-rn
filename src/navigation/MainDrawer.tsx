import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import HelpScreen from "../features/HelpScreen";
import MyOrdersScreen from "../features/MyOrdersScreen";
import CustomDrawerContent from "./CustomDrawerContent";
import HomeTabs from "./HomeTabs";
import { colors } from "../theme/colors";

import type { DrawerParamList } from "./types";

const Drawer = createDrawerNavigator<DrawerParamList>();

export default function MainDrawer() {
    return (
        <Drawer.Navigator
            drawerContent={CustomDrawerContent}
            screenOptions={{
                headerShadowVisible: false,
                headerTintColor: colors.primary,
                headerTitleStyle: { fontWeight: "700", color: colors.textPrimary },
                drawerActiveTintColor: colors.primary,
            }}
        >
            {/* Tabs render their own stack headers, so the drawer header is hidden here. */}
            <Drawer.Screen name="Tabs" component={HomeTabs} options={{ headerShown: false, title: "Shop" }} />
            <Drawer.Screen name="MyOrders" component={MyOrdersScreen} options={{ title: "My Orders" }} />
            <Drawer.Screen name="Help" component={HelpScreen} options={{ title: "Help" }} />
        </Drawer.Navigator>
    );
}
