import type { Metadata } from "next";
import { APP_DESCRIPTION, APP_NAME, APP_URL } from "@/config/constants";

export const openGraph: Metadata["openGraph"] = {
    type: "website",
    locale: "en_US",
    url: APP_URL,
    siteName: APP_NAME,
    title: APP_NAME,
    description: APP_DESCRIPTION,
    images: [
        {
            url: "/og-image.png",
            width: 1200,
            height: 630,
            alt: APP_NAME,
        },
    ],
};