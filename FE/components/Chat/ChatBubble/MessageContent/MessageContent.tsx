import Markdown from "@/components/Markdown/Markdown";
import styles from "./MessageContent.module.scss";
import type { MessageRole } from "@/types";

interface MessageContentProps {
  role: MessageRole;

  content: string;
}

const MessageContent = ({
  role,
  content,
}: MessageContentProps) => {
  return (
    <div
  className={`
    ${styles.content}
    ${
      role === "user"
        ? styles.user
        : role === "assistant"
        ? styles.assistant
        : styles.system
    }
  `}
>
  <Markdown>{content}</Markdown>
</div>
  );
};

export default MessageContent;