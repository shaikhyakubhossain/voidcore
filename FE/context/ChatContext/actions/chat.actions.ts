import type { ChatMessage } from "@/types";

export const ChatActionTypes = {
  SET_INPUT: "SET_INPUT",
  SET_LOADING: "SET_LOADING",
  ADD_MESSAGE: "ADD_MESSAGE",
  SET_MESSAGES: "SET_MESSAGES",
  CLEAR_CHAT: "CLEAR_CHAT",
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

export const ChatActions = {
  setInput,
  setLoading,
  addMessage,
  setMessages,
  clearChat,
};