import type { ChatState } from "./actions/chat.types";

export const INITIAL_CHAT_STATE: ChatState = {
  conversationId: undefined,
  messages: [],
  input: "",
  loading: false,
  error: null,

  llm: {
    providers: [],
    providerModels: [],

    selectedProvider: null,
    selectedModel: null,

    loading: false,
    error: null,
  },
};

export const INITIAL_SESSION_STATE = {
  conversationId: undefined,
  messages: [],
  input: "",
  loading: false,
  error: null,
};