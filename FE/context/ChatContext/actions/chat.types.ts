import type { ChatMessage } from "@/types";

import type {
  addMessage,
  clearChat,
  setInput,
  setLoading,
  setMessages,
} from "./chat.actions";

export interface ChatState {
  messages: ChatMessage[];
  input: string;
  loading: boolean;
}

export type ChatAction =
  | ReturnType<typeof setInput>
  | ReturnType<typeof setLoading>
  | ReturnType<typeof addMessage>
  | ReturnType<typeof setMessages>
  | ReturnType<typeof clearChat>;

export interface ChatContextType {
  chat: ChatState;

  setInput: (value: string) => void;

  sendMessage: () => Promise<void>;

  clearChat: () => void;
}
