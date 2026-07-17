"use client";
import { useNewChatNavigation } from "@/hooks/useNewChatNavigation";
import { JSX } from "react/jsx-runtime";
import Chat from "@/components/Chat/Chat";
import { Suspense } from "react";

export default function Home(): JSX.Element {
  useNewChatNavigation();

  return (
    <Suspense fallback={null}>
      <Chat />
    </Suspense>
  );
}