import styles from "./VoidLogo.module.scss";

interface VoidLogoProps {
  size?: number;
  animated?: boolean;
  className?: string;
}

export default function VoidLogo({
  size = 120,
  animated = true,
  className = "",
}: VoidLogoProps) {
  return (
    <div
      className={`${styles.logo} ${animated ? styles.animated : ""} ${className}`}
      style={
        {
          "--size": `${size}px`,
        } as React.CSSProperties
      }
    >
      <div className={styles.glow} />

      <div className={styles.disk} />

      <div className={styles.photonRing} />

      <div className={styles.core} />

      <span className={`${styles.particle} ${styles.p1}`} />
      <span className={`${styles.particle} ${styles.p2}`} />
      <span className={`${styles.particle} ${styles.p3}`} />
      <span className={`${styles.particle} ${styles.p4}`} />
    </div>
  );
}