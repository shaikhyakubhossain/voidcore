"use client";
import type { PropsWithChildren } from "react";
import type { ChatContextType } from "./actions/chat.types";
import type { ChatMessage, Conversation } from "@/types";
import type { StreamEvent } from "@/types/streamEvents";
import {
  createContext,
  useMemo,
  useReducer,
  useCallback,
  useEffect,
} from "react";
import { INITIAL_CHAT_STATE } from "./ChatContext.constants";
import { chatReducer } from "./ChatContext.reducer";
import { ChatActions } from "./actions/chat.actions";
import { ChatService, ConversationBuilder, LLMService } from "@/services";
import { NDJSONStreamReader } from "@/services/stream";
import { ConversationManager } from "@/services/conversation/ConversationManager";
import { ConversationTitleService } from "@/services/conversation/ConversationTitleService";

const ChatContext = createContext<ChatContextType | null>(null);

export const ChatProvider = ({ children }: PropsWithChildren) => {
  const [chat, dispatch] = useReducer(chatReducer, INITIAL_CHAT_STATE);

  useEffect(() => {
    const initializeLLM = async () => {
      try {
        const llmState = await LLMService.initialize();

        console.log("Initialized:", llmState);

        dispatch(ChatActions.setLLMState(llmState));
      } catch (error) {
        console.error("Failed to initialize LLMs:", error);

        dispatch(
          ChatActions.setError(
            error instanceof Error
              ? error.message
              : "Failed to load AI models.",
          ),
        );
      }
    };

    void initializeLLM();
  }, []);

  const setInput = useCallback((value: string) => {
    dispatch(ChatActions.setInput(value));
  }, []);

  const clearChat = useCallback(() => {
    dispatch(ChatActions.clearChat());
  }, []);

  const startNewChat = useCallback(() => {
    clearChat();
  }, [clearChat]);

  const sendMessage = useCallback(async () => {
    const now = Date.now();

    const trimmedInput = chat.input.trim();

    if (!trimmedInput) {
      return;
    }
    console.log("Current conversation:", chat.conversationId);
    const conversationId = chat.conversationId ?? crypto.randomUUID();
    const existingConversation = ConversationManager.get(conversationId);

    if (!chat.conversationId) {
      dispatch(ChatActions.setConversationId(conversationId));
      console.log("Generated:", conversationId);
    }

    const userMessage: ChatMessage = {
      id: crypto.randomUUID(),
      role: "user",
      content: trimmedInput,
    };

    dispatch(ChatActions.addMessage(userMessage));
    dispatch(ChatActions.setInput(""));
    dispatch(ChatActions.setLoading(true));

    try {
      const assistantMessage: ChatMessage = {
        id: crypto.randomUUID(),
        role: "assistant",
        content: "",
      };

      dispatch(ChatActions.addMessage(assistantMessage));

      const reader = await ChatService.streamMessage({
        conversationId,

        provider: chat.llm.selectedProvider ?? "gemini",

        model: chat.llm.selectedModel ?? "gemini-2.5-flash",

        messages: [...chat.messages, userMessage],
      });

      const stream = new NDJSONStreamReader<StreamEvent>();
      let completeAssistantResponse = "";

      for await (const event of stream.read(reader)) {
        switch (event.type) {
          case "text.delta":
            completeAssistantResponse += event.content;
            dispatch(
              ChatActions.updateMessageContent(
                assistantMessage.id,
                event.content,
              ),
            );
            break;

          case "conversation.created":
            break;

          case "done":
            const conversation = ConversationBuilder.build({
              id: conversationId,
              title:
                existingConversation?.title ??
                ConversationTitleService.generate(userMessage.content),
              existingCreatedAt: existingConversation?.createdAt,
              previousMessages: chat.messages,
              userMessage,
              assistantMessage,
              assistantContent: completeAssistantResponse,
            });

            ConversationManager.save(conversation);
            break;
        }
      }
    } catch (error) {
      console.error("Error sending message:", error);

      dispatch(
        ChatActions.addMessage({
          id: crypto.randomUUID(),
          role: "system",
          content:
            error instanceof Error ? error.message : "Something went wrong.",
        }),
      );

      dispatch(
        ChatActions.setError(
          error instanceof Error ? error.message : "Something went wrong.",
        ),
      );
    } finally {
      dispatch(ChatActions.setLoading(false));
    }
  }, [
    chat.conversationId,
    chat.input,
    chat.llm.selectedModel,
    chat.llm.selectedProvider,
    chat.messages,
  ]);

  const loadConversation = useCallback((conversation: Conversation) => {
    dispatch(ChatActions.setConversation(conversation));
  }, []);

  const setSelectedProvider = useCallback((provider: string) => {
    dispatch(ChatActions.setSelectedProvider(provider));
  }, []);

  const setSelectedModel = useCallback((model: string) => {
    dispatch(ChatActions.setSelectedModel(model));
  }, []);

  const value = useMemo(
    () => ({
      chat,
      setInput,
      sendMessage,
      startNewChat,
      clearChat,
      setSelectedProvider,
      setSelectedModel,
      loadConversation,
    }),
    [
      chat,
      setInput,
      sendMessage,
      startNewChat,
      clearChat,
      setSelectedProvider,
      setSelectedModel,
      loadConversation,
    ],
  );

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
};

export default ChatContext;
