"use client";
import { useNewChatNavigation } from "@/hooks/useNewChatNavigation";
import { JSX } from "react/jsx-runtime";
import Chat from "@/components/Chat/Chat";

export default function Home(): JSX.Element {
  useNewChatNavigation();

  return (
    <main className="w-full">
      <Chat />
    </main>
  );
}