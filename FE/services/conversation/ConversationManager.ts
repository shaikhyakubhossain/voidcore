import type { Conversation } from "@/types";

import { ConversationStorage } from "../storage/ConversationStorage";

type Listener = (conversations: Conversation[]) => void;

export class ConversationManager {
  private static listeners = new Set<Listener>();

  static getAll(): Conversation[] {
    return ConversationStorage.loadAll();
  }

  static get(id: string): Conversation | null {
    return ConversationStorage.load(id);
  }

  static save(conversation: Conversation): void {
    ConversationStorage.save(conversation);

    this.notify();
  }

  static remove(id: string): void {
    ConversationStorage.remove(id);

    this.notify();
  }

  static subscribe(listener: Listener): () => void {
    this.listeners.add(listener);

    return () => {
      this.listeners.delete(listener);
    };
  }

  private static notify(): void {
    const conversations = this.getAll();

    for (const listener of this.listeners) {
      listener(conversations);
    }
  }
}