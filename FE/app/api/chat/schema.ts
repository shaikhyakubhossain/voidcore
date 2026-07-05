import { z } from "zod";

export const ChatMessageSchema = z.object({
  id: z.string(),
  role: z.enum(["user", "assistant", "system"]),
  content: z.string(),
});

export const SendMessageRequestSchema = z.object({
  conversationId: z.string().optional(),
  messages: z.array(ChatMessageSchema).min(1),
});

export type SendMessageRequest = z.infer<
  typeof SendMessageRequestSchema
>;