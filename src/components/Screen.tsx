import React from "react";
import { StyleProp, StyleSheet, ViewStyle } from "react-native";
import { Edge, SafeAreaView } from "react-native-safe-area-context";
import { colors } from "../theme/colors";
import { spacing } from "../theme/spacing";

type ScreenProps = {
    style?: StyleProp<ViewStyle>;
    edges?: readonly Edge[];
    children?: React.ReactNode;
};

export default function Screen({ style, edges, children }: ScreenProps) {
    return <SafeAreaView edges={edges} style={[styles.container, style]}>{children}</SafeAreaView>;
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: spacing.screen,
        backgroundColor: colors.white,
    },
});
