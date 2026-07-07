"use client";

import styles from "./Chat.module.scss";

import { useChat } from "@/hooks";

import ChatHeader from "./ChatHeader";
import EmptyState from "./EmptyState";
import SuggestionGrid from "./SuggestionGrid";
import MessageList from "./MessageList";
import ChatInput from "./ChatInput";

const Chat = () => {
  const { chat, setInput, sendMessage } = useChat();

  const hasMessages = chat.messages.length > 0;

  return (
    <main className={styles.chat}>
      <ChatHeader />

      <div className={styles.content}>
        {hasMessages ? (
          <MessageList />
        ) : (
          <>
            <EmptyState />
            <SuggestionGrid />
          </>
        )}
      </div>

      <ChatInput
        value={chat.input}
        onChange={setInput}
        onSubmit={sendMessage}
      />
    </main>
  );
};

export default Chat;