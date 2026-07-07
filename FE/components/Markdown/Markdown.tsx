import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import CodeBlock from "@/components/CodeBlock";

import styles from "./Markdown.module.scss";

interface MarkdownProps {
  children: string;
}

const Markdown = ({ children }: MarkdownProps) => {
  return (
    <div className={styles.markdown}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          code({ className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || "");
            const language = match?.[1] ?? "text";

            if (!className) {
              return <code {...props}>{children}</code>;
            }

            return (
              <CodeBlock
                language={language}
                code={String(children).replace(/\n$/, "")}
              />
            );
          },
        }}
      >
        {children}
      </ReactMarkdown>
    </div>
  );
};

export default Markdown;