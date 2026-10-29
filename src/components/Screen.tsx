import React from "react";
import { StyleProp, StyleSheet, ViewStyle } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors } from "../theme/colors";
import { spacing } from "../theme/spacing";

type ScreenProps = {
    style?: StyleProp<ViewStyle>;
    children?: React.ReactNode;
};

export default function Screen({ style, children }: ScreenProps) {
    return <SafeAreaView style={[styles.container, style]}>{children}</SafeAreaView>;
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: spacing.screen,
        backgroundColor: colors.white,
    },
});
