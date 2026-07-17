import { LucideIcon } from "lucide-react";

export interface SidebarNavItem {
  id: string;
  label: string;
  href: string;
  intent?: string;
  icon: LucideIcon;
}