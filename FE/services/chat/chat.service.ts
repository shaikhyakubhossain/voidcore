import { ApiClient } from "../ApiClient";

import type {
  SendMessageRequest,
  SendMessageResponse,
} from "./chat.types";

const api = new ApiClient("/api");

export class ChatService {
  static sendMessage(
    request: SendMessageRequest,
  ) {
    return api.post<SendMessageResponse>(
      "/chat",
      request,
    );
  }
}