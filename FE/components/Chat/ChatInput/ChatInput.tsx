import type { ChatInputProps } from "./ChatInput.types";
import styles from "./ChatInput.module.scss";
import ChatTextarea from "./ChatTextarea";
import ChatInputActions from "./ChatInputActions";
import useSpeechRecognition from "@/hooks/useSpeechRecognition";

const ChatInput = ({
  value,
  placeholder = "Ask anything...",
  disabled = false,
  loading = false,
  onChange,
  onSubmit,
}: ChatInputProps) => {
  const { isSupported, isListening, toggle } = useSpeechRecognition({
    onResult: (transcript) => {
      const nextValue = value.trim() ? `${value} ${transcript}` : transcript;

      onChange(nextValue);
    },
  });

  return (
    <footer className={styles.chatInput}>
      <div className={styles.container}>
        <ChatTextarea
          value={value}
          placeholder={placeholder}
          disabled={disabled || loading}
          onChange={onChange}
          onSubmit={onSubmit}
        />

        <ChatInputActions
          disabled={disabled}
          loading={loading}
          onSubmit={onSubmit}
          isVoiceSupported={isSupported}
          isListening={isListening}
          onVoice={toggle}
        />
      </div>
    </footer>
  );
};

export default ChatInput;
