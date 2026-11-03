import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import PrimaryButton from "../components/PrimaryButton";
import type { RootStackParamList } from "../navigation/types";
import { SortOption, useFilterStore } from "../store/filterStore";
import { colors } from "../theme/colors";
import { spacing } from "../theme/spacing";

type Props = NativeStackScreenProps<RootStackParamList, "Filter">;

const SORTS: { value: SortOption; label: string }[] = [
    { value: "none", label: "Default" },
    { value: "priceAsc", label: "Price: low to high" },
    { value: "priceDesc", label: "Price: high to low" },
    { value: "rating", label: "Top rated" },
];
const RATINGS = [0, 3, 4];

function Chip({ label, active, onPress }: { label: string; active: boolean; onPress: () => void }) {
    return (
        <Pressable style={[styles.chip, active && styles.chipActive]} onPress={onPress}>
            <Text style={[styles.chipText, active && styles.chipTextActive]}>{label}</Text>
        </Pressable>
    );
}

export default function FilterScreen({ navigation }: Props) {
    const { sort, minRating, set, reset } = useFilterStore();

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Filters</Text>

            <Text style={styles.section}>Sort by</Text>
            <View style={styles.wrap}>
                {SORTS.map((s) => (
                    <Chip key={s.value} label={s.label} active={sort === s.value} onPress={() => set({ sort: s.value })} />
                ))}
            </View>

            <Text style={styles.section}>Minimum rating</Text>
            <View style={styles.wrap}>
                {RATINGS.map((r) => (
                    <Chip
                        key={r}
                        label={r === 0 ? "Any" : `${r}★ & up`}
                        active={minRating === r}
                        onPress={() => set({ minRating: r })}
                    />
                ))}
            </View>

            <View style={styles.actions}>
                <Pressable onPress={reset}>
                    <Text style={styles.reset}>Reset</Text>
                </Pressable>
                <View style={styles.apply}>
                    <PrimaryButton title="Apply" onPress={() => navigation.goBack()} />
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: spacing.screen, backgroundColor: colors.white },
    title: { fontSize: 22, fontWeight: "800", color: colors.textPrimary },
    section: { marginTop: spacing.lg, marginBottom: spacing.sm, fontSize: 16, fontWeight: "700", color: colors.textPrimary },
    wrap: { flexDirection: "row", flexWrap: "wrap", gap: 10 },
    chip: { paddingHorizontal: spacing.md, paddingVertical: 10, borderRadius: 14, borderWidth: 1, borderColor: colors.inputBorder },
    chipActive: { backgroundColor: colors.primary, borderColor: colors.primary },
    chipText: { fontSize: 14, fontWeight: "600", color: colors.textPrimary },
    chipTextActive: { color: colors.white },
    actions: { flexDirection: "row", alignItems: "center", marginTop: spacing.xl, gap: spacing.md },
    reset: { fontSize: 16, fontWeight: "700", color: colors.primary, paddingHorizontal: spacing.sm },
    apply: { flex: 1 },
});
