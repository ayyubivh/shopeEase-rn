import type { NativeStackNavigationOptions } from "@react-navigation/native-stack";
import { colors } from "../theme/colors";

export const stackScreenOptions: NativeStackNavigationOptions = {
    headerShadowVisible: false,
    headerTintColor: colors.primary,
    headerTitleStyle: { fontWeight: "700", color: colors.textPrimary },
    contentStyle: { backgroundColor: colors.white },
};
