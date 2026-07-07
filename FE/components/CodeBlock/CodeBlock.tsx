import { useMemo } from "react";
import hljs from "highlight.js";

import styles from "./CodeBlock.module.scss";

interface CodeBlockProps {
  language: string;
  code: string;
}

const CodeBlock = ({
  language,
  code,
}: CodeBlockProps) => {
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
        <span>{language}</span>

        <button>
          Copy
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