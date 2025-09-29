import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAI, useAIConfig } from '../hooks/useAI';
import { 
  PaperAirplaneIcon, 
  TrashIcon, 
  SparklesIcon,
  ChatBubbleLeftRightIcon,
  UserIcon,
  CpuChipIcon,
  XMarkIcon,
  ArrowsPointingOutIcon,
  ArrowsPointingInIcon
} from '@heroicons/react/24/outline';

interface Message {
  id: string;
  role: 'user' | 'ai';
  content: string;
  timestamp: Date;
}

interface VintageChatbotProps {
  isOpen: boolean;
  onClose: () => void;
}


export default function VintageChatbot({ isOpen, onClose }: VintageChatbotProps) {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [hasWelcomed, setHasWelcomed] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const { 
    isLoading, 
    error, 
    sendMessage, 
    clearError, 
    clearResponse 
  } = useAI();

  // Prevent body scroll when popup is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);
  
  const { isConfigured } = useAIConfig();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Gửi câu chào mừng khi mở chatbot lần đầu
  useEffect(() => {
    if (isOpen && !hasWelcomed && messages.length === 0) {
      const welcomeMessage: Message = {
        id: Date.now().toString(),
        role: 'ai',
        content: 'Xin chào! Tôi là AI Assistant chuyên về Triết học Mác-Lênin. Tôi có thể giúp bạn hiểu về:\n\n• Nhà nước và vai trò của nó trong xã hội\n• Cách mạng xã hội và các đặc điểm\n• Lịch sử phát triển của chủ nghĩa Mác-Lênin\n• Các khái niệm cơ bản về triết học\n\nHãy hỏi tôi bất kỳ điều gì về chủ đề này!',
        timestamp: new Date()
      };
      setMessages([welcomeMessage]);
      setHasWelcomed(true);
    }
  }, [isOpen, hasWelcomed, messages.length]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    
    // Add user message
    const newUserMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: userMessage,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, newUserMessage]);
    setIsTyping(true);

    try {
      // Thêm system prompt cho AI
      const systemPrompt = "Bạn là một AI Assistant chuyên về Triết học Mác-Lênin. Hãy trả lời các câu hỏi liên quan đến:\n- Nhà nước và vai trò của nó trong xã hội\n- Cách mạng xã hội và các đặc điểm\n- Lịch sử phát triển của chủ nghĩa Mác-Lênin\n- Các khái niệm cơ bản về triết học\n\nHãy trả lời một cách chính xác, dễ hiểu và liên quan đến nội dung bài học. KHÔNG sử dụng format markdown như **in đậm** hoặc *in nghiêng*, chỉ trả lời bằng văn bản thuần túy.";
      
      const aiResponse = await sendMessage(userMessage, { systemPrompt });
      
      // Add AI response
      const newAIMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'ai',
        content: aiResponse,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, newAIMessage]);
    } catch (err) {
      console.error('Chat error:', err);
    } finally {
      setIsTyping(false);
    }
  };

  const handleClear = () => {
    setMessages([]);
    clearError();
    clearResponse();
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('vi-VN', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  if (!isConfigured) {
    return (
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[300] flex items-center justify-center p-4"
          >
            <div className="bg-gradient-to-br from-red-500/10 to-red-600/10 rounded-3xl p-8 border border-red-500/20 max-w-md w-full">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-red-500/20 rounded-full flex items-center justify-center">
                  <CpuChipIcon className="w-8 h-8 text-red-400" />
                </div>
                <h3 className="text-2xl font-bold text-red-400 mb-4 font-xarrovv">API chưa được cấu hình</h3>
                <p className="text-red-300 mb-4">
                  Vui lòng thêm VITE_OPENROUTER_API_KEY vào file .env
                </p>
                <button
                  onClick={onClose}
                  className="bg-red-500/20 hover:bg-red-500/30 text-red-300 px-4 py-2 rounded-lg transition-colors"
                >
                  Đóng
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    );
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[200]"
          />
          
          {/* Chatbot Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className={`fixed z-[300] bg-gradient-to-br from-[#8B4513]/70 to-[#D97706]/70 rounded-3xl shadow-2xl border border-white/20 flex flex-col overflow-hidden ${
              isExpanded 
                ? 'inset-4' 
                : 'bottom-24 left-24 w-[28rem] h-[32rem]'
            }`}
          >
            {/* Header */}
            <div className={`bg-gradient-to-r from-[#8B4513]/10 to-[#D97706]/10 border-b border-white/10 ${
              isExpanded ? 'p-6' : 'p-4'
            }`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`bg-gradient-to-br from-[#8B4513]/80 to-[#D97706]/80 rounded-full flex items-center justify-center shadow-lg ${
                    isExpanded ? 'w-12 h-12' : 'w-8 h-8'
                  }`}>
                    <SparklesIcon className={`text-white ${isExpanded ? 'w-6 h-6' : 'w-4 h-4'}`} />
                  </div>
                  <div>
                    <h1 className={`font-bold text-white font-xarrovv ${
                      isExpanded ? 'text-2xl' : 'text-lg'
                    }`}>AI Assistant</h1>
                    {isExpanded && (
                      <p className="text-white/70 text-sm">Trợ lý thông minh cho bạn</p>
                    )}
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  {messages.length > 0 && (
                    <button
                      onClick={handleClear}
                      className="flex items-center gap-1 text-white/50 hover:text-white/80 transition-colors p-1.5 hover:bg-white/10 rounded-lg"
                    >
                      <TrashIcon className="w-3 h-3" />
                      {isExpanded && <span className="text-xs">Xóa</span>}
                    </button>
                  )}
                  <button
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="p-1.5 hover:bg-white/10 rounded-lg transition-colors"
                  >
                    {isExpanded ? (
                      <ArrowsPointingInIcon className="w-4 h-4 text-white" />
                    ) : (
                      <ArrowsPointingOutIcon className="w-4 h-4 text-white" />
                    )}
                  </button>
                  <button
                    onClick={onClose}
                    className="p-1.5 hover:bg-white/10 rounded-lg transition-colors"
                  >
                    <XMarkIcon className="w-4 h-4 text-white" />
                  </button>
                </div>
              </div>
            </div>

            {/* Messages Container */}
            <div className={`flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent ${
              isExpanded ? 'p-6' : 'p-3'
            }`}>
              <div className={`mx-auto ${isExpanded ? 'max-w-4xl' : 'max-w-full'}`}>
                {messages.length === 0 ? (
                  <div className={`text-center text-white/50 ${
                    isExpanded ? 'py-12' : 'py-6'
                  }`}>
                    <div className={`mx-auto mb-3 bg-white/10 rounded-full flex items-center justify-center ${
                      isExpanded ? 'w-20 h-20' : 'w-12 h-12'
                    }`}>
                      <ChatBubbleLeftRightIcon className={`${isExpanded ? 'w-10 h-10' : 'w-6 h-6'}`} />
                    </div>
                    <h2 className={`font-xarrovv mb-2 ${
                      isExpanded ? 'text-xl' : 'text-sm'
                    }`}>Chào mừng!</h2>
                    {isExpanded && (
                      <>
                        <p className="text-base mb-6">Hãy bắt đầu cuộc trò chuyện với AI...</p>
                        
                        {/* Quick Start Suggestions */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-w-2xl mx-auto">
                          {[
                            "Giải thích về Triết học Mác-Lênin",
                            "Nhà nước là gì và vai trò của nó?",
                            "Cách mạng xã hội có những đặc điểm gì?",
                            "Lịch sử phát triển của chủ nghĩa Mác-Lênin"
                          ].map((suggestion, index) => (
                            <motion.button
                              key={index}
                              onClick={() => setInput(suggestion)}
                              className="bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl p-3 text-left transition-all duration-300"
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                            >
                              <p className="text-white/80 text-sm">{suggestion}</p>
                            </motion.button>
                          ))}
                        </div>
                      </>
                    )}
                    {!isExpanded && (
                      <p className="text-xs">Nhấn zoom để xem thêm</p>
                    )}
                  </div>
                ) : (
                  <div className={`space-y-${isExpanded ? '4' : '2'}`}>
                    <AnimatePresence>
                      {messages.map((message) => (
                        <motion.div
                          key={message.id}
                          initial={{ opacity: 0, y: 20, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: -20, scale: 0.95 }}
                          transition={{ duration: 0.3 }}
                          className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                        >
                          <div className={`flex items-start gap-2 ${isExpanded ? 'max-w-2xl' : 'max-w-full'} ${message.role === 'user' ? 'flex-row-reverse' : ''}`}>
                            {/* Avatar */}
                            <div className={`rounded-full flex items-center justify-center flex-shrink-0 ${
                              isExpanded ? 'w-8 h-8' : 'w-6 h-6'
                            } ${
                              message.role === 'user' 
                                ? 'bg-gradient-to-br from-[#8B4513]/80 to-[#D97706]/80' 
                                : 'bg-gradient-to-br from-[#8B4513]/80 to-[#D97706]/80'
                            }`}>
                              {message.role === 'user' ? (
                                <UserIcon className={`text-white ${isExpanded ? 'w-4 h-4' : 'w-3 h-3'}`} />
                              ) : (
                                <CpuChipIcon className={`text-white ${isExpanded ? 'w-4 h-4' : 'w-3 h-3'}`} />
                              )}
                            </div>
                            
                            {/* Message Bubble */}
                            <div className={`rounded-2xl ${
                              isExpanded ? 'px-4 py-3 max-w-xl' : 'px-3 py-2 max-w-full'
                            } ${
                              message.role === 'user'
                                ? 'bg-gradient-to-r from-[#8B4513]/60 to-[#D97706]/60 text-white border border-[#8B4513]/30'
                                : 'bg-gradient-to-r from-white/10 to-white/5 text-white border border-white/20'
                            }`}>
                              <p className={`leading-relaxed whitespace-pre-wrap ${
                                isExpanded ? 'text-base' : 'text-sm'
                              }`}>{message.content}</p>
                              {isExpanded && (
                                <p className="text-xs opacity-50 mt-1">
                                  {formatTime(message.timestamp)}
                                </p>
                              )}
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </AnimatePresence>

                    {/* Typing Indicator */}
                    {isTyping && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex justify-start"
                      >
                        <div className="flex items-start gap-2">
                          <div className={`rounded-full bg-gradient-to-br from-[#8B4513]/80 to-[#D97706]/80 flex items-center justify-center ${
                            isExpanded ? 'w-8 h-8' : 'w-6 h-6'
                          }`}>
                            <CpuChipIcon className={`text-white ${isExpanded ? 'w-4 h-4' : 'w-3 h-3'}`} />
                          </div>
                          <div className={`bg-gradient-to-r from-white/10 to-white/5 border border-white/20 rounded-2xl ${
                            isExpanded ? 'px-4 py-3' : 'px-3 py-2'
                          }`}>
                            <div className="flex space-x-1">
                              <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce"></div>
                              <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                              <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`bg-red-500/20 border border-red-500/30 rounded-xl ${
                  isExpanded ? 'mx-6 mb-4 p-3' : 'mx-3 mb-2 p-2'
                }`}
              >
                <p className={`text-red-300 ${isExpanded ? 'text-sm' : 'text-xs'}`}>{error}</p>
              </motion.div>
            )}

            {/* Input Form */}
            <div className={`border-t border-white/10 bg-gradient-to-r from-white/5 to-white/10 ${
              isExpanded ? 'p-4' : 'p-2'
            }`}>
              <div className={`mx-auto ${isExpanded ? 'max-w-4xl' : 'max-w-full'}`}>
                <form onSubmit={handleSubmit} className={`flex gap-2`}>
                  <div className="flex-1 relative">
                    <input
                      type="text"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      placeholder={isExpanded ? "Nhập câu hỏi của bạn..." : "Hãy đặt câu hỏi cho tớ nha..."}
                      className={`w-full bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#8B4513]/50 focus:border-transparent transition-all duration-300 ${
                        isExpanded ? 'px-3 py-2' : 'px-2 py-1'
                      }`}
                      disabled={isLoading}
                    />
                  </div>
                  <motion.button
                    type="submit"
                    disabled={!input.trim() || isLoading}
                    className={`bg-gradient-to-r from-[#8B4513]/80 to-[#D97706]/80 text-white rounded-xl font-semibold disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1 shadow-lg ${
                      isExpanded ? 'px-8 py-3' : 'px-6 py-2'
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {isLoading ? (
                      <div className={`border-2 border-white/30 border-t-white rounded-full animate-spin ${
                        isExpanded ? 'w-4 h-4' : 'w-3 h-3'
                      }`}></div>
                    ) : (
                      <PaperAirplaneIcon className={`${isExpanded ? 'w-4 h-4' : 'w-3 h-3'}`} />
                    )}
                    {isExpanded && <span className="hidden sm:inline">Gửi</span>}
                  </motion.button>
                </form>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
