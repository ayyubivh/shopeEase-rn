import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import IconBadge from "../components/IconBadge";
import PrimaryButton from "../components/PrimaryButton";
import Screen from "../components/Screen";
import TextField from "../components/TextField";
import { registerApi } from "../api/endpoints";
import type { AuthStackParamList } from "../navigation/types";
import { useAuthStore } from "../store/authStore";
import { colors, homeColors } from "../theme/colors";
import { spacing } from "../theme/spacing";

type Props = NativeStackScreenProps<AuthStackParamList, "Register">;

export default function RegisterScreen({ navigation }: Props) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const setSession = useAuthStore((s) => s.setSession);

    const handleRegister = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const data = await registerApi(name.trim(), email.trim(), password);
            // The root navigator swaps to the main app as soon as a session exists.
            setSession(data.token, data.user);
        } catch (e) {
            setError(e instanceof Error ? e.message : "Something went wrong. Please try again.");
            setIsLoading(false);
        }
    };

    return (
        <Screen style={styles.screen}>
            <View style={styles.header}>
                <IconBadge />
                <Text style={styles.brand}>ShopEase</Text>
            </View>
            <View>
                <Text style={styles.title}>Create account</Text>
                <Text style={styles.subtitle}>Join ShopEase and start shopping.</Text>
            </View>
            <View style={styles.form}>
                <TextField label="Name" placeholder="Your name" value={name} onChangeText={setName} />
                <TextField
                    label="Email"
                    placeholder="you@example.com"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoCorrect={false}
                />
                <TextField
                    label="Password"
                    placeholder="Choose a password"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                    autoCapitalize="none"
                />
                {error ? <Text style={styles.error}>{error}</Text> : null}
                <PrimaryButton
                    title="Register"
                    onPress={handleRegister}
                    loading={isLoading}
                    disabled={!name || !email || !password || isLoading}
                />
                <Pressable onPress={() => navigation.goBack()} style={styles.link}>
                    <Text style={styles.linkText}>Already have an account? Login</Text>
                </Pressable>
            </View>
        </Screen>
    );
}

const styles = StyleSheet.create({
    screen: { paddingTop: spacing.xl, gap: spacing.xl },
    header: { flexDirection: "row", alignItems: "center", gap: spacing.sm },
    brand: { fontSize: 24, fontWeight: "800", color: colors.textPrimary },
    title: { fontSize: 28, fontWeight: "800", color: colors.textPrimary },
    subtitle: { marginTop: 4, fontSize: 15, color: colors.textSecondary },
    form: { gap: spacing.md },
    error: { color: homeColors.error },
    link: { alignItems: "center", paddingVertical: spacing.sm },
    linkText: { fontSize: 15, fontWeight: "700", color: colors.primary },
});
