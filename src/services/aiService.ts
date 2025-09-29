// AI Service for OpenRouter API integration
export interface AIMessage {
  role: 'user' | 'assistant' | 'system';
  content: string | Array<{
    type: 'text' | 'image_url';
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
}

class AIService {
  private baseURL = 'https://openrouter.ai/api/v1';
  private apiKey: string;
  private siteURL: string;
  private siteName: string;
  private defaultModel: string;

  constructor() {
    this.apiKey = import.meta.env.VITE_OPENROUTER_API_KEY || '';
    this.siteURL = import.meta.env.VITE_SITE_URL || 'http://localhost:5173';
    this.siteName = import.meta.env.VITE_SITE_NAME || 'MLN111 Learning Platform';
    this.defaultModel = import.meta.env.VITE_DEFAULT_MODEL || 'google/gemini-2.5-flash';
  }

  /**
   * Send a text message to AI
   */
  async sendMessage(
    message: string,
    options: AIRequestOptions = {}
  ): Promise<AIResponse> {
    const messages: AIMessage[] = [
      {
        role: 'user',
        content: message
      }
    ];

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
      throw new Error('OpenRouter API key is not configured');
    }

    const requestBody = {
      model: options.model || this.defaultModel,
      messages,
      temperature: options.temperature || 0.7,
      max_tokens: options.max_tokens || 1000,
      stream: options.stream || false
    };

    try {
      const response = await fetch(`${this.baseURL}/chat/completions`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'HTTP-Referer': this.siteURL,
          'X-Title': this.siteName,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          `API request failed: ${response.status} ${response.statusText}. ${
            errorData.error?.message || ''
          }`
        );
      }

      return await response.json();
    } catch (error) {
      console.error('AI Service Error:', error);
      throw error;
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
        role: 'user',
        content: [
          {
            type: 'text',
            text: text
          },
          {
            type: 'image_url',
            image_url: {
              url: imageUrl
            }
          }
        ]
      }
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
    ${context ? `Bối cảnh: ${context}` : ''}`;

    const messages: AIMessage[] = [
      {
        role: 'system',
        content: systemPrompt
      },
      {
        role: 'user',
        content: `Chủ đề: ${topic}\nCâu hỏi: ${question}`
      }
    ];

    try {
      const response = await this.chat(messages, {
        temperature: 0.3,
        max_tokens: 1500
      });

      return response.choices[0]?.message?.content || 'Không thể tạo phản hồi.';
    } catch (error) {
      console.error('Educational AI Error:', error);
      return 'Xin lỗi, có lỗi xảy ra khi tạo phản hồi. Vui lòng thử lại.';
    }
  }

  /**
   * Generate quiz questions
   */
  async generateQuiz(
    topic: string,
    difficulty: 'easy' | 'medium' | 'hard' = 'medium',
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

    const messages: AIMessage[] = [
      {
        role: 'system',
        content: systemPrompt
      },
      {
        role: 'user',
        content: `Tạo ${numberOfQuestions} câu hỏi trắc nghiệm về "${topic}" dựa trên nội dung Triết học Mác-Lênin. 
        Đảm bảo câu hỏi chính xác, có tính giáo dục cao và phù hợp với chương trình học.`
      }
    ];

    try {
      const response = await this.chat(messages, {
        temperature: 0.3,
        max_tokens: 3000
      });

      const content = response.choices[0]?.message?.content || '{}';
      
      // Clean the content - remove markdown code blocks if present
      let cleanContent = content.trim();
      
      // Remove markdown code blocks (```json ... ```)
      if (cleanContent.startsWith('```json')) {
        cleanContent = cleanContent.replace(/^```json\s*/, '').replace(/\s*```$/, '');
      } else if (cleanContent.startsWith('```')) {
        cleanContent = cleanContent.replace(/^```\s*/, '').replace(/\s*```$/, '');
      }
      
      // Try to find JSON object in the content
      const jsonMatch = cleanContent.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        cleanContent = jsonMatch[0];
      }
      
      return JSON.parse(cleanContent);
    } catch (error) {
      console.error('Quiz Generation Error:', error);
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
      'google/gemini-2.5-flash',
      'openai/gpt-4o',
      'openai/gpt-4o-mini',
      'anthropic/claude-3.5-sonnet',
      'meta-llama/llama-3.1-405b-instruct'
    ];
  }
}

// Export singleton instance
export const aiService = new AIService();
