import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import { useAI, useAIConfig } from "../hooks/useAI";
import type { QuizQuestion } from "../data/quizData";
import { ExclamationTriangleIcon, CpuChipIcon, CheckCircleIcon } from "@heroicons/react/24/outline";

export default function QuizStartPage() {
  const navigate = useNavigate();
  const audioRef = useRef<HTMLAudioElement>(null);
  const [useAIGenerated, setUseAIGenerated] = useState(false);
  const [aiQuestions, setAiQuestions] = useState<QuizQuestion[]>([]);
  const [countdown, setCountdown] = useState(0);
  
  const { isLoading, error, generateQuiz } = useAI();
  const { isConfigured } = useAIConfig();


  const startQuiz = () => {
    // Play click sound
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(() => {
        // Audio play failed
      });
    }
    
    // Clear AI questions and use default
    localStorage.removeItem('aiGeneratedQuestions');
    localStorage.removeItem('useAIGenerated');
    
    navigate("/quiz/start");
  };

  const handleAIGenerate = async () => {
    try {
      const quiz = await generateQuiz(
        "Nhà nước và Cách mạng xã hội - Triết học Mác-Lênin",
        "medium",
        10
      );
      
      if (quiz && quiz.questions) {
        // Transform AI response to our format
        const transformedQuestions: QuizQuestion[] = quiz.questions.map((q: any, index: number) => ({
          id: `ai_q${index + 1}`,
          question: q.question,
          options: q.options,
          correctAnswer: q.correctAnswer,
          explanation: q.explanation || "Câu trả lời được tạo bởi AI"
        }));
        
        setAiQuestions(transformedQuestions);
        setUseAIGenerated(true);
        
        // Save to localStorage immediately
        localStorage.setItem('aiGeneratedQuestions', JSON.stringify(transformedQuestions));
        localStorage.setItem('useAIGenerated', 'true');
        
        // Start countdown and auto navigate
        setCountdown(3);
        const countdownInterval = setInterval(() => {
          setCountdown(prev => {
            if (prev <= 1) {
              clearInterval(countdownInterval);
              // Navigate directly without calling startQuiz
              navigate("/quiz/start");
              return 0;
            }
            return prev - 1;
          });
        }, 1000);
      }
    } catch (err) {
      // AI Generate Error
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden z-100">
      {/* Audio element */}
      <audio ref={audioRef} preload="auto">
        <source src="/laptop-touchpad-click.mp3" type="audio/mpeg" />
      </audio>
      
      {/* Background with existing design */}
      <div className="absolute inset-0 z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-[oklch(95%_0.03_240)] to-[oklch(78%_0.07_230)]" />
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat bg-fixed"
          style={{
            backgroundImage: "url('/pastel-yellow-vignette.jpg')",
          }}
        >
          <div className="absolute inset-0 bg-black/20"></div>
        </div>
      </div>

      {/* Quiz Intro */}
      <div className="relative z-10 min-h-screen flex items-center justify-center p-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.68, -0.55, 0.265, 1.55] }}
            className="bg-white/10 backdrop-blur-lg rounded-3xl p-12 shadow-2xl border border-white/20"
          >
            <motion.h1 
              className="text-6xl font-bold text-white mb-8 drop-shadow-lg font-dancing-script"
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              Quiz
            </motion.h1>
            
            <motion.p 
              className="text-xl text-white/90 leading-relaxed drop-shadow-md mb-8 font-dancing-script"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              Nhà nước và cách mạng xã hội
            </motion.p>

            <motion.div
              className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-xl border border-white/20 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
            >
              <h2 className="text-2xl font-bold text-white mb-6 font-dancing-script">Thông tin Quiz</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-white/80">
                <div className="text-center">
                  <div className="text-4xl font-bold text-white mb-2 font-dancing-script">10</div>
                  <div className="text-sm font-dancing-script">Câu hỏi</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-white mb-2 font-dancing-script">30s</div>
                  <div className="text-sm font-dancing-script">Mỗi câu</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-white mb-2 font-dancing-script">20p</div>
                  <div className="text-sm font-dancing-script">Tổng thời gian</div>
                </div>
              </div>
            </motion.div>

            {/* AI Generate Button */}
            <motion.div
              className="mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              <motion.button
                onClick={handleAIGenerate}
                disabled={isLoading || !isConfigured}
                className={`bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/20 text-white px-8 py-4 rounded-2xl font-semibold text-lg shadow-lg transition-all duration-300 hover:shadow-xl relative overflow-hidden group font-dancing-script disabled:opacity-50 disabled:cursor-not-allowed ${
                  !isConfigured ? 'cursor-not-allowed' : ''
                }`}
                whileHover={{ 
                  scale: 1.05,
                  y: -2
                }}
                whileTap={{ 
                  scale: 0.95
                }}
              >
                {isLoading ? (
                  <div className="flex items-center gap-3">
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span>Đang tạo câu hỏi AI...</span>
                  </div>
                ) : !isConfigured ? (
                  <div className="flex items-center gap-3">
                    <ExclamationTriangleIcon className="w-5 h-5" />
                    <span>Cần cấu hình API key</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-3">
                    <CpuChipIcon className="w-5 h-5" />
                    <span>Tạo câu hỏi với AI</span>
                  </div>
                )}
                
                {/* Hover effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "100%" }}
                  transition={{ duration: 0.6 }}
                />
              </motion.button>
              
              {/* Error message */}
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 bg-red-500/20 border border-red-500/30 rounded-xl p-4"
                >
                  <p className="text-red-300 text-sm">{error}</p>
                </motion.div>
              )}
              
              
              {/* Success message */}
              {useAIGenerated && aiQuestions.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 bg-green-500/20 border border-green-500/30 rounded-xl p-4"
                >
                  <div className="flex items-center gap-2">
                    <CheckCircleIcon className="w-4 h-4 text-green-400" />
                    <p className="text-green-300 text-sm">
                      Đã tạo {aiQuestions.length} câu hỏi AI thành công!
                    </p>
                  </div>
                  {countdown > 0 && (
                    <p className="text-green-200 text-xs mt-2">
                      Chuyển đến quiz trong {countdown} giây...
                    </p>
                  )}
                </motion.div>
              )}
            </motion.div>

            <motion.button
              onClick={startQuiz}
              className="bg-gradient-to-r from-[#8B4513] to-[#D97706] text-white px-12 py-6 rounded-2xl font-bold text-xl shadow-2xl transition-all duration-300 hover:shadow-3xl relative overflow-hidden group font-dancing-script"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ 
                opacity: 1, 
                scale: 1,
                x: [0, -1, 1, -1, 1, 0]
              }}
              transition={{ 
                delay: 0.9,
                x: {
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                  repeatDelay: 4
                }
              }}
              whileHover={{ 
                y: -1,
                x: [0, -0.5, 0.5, -0.5, 0.5, 0],
                transition: {
                  x: {
                    duration: 0.5,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }
                }
              }}
              whileTap={{ 
                scale: 0.95,
                y: 2,
                x: [0, -1, 1, -1, 1, 0],
                transition: {
                  x: {
                    duration: 0.2,
                    ease: "easeInOut"
                  }
                }
              }}
            >
              {/* Outer glow effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-[#8B4513] to-[#D97706] rounded-2xl blur-sm"
                animate={{ 
                  opacity: [0.3, 0.8, 0.3],
                  scale: [1, 1.05, 1]
                }}
                transition={{ 
                  duration: 2.5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              
              {/* Shimmer effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                animate={{ 
                  x: ["-100%", "100%"]
                }}
                transition={{ 
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "linear",
                  repeatDelay: 1.5
                }}
              />
              
              {/* Pulsing core */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-[#8B4513] to-[#D97706] rounded-2xl"
                animate={{ 
                  opacity: [0.9, 1, 0.9],
                  scale: [1, 1.02, 1]
                }}
                transition={{ 
                  duration: 1.8,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              
              {/* Floating particles */}
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 bg-white/60 rounded-full"
                  style={{
                    left: `${20 + i * 30}%`,
                    top: '50%',
                    transform: 'translateY(-50%)'
                  }}
                  animate={{
                    y: [-8, 8, -8],
                    opacity: [0.3, 1, 0.3],
                    scale: [0.5, 1, 0.5]
                  }}
                  transition={{
                    duration: 2 + i * 0.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: i * 0.3
                  }}
                />
              ))}
              
              
              <span className="relative z-10">Bắt Đầu Quiz</span>
            </motion.button>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
