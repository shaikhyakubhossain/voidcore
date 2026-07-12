import { providerRegistry } from "./registry.js";
import type { AIProvider, ModelInfo } from "./types.js";

export interface ProviderInfo {
  id: AIProvider;
  name: string;
}

export interface ProviderModels {
  provider: ProviderInfo;
  models: ModelInfo[];
}

export async function getProviders(): Promise<ProviderInfo[]> {
  return providerRegistry.getAll().map((provider) => ({
    id: provider.provider,
    name: provider.displayName,
  }));
}

export async function getModels(): Promise<ProviderModels[]> {
  const providers = providerRegistry.getAll();

  const result: ProviderModels[] = [];

  for (const provider of providers) {
    const models = await provider.listModels();

    result.push({
      provider: {
        id: provider.provider,
        name: provider.displayName,
      },
      models,
    });
  }

  return result;
}