"use client";

import { useEffect, useState } from "react";

import type { Conversation } from "@/types";

import { ConversationManager } from "@/services/conversation/ConversationManager";

export function useConversations(): Conversation[] {
  const [conversations, setConversations] = useState<Conversation[]>(
    () => ConversationManager.getAll(),
  );

  useEffect(() => {
    return ConversationManager.subscribe(setConversations);
  }, []);

  return conversations;
}