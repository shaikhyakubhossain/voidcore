import type { ChatMessage, Conversation, ProviderInfo, ProviderModels } from "@/types";
interface SetLLMStatePayload {
  providers: ProviderInfo[];

  providerModels: ProviderModels[];

  selectedProvider: string | null;

  selectedModel: string | null;
}

export const ChatActionTypes = {
  SET_INPUT: "SET_INPUT",
  SET_LOADING: "SET_LOADING",
  ADD_MESSAGE: "ADD_MESSAGE",
  SET_MESSAGES: "SET_MESSAGES",
  SET_ERROR: "SET_ERROR",
  CLEAR_CHAT: "CLEAR_CHAT",

  SET_CONVERSATION_ID: "SET_CONVERSATION_ID",
  SET_CONVERSATION: "SET_CONVERSATION",

  UPDATE_MESSAGE_CONTENT: "UPDATE_MESSAGE_CONTENT",
  SET_LLM_STATE: "SET_LLM_STATE",
  SET_SELECTED_PROVIDER: "SET_SELECTED_PROVIDER",
  SET_SELECTED_MODEL: "SET_SELECTED_MODEL",
} as const;

export const setInput = (value: string) => ({
  type: ChatActionTypes.SET_INPUT,
  payload: value,
});

export const setLoading = (loading: boolean) => ({
  type: ChatActionTypes.SET_LOADING,
  payload: loading,
});

export const addMessage = (message: ChatMessage) => ({
  type: ChatActionTypes.ADD_MESSAGE,
  payload: message,
});

export const setMessages = (messages: ChatMessage[]) => ({
  type: ChatActionTypes.SET_MESSAGES,
  payload: messages,
});

export const clearChat = () => ({
  type: ChatActionTypes.CLEAR_CHAT,
});

export const setConversationId = (conversationId: string) => ({
  type: ChatActionTypes.SET_CONVERSATION_ID,
  payload: conversationId,
});

export const setConversation = (conversation: Conversation) => ({
  type: ChatActionTypes.SET_CONVERSATION,
  payload: conversation,
});

export const setError = (error: string | null) => ({
  type: ChatActionTypes.SET_ERROR,
  payload: error,
});

export const setLLMState = (payload: SetLLMStatePayload) => ({
  type: ChatActionTypes.SET_LLM_STATE,
  payload,
});

export const setSelectedProvider = (provider: string) => ({
  type: ChatActionTypes.SET_SELECTED_PROVIDER,
  payload: provider,
});

export const setSelectedModel = (model: string) => ({
  type: ChatActionTypes.SET_SELECTED_MODEL,
  payload: model,
});

export const updateMessageContent = (id: string, chunk: string) => ({
  type: ChatActionTypes.UPDATE_MESSAGE_CONTENT,
  payload: {
    id,
    chunk,
  },
});

export const ChatActions = {
  setInput,
  setLoading,
  addMessage,
  setMessages,
  clearChat,

  setConversationId,
  setConversation,

  setError,
  setLLMState,
  setSelectedProvider,
  setSelectedModel,
  updateMessageContent,
};
