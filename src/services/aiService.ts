// AI Service for OpenRouter API integration
export interface AIMessage {
  role: "user" | "assistant" | "system";
  content:
    | string
    | Array<{
        type: "text" | "image_url";
        text?: string;
        image_url?: {
          url: string;
        };
      }>;
}

export interface AIResponse {
  id: string;
  object: string;
  created: number;
  model: string;
  choices: Array<{
    index: number;
    message: {
      role: string;
      content: string;
    };
    finish_reason: string;
  }>;
  usage: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
}

export interface AIRequestOptions {
  model?: string;
  temperature?: number;
  max_tokens?: number;
  stream?: boolean;
  systemPrompt?: string;
}

class AIService {
  private baseURL = "https://openrouter.ai/api/v1";
  private apiKey: string;
  private siteURL: string;
  private siteName: string;
  private defaultModel: string;

  constructor() {
    this.apiKey = import.meta.env.VITE_OPENROUTER_API_KEY || "";
    this.siteURL = import.meta.env.VITE_SITE_URL || "http://localhost:5173";
    this.siteName =
      import.meta.env.VITE_SITE_NAME || "MLN111 Learning Platform";
    this.defaultModel =
      import.meta.env.VITE_DEFAULT_MODEL ||
      "deepseek/deepseek-r1-0528-qwen3-8b:free";
  }

  /**
   * Check if model supports system prompt
   */
  private supportsSystemPrompt(model: string): boolean {
    // Models that don't support system prompt
    const noSystemPromptModels = [
      "google/gemma-3n-e2b-it",
      "google/gemma-2-9b-it",
      "google/gemma-2-27b-it",
      "meta-llama/llama-3.1-8b-instruct",
      "microsoft/phi-3-mini-128k-instruct",
    ];

    return !noSystemPromptModels.some((noSystemModel) =>
      model.includes(noSystemModel)
    );
  }

  /**
   * Send a text message to AI
   */
  async sendMessage(
    message: string,
    options: AIRequestOptions = {}
  ): Promise<AIResponse> {
    const messages: AIMessage[] = [];
    const model = options.model || this.defaultModel;

    // Chỉ thêm system prompt nếu model hỗ trợ
    if (options.systemPrompt && this.supportsSystemPrompt(model)) {
      messages.push({
        role: "system",
        content: options.systemPrompt,
      });
    } else if (options.systemPrompt) {
      // Nếu model không hỗ trợ system prompt, thêm vào user message
      messages.push({
        role: "user",
        content: `${options.systemPrompt}\n\n${message}`,
      });
      return this.chat(messages, options);
    }

    messages.push({
      role: "user",
      content: message,
    });

    return this.chat(messages, options);
  }

  /**
   * Send a conversation with multiple messages
   */
  async chat(
    messages: AIMessage[],
    options: AIRequestOptions = {}
  ): Promise<AIResponse> {
    if (!this.apiKey) {
      throw new Error("OpenRouter API key is not configured");
    }

    const requestBody = {
      model: options.model || this.defaultModel,
      messages,
      temperature: options.temperature || 0.7,
      max_tokens: options.max_tokens || 1000,
      stream: options.stream || false,
    };

    try {
      const response = await fetch(`${this.baseURL}/chat/completions`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${this.apiKey}`,
          "HTTP-Referer": this.siteURL,
          "X-Title": this.siteName,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));

        // Handle specific error cases
        if (response.status === 401) {
          throw new Error(
            "API key không hợp lệ hoặc đã hết hạn. Vui lòng kiểm tra lại API key."
          );
        } else if (response.status === 429) {
          throw new Error(
            "Đã vượt quá giới hạn sử dụng. Vui lòng thử lại sau."
          );
        } else if (response.status === 402) {
          throw new Error(
            "Tài khoản không có đủ credit. Vui lòng nạp thêm credit."
          );
        } else {
          throw new Error(
            `Lỗi API: ${response.status} ${response.statusText}. ${
              errorData.error?.message || "Vui lòng thử lại sau."
            }`
          );
        }
      }

      const result = await response.json();

      // Check if response has valid content
      if (!result.choices || result.choices.length === 0) {
        throw new Error("AI không trả về phản hồi hợp lệ. Vui lòng thử lại.");
      }

      return result;
    } catch (error) {
      console.error("AI Service Error:", error);

      // Re-throw with user-friendly message
      if (error instanceof Error) {
        throw new Error(error.message);
      } else {
        throw new Error(
          "Có lỗi xảy ra khi kết nối với AI. Vui lòng kiểm tra kết nối mạng và thử lại."
        );
      }
    }
  }

  /**
   * Send a message with image
   */
  async sendMessageWithImage(
    text: string,
    imageUrl: string,
    options: AIRequestOptions = {}
  ): Promise<AIResponse> {
    const messages: AIMessage[] = [
      {
        role: "user",
        content: [
          {
            type: "text",
            text: text,
          },
          {
            type: "image_url",
            image_url: {
              url: imageUrl,
            },
          },
        ],
      },
    ];

    return this.chat(messages, options);
  }

  /**
   * Get AI response for educational content
   */
  async getEducationalResponse(
    topic: string,
    question: string,
    context?: string
  ): Promise<string> {
    const systemPrompt = `Bạn là một trợ lý AI chuyên về giáo dục, đặc biệt là môn Triết học Mác-Lênin. 
    Hãy trả lời câu hỏi một cách chính xác, dễ hiểu và có tính giáo dục cao.
    ${context ? `Bối cảnh: ${context}` : ""}`;

    // Sử dụng sendMessage để tự động handle system prompt
    const userMessage = `Chủ đề: ${topic}\nCâu hỏi: ${question}`;

    try {
      const response = await this.sendMessage(userMessage, {
        systemPrompt,
        temperature: 0.3,
        max_tokens: 1500,
      });
      return response.choices[0]?.message?.content || "Không thể tạo phản hồi.";
    } catch (error) {
      console.error("Educational AI Error:", error);
      return "Xin lỗi, có lỗi xảy ra khi tạo phản hồi. Vui lòng thử lại.";
    }
  }

  /**
   * Generate quiz questions
   */
  async generateQuiz(
    topic: string,
    difficulty: "easy" | "medium" | "hard" = "medium",
    numberOfQuestions: number = 5
  ): Promise<any> {
    const systemPrompt = `Bạn là một chuyên gia tạo câu hỏi trắc nghiệm cho môn Triết học Mác-Lênin.
    Tạo ${numberOfQuestions} câu hỏi về chủ đề "${topic}" với độ khó ${difficulty}.
    Mỗi câu hỏi phải có 4 đáp án (A, B, C, D) và chỉ có 1 đáp án đúng.
    
    Dựa trên nội dung về Nhà nước và Cách mạng xã hội:
    - Nhà nước: nguồn gốc, bản chất, đặc trưng, chức năng
    - Cách mạng xã hội: khái niệm, nguyên nhân, yếu tố cơ bản, điều kiện, phương pháp, xu hướng hiện nay
    
    Trả lời theo format JSON chính xác:
    {
      "questions": [
        {
          "question": "Câu hỏi...",
          "options": ["Đáp án A", "Đáp án B", "Đáp án C", "Đáp án D"],
          "correctAnswer": 0,
          "explanation": "Giải thích chi tiết..."
        }
      ]
    }`;

    // Sử dụng sendMessage để tự động handle system prompt
    const userMessage = `Tạo ${numberOfQuestions} câu hỏi trắc nghiệm về "${topic}" dựa trên nội dung Triết học Mác-Lênin. 
    Đảm bảo câu hỏi chính xác, có tính giáo dục cao và phù hợp với chương trình học.`;

    try {
      const response = await this.sendMessage(userMessage, {
        systemPrompt,
        temperature: 0.3,
        max_tokens: 3000,
      });

      const content = response.choices[0]?.message?.content || "{}";

      // Clean the content - remove markdown code blocks if present
      let cleanContent = content.trim();

      // Remove markdown code blocks (```json ... ```)
      if (cleanContent.startsWith("```json")) {
        cleanContent = cleanContent
          .replace(/^```json\s*/, "")
          .replace(/\s*```$/, "");
      } else if (cleanContent.startsWith("```")) {
        cleanContent = cleanContent
          .replace(/^```\s*/, "")
          .replace(/\s*```$/, "");
      }

      // Try to find JSON object in the content
      const jsonMatch = cleanContent.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        cleanContent = jsonMatch[0];
      }

      return JSON.parse(cleanContent);
    } catch (error) {
      console.error("Quiz Generation Error:", error);
      return null;
    }
  }

  /**
   * Check if API is configured
   */
  isConfigured(): boolean {
    return !!this.apiKey;
  }

  /**
   * Get available models (placeholder - would need separate API call)
   */
  getAvailableModels(): string[] {
    return [
      "google/gemini-2.5-flash",
      "openai/gpt-4o",
      "openai/gpt-4o-mini",
      "anthropic/claude-3.5-sonnet",
      "meta-llama/llama-3.1-405b-instruct",
    ];
  }
}

// Export singleton instance
export const aiService = new AIService();
