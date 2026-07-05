"use client";
import type { PropsWithChildren } from "react";
import type { ChatContextType } from "./actions/chat.types";
import { createContext, useMemo, useReducer, useCallback } from "react";
import { INITIAL_CHAT_STATE } from "./ChatContext.constants";
import { chatReducer } from "./ChatContext.reducer";
import { ChatActions } from "./actions/chat.actions";

const ChatContext = createContext<ChatContextType | null>(null);

export const ChatProvider = ({ children }: PropsWithChildren) => {
  const [chat, dispatch] = useReducer(chatReducer, INITIAL_CHAT_STATE);

  const setInput = useCallback((value: string) => {
    dispatch(ChatActions.setInput(value));
  }, []);

  const clearChat = useCallback(() => {
    dispatch(ChatActions.clearChat());
  }, []);

 const sendMessage = useCallback(async () => {
  if (!chat.input.trim()) return;

  // TODO
}, [chat.input]);

  const value = useMemo(
  () => ({
    chat,
    setInput,
    sendMessage,
    clearChat,
  }),
  [
    chat,
    setInput,
    sendMessage,
    clearChat,
  ]
);

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
};

export default ChatContext;
