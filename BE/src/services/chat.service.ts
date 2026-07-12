import { providerRegistry } from "./llm/registry.js";
import type { ChatOptions } from "./llm/types.js";

export async function* chat(options: ChatOptions) {
  const { message, timeZone } = options;

  const provider = providerRegistry.get(options.provider);

  const models = await provider.listModels();

  const stream = provider.generate({
    userMessage: options.message,
    model: options.model,
    timeZone: options.timeZone,
  });

  for await (const chunk of stream) {
    yield chunk;
  }
}
