import {
  History,
  PlusSquare,
  Settings,
  Sparkles,
} from "lucide-react";

import { SidebarNavItem } from "./SidebarNav.types";
import { NAVIGATION_INTENTS } from "@/constants/navigation";

export const SIDEBAR_NAV_ITEMS: SidebarNavItem[] = [
  {
    id: "new-chat",
    label: "New Chat",
    intent: NAVIGATION_INTENTS.NEW_CHAT,
    href: "/",
    icon: PlusSquare,
  },
  // {
  //   id: "history",
  //   label: "History",
  //   href: "/history",
  //   icon: History,
  // },
  {
    id: "templates",
    label: "Templates",
    href: "/templates",
    icon: Sparkles,
  },
  {
    id: "settings",
    label: "Settings",
    href: "/settings",
    icon: Settings,
  },
];