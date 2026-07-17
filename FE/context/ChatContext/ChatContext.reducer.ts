import { ChatActionTypes } from "./actions/chat.actions";
import type { ChatAction, ChatState } from "./actions/chat.types";
import { INITIAL_SESSION_STATE } from "./ChatContext.constants";

export const chatReducer = (
  state: ChatState,
  action: ChatAction,
): ChatState => {
  switch (action.type) {
    case ChatActionTypes.SET_INPUT:
      return {
        ...state,
        input: action.payload,
      };

    case ChatActionTypes.SET_LOADING:
      return {
        ...state,
        loading: action.payload,
      };

    case ChatActionTypes.ADD_MESSAGE:
      return {
        ...state,
        messages: [...state.messages, action.payload],
      };

    case ChatActionTypes.SET_MESSAGES:
      return {
        ...state,
        messages: action.payload,
      };

    case ChatActionTypes.SET_ERROR:
      return {
        ...state,
        error: action.payload,
      };

    case ChatActionTypes.CLEAR_CHAT:
      return {
        ...state,
        ...INITIAL_SESSION_STATE,
      };

    case ChatActionTypes.UPDATE_MESSAGE_CONTENT:
      return {
        ...state,
        messages: state.messages.map((message) =>
          message.id === action.payload.id
            ? {
                ...message,
                content: message.content + action.payload.chunk,
              }
            : message,
        ),
      };

    case ChatActionTypes.SET_LLM_STATE:
      return {
        ...state,

        llm: {
          ...state.llm,

          providers: action.payload.providers,
          providerModels: action.payload.providerModels,

          selectedProvider: action.payload.selectedProvider,
          selectedModel: action.payload.selectedModel,
        },
      };

    case ChatActionTypes.SET_SELECTED_PROVIDER:
      return {
        ...state,

        llm: {
          ...state.llm,
          selectedProvider: action.payload,
        },
      };

    case ChatActionTypes.SET_SELECTED_MODEL:
      return {
        ...state,

        llm: {
          ...state.llm,
          selectedModel: action.payload,
        },
      };

    default:
      return state;
  }
};
