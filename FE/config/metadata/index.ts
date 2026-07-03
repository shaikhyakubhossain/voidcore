import type { Metadata } from "next";
import { APP_DESCRIPTION, APP_NAME, APP_URL, APP_KEYWORDS } from "@/config/constants";
import { icons } from "./icons";
import { openGraph } from "./openGraph";
import { robots } from "./robots";
import { twitter } from "./twitter";

export const metadata: Metadata = {
    metadataBase: new URL(APP_URL),
    title: {
        default: APP_NAME,
        template: `%s | ${APP_NAME}`,
    },
    description: APP_DESCRIPTION,
    applicationName: APP_NAME,
    keywords: APP_KEYWORDS,
    robots,
    icons,
    openGraph,
    twitter,
};