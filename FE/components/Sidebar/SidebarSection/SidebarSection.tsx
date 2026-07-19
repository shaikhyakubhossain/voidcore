"use client";

import {
  useCallback,
  useMemo,
  useState,
  type ComponentType,
  type PropsWithChildren,
  type ReactNode,
} from "react";
import type { LucideProps } from "lucide-react";
import { ChevronDown } from 'lucide-react';


import styles from "./SidebarSection.module.scss";

export interface SidebarSectionProps extends PropsWithChildren {
  title: string;

  icon: ComponentType<LucideProps>;

  action?: ReactNode;

  defaultExpanded?: boolean;

  expanded?: boolean;

  onExpandedChange?: (expanded: boolean) => void;
}

const SidebarSection = ({
  title,
  icon: Icon,
  action,
  children,
  defaultExpanded = false,
  expanded,
  onExpandedChange,
}: SidebarSectionProps) => {
  const isControlled = expanded !== undefined;

  const [internalExpanded, setInternalExpanded] = useState(defaultExpanded);

  const isExpanded = useMemo(
    () => (isControlled ? expanded : internalExpanded),
    [expanded, internalExpanded, isControlled],
  );

  const toggleExpanded = useCallback(() => {
    const next = !isExpanded;

    if (!isControlled) {
      setInternalExpanded(next);
    }

    onExpandedChange?.(next);
  }, [isControlled, isExpanded, onExpandedChange]);

  return (
    <section className={styles.sidebarNav}>
      <button type="button" className={styles.navItem} onClick={toggleExpanded}>
        <div className={styles.left}>
          <Icon size={20} />

          <span>{title}</span>
        </div>

        <div className={styles.right}>
          <div className={`${styles.chevron} ${isExpanded ? styles.chevronUp : styles.chevronDown}`}>
            <ChevronDown size={20} />
          </div>

          {action && (
            <div
              className={styles.action}
              onClick={(event) => event.stopPropagation()}
            >
              {action}
            </div>
          )}
        </div>
      </button>

      {isExpanded && <div className={styles.content}>{children}</div>}
    </section>
  );
};

export default SidebarSection;
