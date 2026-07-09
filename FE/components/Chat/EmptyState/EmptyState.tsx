import styles from "./EmptyState.module.scss";
import VoidLogo from "@/components/VoidLogo/VoidLogo";
import Link from "next/link";

const EmptyState = () => {
  return (
    <section className={styles.emptyState}>
      <div className={styles.icon}>
        <Link href="https://github.com/shaikhyakubhossain/void-engine">
          <VoidLogo size={40} />
        </Link>
      </div>

      <h1 className={styles.title}>How can I assist you today?</h1>

      <p className={styles.description}>
        VoidEngine is ready to help with coding, writing, brainstorming, and
        much more.
      </p>
    </section>
  );
};

export default EmptyState;
