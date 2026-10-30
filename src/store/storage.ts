import { createMMKV } from "react-native-mmkv";

export const storage = createMMKV({ id: "shopease" });

export const STORAGE_KEYS = {
    token: "auth.token",
    user: "auth.user",
};
