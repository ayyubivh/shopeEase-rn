import type { LinkingOptions } from "@react-navigation/native";
import type { RootStackParamList } from "./types";

// shopease://product/5 -> Main > Tabs > Home > ProductDetail { id: 5 }
export const linking: LinkingOptions<RootStackParamList> = {
    prefixes: ["shopease://"],
    config: {
        screens: {
            Main: {
                screens: {
                    Tabs: {
                        screens: {
                            Home: {
                                initialRouteName: "HomeMain",
                                screens: {
                                    ProductDetail: {
                                        path: "product/:id",
                                        parse: { id: Number },
                                    },
                                },
                            },
                        },
                    },
                },
            },
        },
    },
};
