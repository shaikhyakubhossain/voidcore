import type { Metadata } from "next";
import { APP_DESCRIPTION, APP_NAME } from "@/config/constants";

export const twitter: Metadata["twitter"] = {
    card: "summary_large_image",
    title: APP_NAME,
    description: APP_DESCRIPTION,
    images: ["/og-image.png"],
};