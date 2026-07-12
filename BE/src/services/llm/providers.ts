import { providerRegistry } from "./registry.js";

import { GeminiProvider } from "./providers/gemini/gemini.provider.js";

providerRegistry.register(new GeminiProvider());