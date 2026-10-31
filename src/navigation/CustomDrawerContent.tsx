import React from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import {
    DrawerContentComponentProps,
    DrawerContentScrollView,
    DrawerItemList,
} from "@react-navigation/drawer";
import { useAuthStore } from "../store/authStore";
import { colors, homeColors } from "../theme/colors";
import { spacing } from "../theme/spacing";

export default function CustomDrawerContent(props: DrawerContentComponentProps) {
    const user = useAuthStore((s) => s.user);
    const logout = useAuthStore((s) => s.logout);

    const onLogout = () => {
        props.navigation.closeDrawer();
        // The root navigator swaps back to the Auth stack once the token is cleared.
        logout();
    };

    const name = user?.name ?? "Guest";

    return (
        <DrawerContentScrollView {...props} contentContainerStyle={styles.scroll}>
            <View style={styles.profile}>
                {user?.avatar ? (
                    <Image source={{ uri: user.avatar }} style={styles.avatar} />
                ) : (
                    <View style={styles.avatar}>
                        <Text style={styles.avatarText}>{name.charAt(0).toUpperCase()}</Text>
                    </View>
                )}
                <Text style={styles.name}>{name}</Text>
                {!!user?.email && <Text style={styles.email}>{user.email}</Text>}
            </View>

            <DrawerItemList {...props} />

            <View style={styles.spacer} />
            <Pressable style={styles.logout} onPress={onLogout}>
                <Text style={styles.logoutText}>Logout</Text>
            </Pressable>
        </DrawerContentScrollView>
    );
}

const styles = StyleSheet.create({
    scroll: { flexGrow: 1 },
    profile: {
        padding: spacing.md,
        marginBottom: spacing.sm,
        backgroundColor: homeColors.banner,
    },
    avatar: {
        width: 56,
        height: 56,
        borderRadius: 28,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: colors.primary,
    },
    avatarText: { fontSize: 24, fontWeight: "800", color: colors.white },
    name: { marginTop: spacing.sm, fontSize: 18, fontWeight: "800", color: colors.white },
    email: { marginTop: 2, fontSize: 13, color: homeColors.bannerText },
    spacer: { flex: 1 },
    logout: { margin: spacing.md, padding: spacing.md, borderRadius: 14, backgroundColor: homeColors.error },
    logoutText: { textAlign: "center", fontSize: 16, fontWeight: "700", color: colors.white },
});
