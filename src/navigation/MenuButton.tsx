import React from "react";
import { Pressable, StyleSheet, Text } from "react-native";
import { DrawerActions, useNavigation } from "@react-navigation/native";
import { colors } from "../theme/colors";

// Hamburger shown in the header of each tab's root screen; opens the parent drawer.
export default function MenuButton() {
    const navigation = useNavigation();
    return (
        <Pressable
            onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
            hitSlop={12}
            accessibilityLabel="Open menu"
        >
            <Text style={styles.icon}>☰</Text>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    icon: { fontSize: 22, color: colors.primary },
});
