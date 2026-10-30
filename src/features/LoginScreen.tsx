import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import EyeIcon from "../assets/icons/eye.svg";
import LockIcon from "../assets/icons/lock.svg";
import MailIcon from "../assets/icons/mail.svg";
import IconBadge from "../components/IconBadge";
import Screen from "../components/Screen";
import TextField from "../components/TextField";
import { colors } from "../theme/colors";
import { spacing } from "../theme/spacing";
import PrimaryButton from "../components/PrimaryButton";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/AppNavigator";
import { useAuthStore } from "../store/authStore";

export default function LoginScreen() {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    const login = useAuthStore(state => state.login);
    const isLoading = useAuthStore(state => state.isLoading);
    const error = useAuthStore(state => state.error);

    const handleLogin = async () => {
        const success = await login(email.trim(), password);
        if (success) {
            navigation.replace("Main");
        }
    };

    return (
        <Screen style={styles.screen}>

            <View style={styles.header}>
                <IconBadge />
                <Text style={styles.brand}>ShopEase</Text>
            </View>

            <View style={styles.welcome}>
                <Text style={styles.welcomeTitle}>Welcome back</Text>
                <Text style={styles.welcomeSubtitle}>
                    Sign in to pick up where you left off.
                </Text>
            </View>

            <View style={styles.form}>
                <TextField
                    label="Email"
                    leftIcon={<MailIcon width={20} height={20} color={colors.placeholder} />}
                    placeholder="you@example.com"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoCorrect={false}
                />
                <TextField
                    label="Password"
                    leftIcon={<LockIcon width={20} height={20} color={colors.placeholder} />}
                    rightIcon={
                        <Pressable onPress={() => setIsPasswordVisible(prev => !prev)} hitSlop={8}>
                            <EyeIcon
                                width={20}
                                height={20}
                                color={isPasswordVisible ? colors.primary : colors.placeholder}
                            />
                        </Pressable>
                    }
                    placeholder="Enter your password"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry={!isPasswordVisible}
                    keyboardType="visible-password"
                    autoCapitalize="none"

                />
                {error ? <Text style={styles.error}>{error}</Text> : null}
                <PrimaryButton
                    title="Login"
                    onPress={handleLogin}
                    loading={isLoading}
                    disabled={!email || !password || isLoading}
                />
            </View>
            {/* <Text style={styles.forgotPassword}>Forgot password?</Text> */}
        </Screen>
    );
}

const styles = StyleSheet.create({
    screen: {
        paddingTop: spacing.xl,
        gap: spacing.xl,
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        gap: spacing.md,
    },
    brand: {
        fontSize: 16,
        fontWeight: "600",
        color: colors.textPrimary,
    },
    welcome: {
        marginTop: 10,
        gap: spacing.sm,
    },
    welcomeTitle: {
        fontSize: 28,
        fontWeight: "700",
        color: colors.textPrimary,
    },
    form: {
        gap: spacing.lg,
    },
    welcomeSubtitle: {
        fontSize: 15,
        lineHeight: 22,
        color: colors.textSecondary,
    },
    error: {
        fontSize: 14,
        color: "#C0392B",
    },
    forgotPassword: {
        alignSelf: "flex-end",
        fontSize: 14,
        fontWeight: "600",
        color: colors.primary,
    },
});
