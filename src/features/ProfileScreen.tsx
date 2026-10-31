import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Screen from "../components/Screen";
import { useAuthStore } from "../store/authStore";
import { colors } from "../theme/colors";
import { spacing } from "../theme/spacing";

export default function ProfileScreen() {
    const user = useAuthStore((s) => s.user);
    return (
        <Screen>
            <View style={styles.card}>
                <Text style={styles.name}>{user?.name ?? "Guest"}</Text>
                {!!user?.email && <Text style={styles.email}>{user.email}</Text>}
                {!!user?.role && <Text style={styles.role}>Role: {user.role}</Text>}
            </View>
        </Screen>
    );
}

const styles = StyleSheet.create({
    card: { marginTop: spacing.md, padding: spacing.md, borderRadius: 16, borderWidth: 1, borderColor: colors.inputBorder, gap: 4 },
    name: { fontSize: 20, fontWeight: "800", color: colors.textPrimary },
    email: { fontSize: 15, color: colors.textSecondary },
    role: { fontSize: 13, color: colors.textSecondary },
});
