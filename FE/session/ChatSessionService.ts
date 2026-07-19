import { ConversationManager } from "@/services/conversation/ConversationManager";
import { Conversation } from "@/types/conversation";

export class ChatSessionService {
  static startNewChat(clearChat: () => void) {
    clearChat();
  }

  static loadConversation(
    conversationId: string,
    loadConversation: (conversation: Conversation) => void,
  ) {
    const conversation = ConversationManager.get(conversationId);

    if (!conversation) {
      return;
    }

    loadConversation(conversation);
  }
}
