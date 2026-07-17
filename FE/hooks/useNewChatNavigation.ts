"use client";
import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useChat } from "./useChat";
import { NAVIGATION_INTENTS } from "@/constants/navigation";

export function useNewChatNavigation() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const { startNewChat } = useChat();

  useEffect(() => {
    const intent = searchParams.get("intent");

    if (intent !== NAVIGATION_INTENTS.NEW_CHAT) {
      return;
    }

    startNewChat();

    router.replace("/");
  }, [searchParams, router, startNewChat]);
}