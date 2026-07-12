import { providerRegistry } from "./registry.js";
import type { ProviderModels } from "./types.js";

export async function getAvailableModels(): Promise<ProviderModels[]> {
  const providers = providerRegistry.getAll();

  return Promise.all(
    providers.map(async (provider) => ({
      provider: provider.provider,
      displayName: provider.displayName,
      models: await provider.listModels(),
    })),
  );
}
