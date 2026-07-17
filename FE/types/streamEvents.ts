export type StreamEvent =
  | {
      type: "text.delta";
      content: string;
    }
  | {
      type: "done";
    }
  | {
      type: "conversation.created";
      conversationId: string;
    };