
import React from "react"
import { ActivityIndicator, Pressable, StyleSheet, Text } from "react-native";
import { colors } from "../theme/colors";
type PrimaryButtonProps = {
    title: string;
    onPress: () => void;
    loading?: boolean;
    disabled?: boolean;
}

export default function PrimaryButton({
    title,
    onPress,
    loading = false,
    disabled = false,

}: PrimaryButtonProps) {

    return (
        <Pressable style={[
            styles.button, disabled && styles.disabled
        ]}
            onPress={onPress}
            disabled={disabled || loading
            }>
            {
                loading ? (<ActivityIndicator></ActivityIndicator>) :
                    (<Text style={styles.text}>{title}</Text>)
            }
        </Pressable>)
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: colors.primary,
        paddingVertical: 14,
        paddingHorizontal: 20,
        borderRadius: 16,
        alignItems: 'center',
        justifyContent: 'center'
    },
    text: {
        color: colors.white,
        fontSize: 15,
        fontWeight: 600
    },
    disabled: {
        opacity: 0.5
    }
})