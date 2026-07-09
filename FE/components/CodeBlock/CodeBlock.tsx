import { useMemo } from "react";
import hljs from "highlight.js";
import useClipboard from "@/hooks/useClipboard";
import { Check, Copy } from "lucide-react";

import styles from "./CodeBlock.module.scss";

interface CodeBlockProps {
  language: string;
  code: string;
}

const CodeBlock = ({ language, code }: CodeBlockProps) => {
  const { copied, copy } = useClipboard();

  const Icon = copied ? Check : Copy;
  const label = copied ? "Copied" : "Copy";

  const highlightedCode = useMemo(() => {
    try {
      if (hljs.getLanguage(language)) {
        return hljs.highlight(code, {
          language,
        }).value;
      }

      return hljs.highlightAuto(code).value;
    } catch {
      return code;
    }
  }, [language, code]);

  return (
    <div className={styles.codeBlock}>
      <div className={styles.header}>
        <span className={styles.language}>{language}</span>

        <button
          className={styles.copyButton}
          type="button"
          disabled={copied}
          aria-label="Copy code to clipboard"
          onClick={() => copy(code)}
        >
          <div className={styles.copyButtonContent}>
            <Icon size={16} />
            <div>{label}</div>
          </div>
        </button>
      </div>

      <pre>
        <code
          className={`hljs language-${language}`}
          dangerouslySetInnerHTML={{
            __html: highlightedCode,
          }}
        />
      </pre>
    </div>
  );
};

export default CodeBlock;
