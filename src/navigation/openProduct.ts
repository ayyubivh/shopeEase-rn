import { useNavigation } from "@react-navigation/native";
import { useCallback } from "react";

// Product cards appear in several tabs, so route through the Home stack explicitly.
export function useOpenProduct() {
    const navigation = useNavigation();
    return useCallback(
        (id: number) =>
            navigation.navigate("Main", {
                screen: "Tabs",
                params: { screen: "Home", params: { screen: "ProductDetail", params: { id } } },
            }),
        [navigation],
    );
}
