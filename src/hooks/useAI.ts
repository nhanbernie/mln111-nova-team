import { useState, useCallback } from 'react';
import { aiService } from '../services/aiService';
import type { AIRequestOptions } from '../services/aiService';

export interface UseAIState {
  isLoading: boolean;
  error: string | null;
  response: string | null;
}

export interface UseAIActions {
  sendMessage: (message: string, options?: AIRequestOptions) => Promise<string>;
  sendMessageWithImage: (text: string, imageUrl: string, options?: AIRequestOptions) => Promise<string>;
  getEducationalResponse: (topic: string, question: string, context?: string) => Promise<string>;
  generateQuiz: (topic: string, difficulty?: 'easy' | 'medium' | 'hard', numberOfQuestions?: number) => Promise<any>;
  clearError: () => void;
  clearResponse: () => void;
}

export function useAI(): UseAIState & UseAIActions {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [response, setResponse] = useState<string | null>(null);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const clearResponse = useCallback(() => {
    setResponse(null);
  }, []);

  const sendMessage = useCallback(async (
    message: string,
    options?: AIRequestOptions
  ): Promise<string> => {
    setIsLoading(true);
    setError(null);
    setResponse(null);

    try {
      const aiResponse = await aiService.sendMessage(message, options);
      const content = aiResponse.choices[0]?.message?.content || 'Không có phản hồi.';
      setResponse(content);
      return content;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Có lỗi xảy ra';
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const sendMessageWithImage = useCallback(async (
    text: string,
    imageUrl: string,
    options?: AIRequestOptions
  ): Promise<string> => {
    setIsLoading(true);
    setError(null);
    setResponse(null);

    try {
      const aiResponse = await aiService.sendMessageWithImage(text, imageUrl, options);
      const content = aiResponse.choices[0]?.message?.content || 'Không có phản hồi.';
      setResponse(content);
      return content;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Có lỗi xảy ra';
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const getEducationalResponse = useCallback(async (
    topic: string,
    question: string,
    context?: string
  ): Promise<string> => {
    setIsLoading(true);
    setError(null);
    setResponse(null);

    try {
      const content = await aiService.getEducationalResponse(topic, question, context);
      setResponse(content);
      return content;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Có lỗi xảy ra';
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const generateQuiz = useCallback(async (
    topic: string,
    difficulty: 'easy' | 'medium' | 'hard' = 'medium',
    numberOfQuestions: number = 5
  ): Promise<any> => {
    setIsLoading(true);
    setError(null);
    setResponse(null);

    try {
      const quiz = await aiService.generateQuiz(topic, difficulty, numberOfQuestions);
      setResponse(JSON.stringify(quiz, null, 2));
      return quiz;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Có lỗi xảy ra';
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    // State
    isLoading,
    error,
    response,
    
    // Actions
    sendMessage,
    sendMessageWithImage,
    getEducationalResponse,
    generateQuiz,
    clearError,
    clearResponse
  };
}

// Hook for checking AI service configuration
export function useAIConfig() {
  const isConfigured = aiService.isConfigured();
  const availableModels = aiService.getAvailableModels();

  return {
    isConfigured,
    availableModels
  };
}
