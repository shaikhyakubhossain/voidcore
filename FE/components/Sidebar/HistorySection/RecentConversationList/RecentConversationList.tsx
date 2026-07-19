"use client";

import styles from "./RecentConversationList.module.scss";

import { useChat } from "@/hooks/useChat";
import { useConversations } from "@/hooks/useConversations";

import { ChatSessionService } from "@/session/ChatSessionService";

interface RecentConversationListProps {
  limit?: number;
}

const RecentConversationList = ({
  limit = 4,
}: RecentConversationListProps) => {
  const conversations = useConversations().slice(0, limit);

  const { loadConversation } = useChat();

  if (conversations.length === 0) {
    return (
      <div className={styles.empty}>
        No conversations yet.
      </div>
    );
  }

  return (
    <div className={styles.list}>
      {conversations.map((conversation) => (
        <button
          key={conversation.id}
          type="button"
          className={styles.item}
          onClick={() =>
            ChatSessionService.loadConversation(
              conversation.id,
              loadConversation,
            )
          }
        >
          {conversation.title}
        </button>
      ))}
    </div>
  );
};

export default RecentConversationList;