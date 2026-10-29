import React from "react";
import { StyleSheet, Text, TextInput, TextInputProps, View } from "react-native";
import { colors } from "../theme/colors";
import { spacing } from "../theme/spacing";

type TextFieldProps = TextInputProps & {
    label: string;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
};

export default function TextField({ label, leftIcon, rightIcon, style, ...inputProps }: TextFieldProps) {
    return (
        <View style={styles.wrapper}>
            <Text style={styles.label}>{label}</Text>
            <View style={styles.field}>
                {leftIcon}
                <TextInput
                    style={[styles.input, style]}
                    placeholderTextColor={colors.placeholder}
                    {...inputProps}
                />
                {rightIcon}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        gap: spacing.sm,
    },
    label: {
        fontSize: 14,
        fontWeight: "600",
        color: colors.textPrimary,
    },
    field: {
        flexDirection: "row",
        alignItems: "center",
        gap: spacing.sm,
        height: 56,
        paddingHorizontal: spacing.md,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: colors.inputBorder,
        backgroundColor: colors.inputBackground,
    },
    input: {
        flex: 1,
        fontSize: 16,
        color: colors.textPrimary,
        paddingVertical: 0,
    },
});
