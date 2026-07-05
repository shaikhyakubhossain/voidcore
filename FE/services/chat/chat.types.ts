import type { ChatMessage } from "@/types";

export interface SendMessageRequest {
  conversationId?: string;

  messages: ChatMessage[];
}

export interface SendMessageResponse {
  message: ChatMessage;
}