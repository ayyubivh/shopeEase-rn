import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { colors } from "../theme/colors";
import { spacing } from "../theme/spacing";

export default function HelpScreen() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Need help?</Text>
            <Text style={styles.subtitle}>Contact us at support@shopease.app</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, alignItems: "center", justifyContent: "center", padding: spacing.screen, backgroundColor: colors.white },
    title: { fontSize: 20, fontWeight: "800", color: colors.textPrimary },
    subtitle: { marginTop: spacing.sm, color: colors.textSecondary, textAlign: "center" },
});
