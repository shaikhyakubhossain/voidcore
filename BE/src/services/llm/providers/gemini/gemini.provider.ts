import { gemini } from "../../../../config/llm.js";
import { ErrorCode } from "../../../../constants/errorCodes.js";
import {
  AIProviderError,
  isApiError,
} from "../../../../errors/AIProviderError.js";
import { getCurrentDateTime } from "../../../../utils/dateTime.utils.js";
import { buildPrompt } from "../../promptBuilder.js";
import type { GenerateOptions, LLMProvider, ModelInfo } from "../../types.js";
import type { Model } from "@google/genai";

type GeminiModel = Model;

export class GeminiProvider implements LLMProvider {
  readonly provider = "gemini" as const;

  readonly displayName = "Google Gemini";

  private modelsCache: ModelInfo[] | null = null;

  private cacheExpiresAt = 0;

  private static readonly CACHE_TTL = 1000 * 60 * 30;

  async *generate({
    userMessage,
    model,
    timeZone,
  }: GenerateOptions): AsyncGenerator<string> {
    try {
      const builtPrompt = buildPrompt({
        userMessage: userMessage,
        currentDate: getCurrentDateTime(timeZone),
      });

      const stream = await gemini.models.generateContentStream({
        model,
        contents: builtPrompt.userMessage,
        config: {
          systemInstruction: builtPrompt.systemInstruction,
        },
      });

      for await (const chunk of stream) {
        if (chunk.text) {
          yield chunk.text;
        }
      }
    } catch (error: unknown) {
      if (isApiError(error) && error.status === 429) {
        throw new AIProviderError(
          429,
          ErrorCode.RATE_LIMITED,
          "Daily Gemini API quota exceeded. Please try again later.",
        );
      }

      throw new AIProviderError(
        500,
        ErrorCode.INTERNAL_SERVER_ERROR,
        "Failed to communicate with the AI provider.",
      );
    }
  }

  async listModels(): Promise<ModelInfo[]> {
    if (this.hasValidCache()) {
      return this.modelsCache!;
    }

    try {
      const availableModels = await this.fetchModels();

      this.sortModels(availableModels);

      this.updateCache(availableModels);

      return availableModels;
    } catch (error) {
      if (this.modelsCache) {
        return this.modelsCache;
      }

      throw new AIProviderError(
        500,
        ErrorCode.INTERNAL_SERVER_ERROR,
        "Failed to fetch Gemini models.",
      );
    }
  }

  private toModelInfo(model: GeminiModel): ModelInfo {
    const modelName = model.name;
    const modelId = model.name ? model.name.replace("models/", "") : "";

    const modelInfo: ModelInfo = {
      id: modelId,
      name: model.displayName ?? modelId,
      provider: "gemini",

      supportsStreaming: model.supportedActions
        ? model.supportedActions.includes("generateContent")
        : false,
      supportsVision: true,
      supportsTools: true,

      recommended: modelName ? modelName.includes("2.5-flash") : false,
      enabled: true,
    };

    if (model.description) {
      modelInfo.description = model.description;
    }

    if (model.inputTokenLimit !== undefined) {
      modelInfo.contextWindow = model.inputTokenLimit;
    }

    if (model.outputTokenLimit !== undefined) {
      modelInfo.outputTokenLimit = model.outputTokenLimit;
    }

    if (model.thinking !== undefined) {
      modelInfo.thinking = model.thinking;
    }

    return modelInfo;
  }

  private async fetchModels(): Promise<ModelInfo[]> {
    const pager = await gemini.models.list();

    const availableModels: ModelInfo[] = [];

    for await (const model of pager) {
      if (
        model.supportedActions &&
        !model.supportedActions.includes("generateContent")
      ) {
        continue;
      }

      availableModels.push(this.toModelInfo(model));
    }

    return availableModels;
  }

  private sortModels(models: ModelInfo[]): void {
    models.sort((a, b) => {
      if (a.recommended && !b.recommended) return -1;
      if (!a.recommended && b.recommended) return 1;

      return a.name.localeCompare(b.name);
    });
  }

  private hasValidCache(): boolean {
    return this.modelsCache !== null && Date.now() < this.cacheExpiresAt;
  }

  private updateCache(models: ModelInfo[]): void {
    this.modelsCache = models;
    this.cacheExpiresAt = Date.now() + GeminiProvider.CACHE_TTL;
  }
}
