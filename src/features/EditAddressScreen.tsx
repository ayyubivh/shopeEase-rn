import React, { useEffect, useRef, useState } from "react";
import { Alert, ScrollView, StyleSheet } from "react-native";
import type { StackScreenProps } from "@react-navigation/stack";
import PrimaryButton from "../components/PrimaryButton";
import Screen from "../components/Screen";
import TextField from "../components/TextField";
import type { Address, HomeStackParamList } from "../navigation/types";
import { spacing } from "../theme/spacing";

type Props = StackScreenProps<HomeStackParamList, "EditAddress">;

const EMPTY: Address = { fullName: "", street: "", city: "", phone: "" };

export default function EditAddressScreen({ navigation, route }: Props) {
    const initial = route.params?.address ?? EMPTY;
    const [form, setForm] = useState<Address>(initial);
    const saved = useRef(false);

    const isDirty = (Object.keys(initial) as (keyof Address)[]).some((k) => form[k] !== initial[k]);
    const isValid = Object.values(form).every((v) => v.trim().length > 0);

    useEffect(() => {
        return navigation.addListener("beforeRemove", (e) => {
            if (!isDirty || saved.current) return;
            e.preventDefault();
            Alert.alert("Discard changes?", "You have unsaved changes. Leave without saving?", [
                { text: "Keep editing", style: "cancel" },
                { text: "Discard", style: "destructive", onPress: () => navigation.dispatch(e.data.action) },
            ]);
        });
    }, [navigation, isDirty]);

    const update = (key: keyof Address) => (value: string) => setForm((f) => ({ ...f, [key]: value }));

    const save = () => {
        saved.current = true;
        const productRoute = navigation.getState().routes.find((r) => r.name === "ProductDetail");
        const id = (productRoute?.params as HomeStackParamList["ProductDetail"] | undefined)?.id;
        if (id !== undefined) {
            navigation.popTo("ProductDetail", { id, address: form }, { merge: true });
        } else {
            navigation.goBack();
        }
    };

    return (
        <Screen edges={["left", "right", "bottom"]}>
            <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
                <TextField label="Full name" value={form.fullName} onChangeText={update("fullName")} />
                <TextField label="Street" value={form.street} onChangeText={update("street")} />
                <TextField label="City" value={form.city} onChangeText={update("city")} />
                <TextField
                    label="Phone"
                    value={form.phone}
                    onChangeText={update("phone")}
                    keyboardType="phone-pad"
                />
                <PrimaryButton title="Save address" onPress={save} disabled={!isValid || !isDirty} />
            </ScrollView>
        </Screen>
    );
}

const styles = StyleSheet.create({
    content: { paddingTop: spacing.md, gap: spacing.md },
});
