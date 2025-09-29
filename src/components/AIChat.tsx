import { useState } from 'react';
import { motion } from 'framer-motion';
import { useAI, useAIConfig } from '../hooks/useAI';

interface AIChatProps {
  topic?: string;
  context?: string;
  className?: string;
}

export default function AIChat({ topic = "Triết học Mác-Lênin", context, className = "" }: AIChatProps) {
  const [input, setInput] = useState('');
  const [conversation, setConversation] = useState<Array<{ role: 'user' | 'ai'; content: string }>>([]);
  
  const { 
    isLoading, 
    error, 
    sendMessage, 
    getEducationalResponse, 
    clearError, 
    clearResponse 
  } = useAI();
  
  const { isConfigured } = useAIConfig();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    
    // Add user message to conversation
    setConversation(prev => [...prev, { role: 'user', content: userMessage }]);

    try {
      let aiResponse: string;
      
      if (topic && context) {
        // Use educational response for specific topics
        aiResponse = await getEducationalResponse(topic, userMessage, context);
      } else {
        // Use general chat
        aiResponse = await sendMessage(userMessage);
      }
      
      // Add AI response to conversation
      setConversation(prev => [...prev, { role: 'ai', content: aiResponse }]);
    } catch (err) {
      console.error('Chat error:', err);
    }
  };

  const handleClear = () => {
    setConversation([]);
    clearError();
    clearResponse();
  };

  if (!isConfigured) {
    return (
      <div className={`bg-gradient-to-br from-red-500/10 to-red-600/10 rounded-3xl p-8 border border-red-500/20 ${className}`}>
        <div className="text-center">
          <h3 className="text-2xl font-bold text-red-400 mb-4">API chưa được cấu hình</h3>
          <p className="text-red-300 mb-4">
            Vui lòng thêm VITE_OPENROUTER_API_KEY vào file .env
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-gradient-to-br from-white/10 to-white/5 rounded-3xl p-8 border border-white/20 backdrop-blur-sm shadow-lg ${className}`}>
      {/* Header */}
      <div className="text-center mb-8">
        <motion.h2
          className="text-3xl font-bold text-white mb-2 font-dancing-script"
          animate={{
            scale: [1, 1.02, 1]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          AI Assistant
        </motion.h2>
        <p className="text-white/70">
          Hỏi bất kỳ điều gì về {topic}
        </p>
      </div>

      {/* Conversation */}
      <div className="max-h-96 overflow-y-auto mb-6 space-y-4">
        {conversation.length === 0 ? (
          <div className="text-center text-white/50 py-8">
            <div className="text-4xl mb-2">💬</div>
            <p>Bắt đầu cuộc trò chuyện với AI...</p>
          </div>
        ) : (
          conversation.map((message, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl ${
                  message.role === 'user'
                    ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white'
                    : 'bg-gradient-to-r from-white/10 to-white/5 text-white border border-white/20'
                }`}
              >
                <p className="text-sm leading-relaxed">{message.content}</p>
              </div>
            </motion.div>
          ))
        )}
      </div>

      {/* Loading indicator */}
      {isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex items-center justify-center py-4"
        >
          <div className="flex space-x-2">
            <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
            <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          </div>
        </motion.div>
      )}

      {/* Error message */}
      {error && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-red-500/20 border border-red-500/30 rounded-xl p-4 mb-4"
        >
          <p className="text-red-300 text-sm">{error}</p>
        </motion.div>
      )}

      {/* Input form */}
      <form onSubmit={handleSubmit} className="flex gap-3">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Nhập câu hỏi của bạn..."
          className="flex-1 bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent"
          disabled={isLoading}
        />
        <motion.button
          type="submit"
          disabled={!input.trim() || isLoading}
          className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-3 rounded-xl font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {isLoading ? '⏳' : '📤'}
        </motion.button>
      </form>

      {/* Clear button */}
      {conversation.length > 0 && (
        <motion.button
          onClick={handleClear}
          className="mt-4 text-white/50 hover:text-white/80 text-sm transition-colors"
          whileHover={{ scale: 1.05 }}
        >
          🗑️ Xóa cuộc trò chuyện
        </motion.button>
      )}
    </div>
  );
}
