import React from "react";
import { StyleProp, StyleSheet, View, ViewStyle } from "react-native";
import { colors } from "../theme/colors";

type IconBadgeProps = {
    size?: number;
    color?: string;
    radius?: number;
    style?: StyleProp<ViewStyle>;
    children?: React.ReactNode;
};

export default function IconBadge({
    size = 64,
    color = colors.primary,
    radius = size * 0.3,
    style,
    children,
}: IconBadgeProps) {
    return (
        <View
            style={[
                styles.badge,
                { width: size, height: size, borderRadius: radius, backgroundColor: color },
                style,
            ]}
        >
            {children ?? <ShopBagIcon size={size * 0.45} />}
        </View>
    );
}

export function ShopBagIcon({ size = 28, color = colors.white }: { size?: number; color?: string }) {
    const stroke = Math.max(2, size * 0.09);
    return (
        <View style={{ width: size, height: size, alignItems: "center", justifyContent: "flex-end" }}>

            <View
                style={{
                    position: "absolute",
                    top: 0,
                    width: size * 0.45,
                    height: size * 0.4,
                    borderWidth: stroke,
                    borderColor: color,
                    borderTopLeftRadius: size * 0.25,
                    borderTopRightRadius: size * 0.25,
                    borderBottomWidth: 0,
                }}
            />
            <View
                style={{
                    width: size,
                    height: size * 0.82,
                    borderWidth: stroke,
                    borderColor: color,
                    borderRadius: size * 0.2,
                    backgroundColor: "transparent",
                }}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    badge: {
        alignItems: "center",
        justifyContent: "center",
    },
});
