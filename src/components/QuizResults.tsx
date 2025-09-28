import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import { quizQuestions } from "../data/quizData";

interface QuizResultsProps {
  score: number;
  total: number;
  answers: number[];
  onRestart: () => void;
}

export default function QuizResults({ score, total, answers, onRestart }: QuizResultsProps) {
  const [showDetails, setShowDetails] = useState(false);
  const percentage = Math.round((score / total) * 100);
  const audioRef = useRef<HTMLAudioElement>(null);
  // const isPassed = percentage >= QUIZ_CONFIG.passingScore;

  useEffect(() => {
    // Play sound based on score
    const playResultSound = () => {
      if (audioRef.current) {
        audioRef.current.currentTime = 0;
        audioRef.current.play().catch(() => {
          console.log("Audio play failed");
        });
      }
    };

    // Play sound after a short delay
    const soundDelay = setTimeout(() => {
      playResultSound();
    }, 1000);

    // GSAP entrance animation
    gsap.fromTo(".results-card", 
      { 
        opacity: 0, 
        scale: 0.8, 
        y: 100,
        rotationX: -15 
      },
      { 
        opacity: 1, 
        scale: 1, 
        y: 0,
        rotationX: 0,
        duration: 1,
        ease: "back.out(1.7)"
      }
    );

    // Animate score counter
    gsap.fromTo(".score-number", 
      { scale: 0 },
      { 
        scale: 1,
        duration: 0.8,
        ease: "back.out(1.7)",
        delay: 0.5
      }
    );

    return () => {
      clearTimeout(soundDelay);
    };
  }, []);

  const getScoreColor = () => {
    if (percentage >= 80) return "text-emerald-300";
    if (percentage >= 60) return "text-amber-300";
    return "text-rose-300";
  };

  const getScoreMessage = () => {
    if (percentage >= 90) return "Xuất sắc! 🎉";
    if (percentage >= 80) return "Tuyệt vời! 👏";
    if (percentage >= 70) return "Tốt! 👍";
    if (percentage >= 60) return "Khá! 😊";
    return "Cần cố gắng thêm! 💪";
  };

  return (
    <div className="min-h-screen relative overflow-hidden z-[60]">
      {/* Audio element - choose sound based on score */}
      <audio ref={audioRef} preload="auto">
        <source 
          src={percentage >= 70 ? "/greate.mp3" : "/huhu.mp3"} 
          type="audio/mpeg" 
        />
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

      {/* Results Content */}
      <div className="relative z-[60] min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-6xl">
          <motion.div
            className="results-card bg-white/10 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-white/20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {/* Score Header */}
            <div className="text-center mb-8">
              <motion.h1 
                className="text-5xl font-bold text-white mb-4 font-dancing-script"
                initial={{ opacity: 0, y: -30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                Kết Quả Quiz
              </motion.h1>
              
              <motion.div 
                className={`text-8xl font-bold score-number ${getScoreColor()}`}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.5, duration: 0.8 }}
              >
                {percentage}%
              </motion.div>
              
              <motion.p 
                className="text-2xl text-white/80 mt-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
              >
                {getScoreMessage()}
              </motion.p>
              
              <motion.div 
                className="text-xl text-white/70 mt-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
              >
                {score}/{total} câu đúng
              </motion.div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-center gap-4 mb-8">
              <motion.button
                onClick={() => setShowDetails(!showDetails)}
                className="bg-white/20 hover:bg-white/30 text-white px-6 py-3 rounded-xl font-medium transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {showDetails ? 'Ẩn chi tiết' : 'Xem chi tiết'}
              </motion.button>
              
              <motion.button
                onClick={onRestart}
                className="bg-gradient-to-r from-[#8B4513] to-[#D97706] text-white px-6 py-3 rounded-xl font-bold transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Làm lại
              </motion.button>
            </div>

            {/* Detailed Results */}
            <AnimatePresence>
              {showDetails && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="space-y-4"
                >
                  <h3 className="text-2xl font-bold text-white mb-6 text-center">
                    Chi tiết từng câu hỏi
                  </h3>
                  
                  {quizQuestions.map((question, index) => {
                    const userAnswer = answers[index];
                    const isCorrect = userAnswer === question.correctAnswer;
                    
                    return (
                      <motion.div
                        key={question.id}
                        className={`p-6 rounded-2xl border-2 ${
                          isCorrect 
                            ? 'bg-emerald-500/15 border-emerald-400/50' 
                            : 'bg-rose-500/15 border-rose-400/50'
                        }`}
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <div className="flex items-start gap-4">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                            isCorrect ? 'bg-emerald-500 text-white shadow-lg' : 'bg-rose-500 text-white shadow-lg'
                          }`}>
                            {isCorrect ? '✓' : '✗'}
                          </div>
                          
                          <div className="flex-1">
                            <h4 className="text-lg font-semibold text-white mb-2">
                              Câu {index + 1}: {question.question}
                            </h4>
                            
                            <div className="space-y-2">
                              <div className="text-white/80">
                                <span className="font-medium">Đáp án của bạn: </span>
                                <span className={isCorrect ? 'text-emerald-300' : 'text-rose-300'}>
                                  {question.options[userAnswer]}
                                </span>
                              </div>
                              
                              {!isCorrect && (
                                <div className="text-white/80">
                                  <span className="font-medium">Đáp án đúng: </span>
                                  <span className="text-emerald-300">
                                    {question.options[question.correctAnswer]}
                                  </span>
                                </div>
                              )}
                              
                              <div className="text-white/70 text-sm mt-2">
                                <span className="font-medium">Giải thích: </span>
                                {question.explanation}
                              </div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
