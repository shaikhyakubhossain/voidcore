import type { ChatState } from "./actions/chat.types";

export const INITIAL_CHAT_STATE: ChatState = {
  messages: [],
  input: "",
  loading: false,
};