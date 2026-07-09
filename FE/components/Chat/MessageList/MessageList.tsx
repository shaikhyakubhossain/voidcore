"use client";

import { useChat } from "@/hooks";

import ChatBubble from "../ChatBubble";

import styles from "./MessageList.module.scss";
import TypingIndicator from "../TypingIndicator";

const MessageList = () => {
  const {
    chat: { messages, loading  },
  } = useChat();

  return (
    <div className={styles.messageList}>
      {messages.map((message) => (
        <ChatBubble
          key={message.id}
          message={message}
        />
      ))}
      {loading && <TypingIndicator />}
    </div>
  );
};

export default MessageList;