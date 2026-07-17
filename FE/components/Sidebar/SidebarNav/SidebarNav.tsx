"use client";

import { useCallback } from "react";
import { usePathname, useRouter } from "next/navigation";
import styles from "./SidebarNav.module.scss";
import { SIDEBAR_NAV_ITEMS } from "./SidebarNav.constants";
import { SidebarNavItem } from "./SidebarNav.types";

const SidebarNav = () => {
  const pathname = usePathname();
  const router = useRouter();

  const handleNavigation = useCallback(
  (item: SidebarNavItem) => {
    if (item.intent) {
      router.push(`${item.href}?intent=${item.intent}`);
      return;
    }

    router.push(item.href);
  },
  [router],
);

  return (
    <nav className={styles.sidebarNav}>
      {SIDEBAR_NAV_ITEMS.map((item) => {
        const Icon = item.icon;

        return (
          <button
            key={item.id}
            type="button"
            onClick={() => handleNavigation(item)}
            className={`${styles.navItem} ${
              pathname === item.href ? styles.active : ""
            }`}
          >
            <Icon size={20} />
            <span>{item.label}</span>
          </button>
        );
      })}
    </nav>
  );
};

export default SidebarNav;