"use client";

import { SquareArrowOutUpRight , History } from "lucide-react";
import { useRouter } from "next/navigation";

import SidebarSection from "../SidebarSection/SidebarSection";
import RecentConversationList from "./RecentConversationList";

const HistorySection = () => {
  const router = useRouter();

  return (
    <SidebarSection
      title="History"
      icon={History}
      action={
        <SquareArrowOutUpRight 
          size={18}
          onClick={() => router.push("/history")}
        />
      }
    >
      <RecentConversationList />
    </SidebarSection>
  );
};

export default HistorySection;