import { Copy, Check, RotateCcw } from "lucide-react";

import styles from "./MessageActions.module.scss";
import useClipboard from "@/hooks/useClipboard";
import { ChatMessage } from "@/types";

interface MessageActionsProps {
  message: ChatMessage;
}

const MessageActions = ({ message }: MessageActionsProps) => {
  const { copied, copy } = useClipboard();

  const Icon = copied ? Check : Copy;

  return (
    <div className={styles.actions}>
      <button
        className={styles.button}
        aria-label="Copy message"
        onClick={() => copy(message.content)}
      >
        <Icon size={16} />
      </button>

      <button className={styles.button} aria-label="Regenerate response">
        <RotateCcw size={16} />
      </button>
    </div>
  );
};

export default MessageActions;
