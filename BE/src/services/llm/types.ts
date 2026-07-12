export const AI_PROVIDERS = [
  "gemini",
  "grok",
  "openai",
  "claude",
  "deepseek",
] as const;

export interface ChatOptions {
  message: string;
  systemPrompt?: string;
  provider: AIProvider;
  model: string;
  history?: {
    role: "user" | "assistant";
    content: string;
  }[];
  timeZone?: string | undefined;
}

export interface PromptContext {
  userMessage: string;
  memories?: string[];
  summary?: string;
  retrievedDocuments?: string[];
  currentDate?: string;
  userPreferences?: string[];
  systemInstruction?: string;
}

export interface BuiltPrompt {
  systemInstruction: string;
  userMessage: string;
}

export type AIProvider = (typeof AI_PROVIDERS)[number];

export interface ModelInfo {
  id: string;
  name: string;
  provider: AIProvider;

  description?: string;

  supportsStreaming: boolean;
  supportsVision: boolean;
  supportsTools: boolean;

  contextWindow?: number;
  outputTokenLimit?: number;

  thinking?: boolean;

  recommended?: boolean;

  enabled: boolean;
}

export interface GenerateOptions {
  userMessage: string;
  model: string;
  timeZone?: string | undefined;
}

export interface LLMProvider {
  readonly provider: AIProvider;

  readonly displayName: string;

  generate(options: GenerateOptions): AsyncGenerator<string>;

  listModels(): Promise<ModelInfo[]>;
}

export interface ProviderModels {
  provider: AIProvider;
  displayName: string;
  models: ModelInfo[];
}
