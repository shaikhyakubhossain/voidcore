import type { ChatMessage, Conversation } from "@/types";

import type {
  addMessage,
  clearChat,
  setConversation,
  setConversationId,
  setError,
  setInput,
  setLLMState,
  setLoading,
  setMessages,
  setSelectedModel,
  setSelectedProvider,
  updateMessageContent,
} from "./chat.actions";
import { ProviderInfo, ProviderModels } from "@/types/api/llm";

export interface ChatState {
  conversationId: string | null;

  messages: ChatMessage[];

  input: string;

  loading: boolean;
  
  error: string | null;

  llm: {
    providers: ProviderInfo[];

    providerModels: ProviderModels[];

    selectedProvider: string | null;

    selectedModel: string | null;

    loading: boolean;

    error: string | null;
  };
}

export type ChatAction =
  | ReturnType<typeof setInput>
  | ReturnType<typeof setLoading>
  | ReturnType<typeof addMessage>
  | ReturnType<typeof setMessages>
  | ReturnType<typeof clearChat>

  | ReturnType<typeof setConversationId>
  | ReturnType<typeof setConversation>

  | ReturnType<typeof setError>
  | ReturnType<typeof setLLMState>
  | ReturnType<typeof setSelectedProvider>
  | ReturnType<typeof setSelectedModel>
  | ReturnType<typeof updateMessageContent>;

export interface ChatContextType {
  chat: ChatState;

  setInput: (value: string) => void;

  sendMessage: () => Promise<void>;

  clearChat: () => void;

  loadConversation(conversation: Conversation): void;

  setSelectedProvider: (provider: string) => void;

  setSelectedModel: (model: string) => void;

  startNewChat(): void;
}
