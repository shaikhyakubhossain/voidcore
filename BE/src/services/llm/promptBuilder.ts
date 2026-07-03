import type { BuiltPrompt, PromptContext } from "./types.js";

export function buildPrompt(context: PromptContext): BuiltPrompt {
  const systemInstruction = `
You are Void Engine AI.

Current date and time:
${context.currentDate}
  
Be accurate.
Be concise.
If you don't know something, say so.
`.trim();

  return {
    systemInstruction,
    userMessage: context.userMessage,
  };
}