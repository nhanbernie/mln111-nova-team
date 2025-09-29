// Environment configuration
export const env = {
  // OpenRouter API
  VITE_OPENROUTER_API_KEY: import.meta.env.VITE_OPENROUTER_API_KEY || "",
  SITE_URL: import.meta.env.VITE_SITE_URL || "http://localhost:5173",
  SITE_NAME: import.meta.env.VITE_SITE_NAME || "MLN111 Learning Platform",
  DEFAULT_MODEL:
    import.meta.env.VITE_DEFAULT_MODEL || "google/gemma-3n-e2b-it:free",

  // App settings
  NODE_ENV: import.meta.env.MODE,
  DEV: import.meta.env.DEV,
  PROD: import.meta.env.PROD,

  // API endpoints
  OPENROUTER_BASE_URL: "https://openrouter.ai/api/v1",

  // Default settings
  DEFAULT_TEMPERATURE: 0.7,
  DEFAULT_MAX_TOKENS: 1000,
  DEFAULT_TIMEOUT: 30000, // 30 seconds
};

// Validation
export const isAIConfigured = (): boolean => {
  return !!env.VITE_OPENROUTER_API_KEY;
};

// Get API headers
export const getAPIHeaders = () => ({
  Authorization: `Bearer ${env.VITE_OPENROUTER_API_KEY}`,
  "HTTP-Referer": env.SITE_URL,
  "X-Title": env.SITE_NAME,
  "Content-Type": "application/json",
});

// Available models
export const AVAILABLE_MODELS = [
  "google/gemma-3n-e2b-it:free",
  "google/gemini-2.5-flash",
  "openai/gpt-4o",
  "openai/gpt-4o-mini",
  "anthropic/claude-3.5-sonnet",
  "meta-llama/llama-3.1-405b-instruct",
  "google/gemini-1.5-pro",
  "openai/gpt-3.5-turbo",
] as const;

export type ModelName = (typeof AVAILABLE_MODELS)[number];
