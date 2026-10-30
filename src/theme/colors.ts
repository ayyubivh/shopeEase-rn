export const colors = {
    primary: "#556B2F",
    white: "#FFFFFF",
    black: "#000000",
    textPrimary: "#1A1A1A",
    textSecondary: "#6B6B6B",
    inputBackground: "#FDFDF8",
    inputBorder: "#E8E8D8",
    placeholder: "#8A8A8A",
} as const;

export type ColorName = keyof typeof colors;

export const homeColors = {
    surface: "#FFFFFF",
    banner: "#344020",
    bannerCircle: "#4A5A2D",
    bannerText: "#D9DEC8",
    imagePlaceholder: "#ECEFDF",
    badge: "#B93A22",
    error: "#B93A22",
} as const;
