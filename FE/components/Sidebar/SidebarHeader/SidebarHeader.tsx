
import VoidLogo from "@/components/VoidLogo/VoidLogo";
import styles from "./SidebarHeader.module.scss";

const SidebarHeader = () => {
  return (
    <header className={styles.sidebarHeader}>
      <div className={styles.logo}>
        <VoidLogo size={40} />
      </div>

      <div className={styles.content}>
        <h1>VoidEngine</h1>
        <p>Premium Assistant</p>
      </div>
    </header>
  );
};

export default SidebarHeader;