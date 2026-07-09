import styles from "./ChatInputActions.module.scss";

import AttachmentButton from "./AttachmentButton";
import VoiceButton from "./VoiceButton";
import SendButton from "./SendButton";

interface ChatInputActionsProps {
  disabled?: boolean;
  loading?: boolean;

  isVoiceSupported?: boolean;
  isListening?: boolean;

  onAttach?: () => void;
  onVoice?: () => void;
  onSubmit: () => void;
}

const ChatInputActions = ({
  disabled = false,
  loading = false,
  onAttach,
  onVoice,
  onSubmit,
  isVoiceSupported = true,
  isListening = false,
}: ChatInputActionsProps) => {

  return (
    <div className={styles.actions}>
      <div className={styles.left}>
        <AttachmentButton disabled={disabled} onClick={onAttach} />

        <VoiceButton
          disabled={disabled || loading || !isVoiceSupported}
          listening={isListening}
          onClick={onVoice}
        />
      </div>

      <SendButton disabled={disabled} loading={loading} onClick={onSubmit} />
    </div>
  );
};

export default ChatInputActions;
