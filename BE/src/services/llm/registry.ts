import { GeminiProvider } from "./providers/gemini/gemini.provider.js";
import type { AIProvider, LLMProvider } from "./types.js";

class ProviderRegistry {
  private readonly providers = new Map<AIProvider, LLMProvider>();

  register(provider: LLMProvider) {
    this.providers.set(provider.provider, provider);
  }

  get(provider: AIProvider): LLMProvider {
    const llmProvider = this.providers.get(provider);

    if (!llmProvider) {
      throw new Error(`Provider "${provider}" is not registered.`);
    }

    return llmProvider;
  }

  getAll(): LLMProvider[] {
    return [...this.providers.values()];
  }
}

export const providerRegistry = new ProviderRegistry();
