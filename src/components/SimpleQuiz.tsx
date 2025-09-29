import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { quizQuestions, QUIZ_CONFIG } from "../data/quizData";
import type { QuizQuestion } from "../data/quizData";
import { CpuChipIcon } from "@heroicons/react/24/outline";

interface SimpleQuizProps {
  questions?: QuizQuestion[];
  useAIGenerated?: boolean;
  onComplete: (score: number, total: number, answers: number[]) => void;
}

export default function SimpleQuiz({ 
  questions = quizQuestions, 
  useAIGenerated = false, 
  onComplete 
}: SimpleQuizProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [answers, setAnswers] = useState<number[]>([]);
  const [isAnswered, setIsAnswered] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const resultAudioRef = useRef<HTMLAudioElement>(null);


  const question = questions[currentQuestion];
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  const playClickSound = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(() => {
        console.log("Audio play failed");
      });
    }
  };

  const playResultSound = (isCorrect: boolean) => {
    if (resultAudioRef.current) {
      // Change audio source based on result
      resultAudioRef.current.src = isCorrect ? "/greate.mp3" : "/huhu.mp3";
      resultAudioRef.current.currentTime = 0;
      resultAudioRef.current.play().catch(() => {
        console.log("Result audio play failed");
      });
    }
  };

  const handleAnswerSelect = (answerIndex: number) => {
    playClickSound();
    setSelectedAnswer(answerIndex);
    setIsAnswered(true);
    // Không phát âm thanh kết quả ngay, chỉ khi hoàn thành quiz
  };

  const handleNext = () => {
    const newAnswers = [...answers, selectedAnswer || 0];
    setAnswers(newAnswers);
    
    if (currentQuestion < QUIZ_CONFIG.totalQuestions - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setIsAnswered(false);
    } else {
      // Quiz completed - play result sound based on score
      const score = newAnswers.filter((answer, index) => 
        answer === questions[index].correctAnswer
      ).length;
      const percentage = (score / questions.length) * 100;
      
      // Play result sound based on performance
      setTimeout(() => {
        playResultSound(percentage >= 70);
      }, 1000);
      
      onComplete(score, questions.length, newAnswers);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      const previousAnswer = answers[currentQuestion - 1];
      setSelectedAnswer(previousAnswer !== undefined ? previousAnswer : null);
      setIsAnswered(previousAnswer !== undefined);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden z-50">
      {/* Audio elements */}
      <audio ref={audioRef} preload="auto">
        <source src="/laptop-touchpad-click.mp3" type="audio/mpeg" />
      </audio>
      <audio ref={resultAudioRef} preload="auto">
        <source src="/greate.mp3" type="audio/mpeg" />
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

      {/* Quiz Content */}
      <div className="relative z-50 min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-4xl">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="text-6xl font-bold text-white font-dancing-script">
                {currentQuestion + 1}
              </div>
              <div className="text-2xl text-white/70 font-dancing-script">
                /{questions.length} câu
              </div>
              {useAIGenerated && (
                <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-400/30 rounded-full px-4 py-2">
                  <div className="flex items-center gap-2">
                    <CpuChipIcon className="w-4 h-4 text-blue-300" />
                    <span className="text-blue-300 text-sm font-semibold">AI Generated</span>
                  </div>
                </div>
              )}
            </div>
            
            {/* Ultra Beautiful Progress Bar */}
            <div className="w-full mb-6">
              {/* Outer glow container */}
              <div className="relative">
                {/* Outer glow effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-[#8B4513]/20 to-[#D97706]/20 rounded-full blur-sm"
                  animate={{ 
                    opacity: [0.3, 0.8, 0.3],
                    scale: [1, 1.02, 1]
                  }}
                  transition={{ 
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
                
                {/* Main progress container */}
                <div className="relative w-full h-8 bg-white/5 rounded-full overflow-hidden shadow-2xl border border-white/10">
                  {/* Background pattern */}
                  <div className="absolute inset-0 bg-gradient-to-r from-[#8B4513]/10 to-[#D97706]/10 rounded-full" />
                  
                  {/* Animated background particles */}
                  <div className="absolute inset-0">
                    {[...Array(5)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute w-1 h-1 bg-white/30 rounded-full"
                        style={{
                          left: `${20 + i * 15}%`,
                          top: '50%',
                          transform: 'translateY(-50%)'
                        }}
                        animate={{
                          y: [-2, 2, -2],
                          opacity: [0.3, 0.8, 0.3]
                        }}
                        transition={{
                          duration: 2 + i * 0.3,
                          repeat: Infinity,
                          ease: "easeInOut",
                          delay: i * 0.2
                        }}
                      />
                    ))}
                  </div>
                  
                  {/* Progress fill with advanced effects */}
                  <motion.div 
                    className="relative h-full bg-gradient-to-r from-[#8B4513] via-[#D97706] to-[#8B4513] rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                  >
                    {/* Multiple shine effects */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/80 to-transparent rounded-full"
                      animate={{ 
                        x: ["-100%", "100%"]
                      }}
                      transition={{ 
                        duration: 1.2,
                        repeat: Infinity,
                        ease: "linear"
                      }}
                    />
                    
                    {/* Secondary shine */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent rounded-full"
                      animate={{ 
                        x: ["-100%", "100%"]
                      }}
                      transition={{ 
                        duration: 2,
                        repeat: Infinity,
                        ease: "linear",
                        delay: 0.5
                      }}
                    />
                    
                    {/* Pulsing core */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-[#8B4513] to-[#D97706] rounded-full"
                      animate={{ 
                        opacity: [0.8, 1, 0.8],
                        scale: [1, 1.01, 1]
                      }}
                      transition={{ 
                        duration: 1.5,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    />
                    
                    {/* Progress percentage with glow */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <motion.span 
                        className="text-white text-sm font-bold drop-shadow-2xl"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.5 }}
                      >
                        {Math.round(progress)}%
                      </motion.span>
                    </div>
                  </motion.div>
                  
                </div>
              </div>
            </div>
          </div>

          {/* Question Card */}
          <motion.div
            key={currentQuestion}
            initial={{ opacity: 0, y: 50, rotateX: -15 }}
            animate={{ opacity: 1, y: 0, rotateX: 0 }}
            exit={{ opacity: 0, y: -50, rotateX: 15 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-white/20"
          >
            <h2 className="text-3xl font-bold text-white mb-8 text-center leading-relaxed font-dancing-script">
              {question.question}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {question.options.map((option, index) => {
                const isSelected = selectedAnswer === index;
                const isCorrect = index === question.correctAnswer;
                const showAnswer = isAnswered;
                
                return (
                  <motion.button
                    key={index}
                    className={`p-6 rounded-2xl text-left transition-all duration-300 relative ${
                      showAnswer
                        ? isCorrect
                          ? 'bg-gradient-to-r from-green-500/30 to-emerald-500/30 border-2 border-green-400 text-white shadow-lg'
                          : isSelected
                          ? 'bg-gradient-to-r from-red-500/30 to-rose-500/30 border-2 border-red-400 text-white shadow-lg'
                          : 'bg-white/10 border border-white/20 text-white'
                        : isSelected
                        ? 'bg-gradient-to-r from-[#8B4513]/20 to-[#D97706]/20 border-2 border-[#D97706] text-white shadow-lg'
                        : 'bg-white/10 hover:bg-white/20 border border-white/20 text-white'
                    }`}
                    onClick={() => !showAnswer && handleAnswerSelect(index)}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={!showAnswer ? { scale: 1.02 } : {}}
                    whileTap={!showAnswer ? { scale: 0.98 } : {}}
                    disabled={showAnswer}
                  >
                    <div className="text-lg font-medium">{option}</div>
                    
                    {/* Answer indicators - Smooth Animation */}
                    {showAnswer && (
                      <motion.div
                        className="absolute top-4 right-4"
                        initial={{ scale: 0, rotate: -180, opacity: 0 }}
                        animate={{ scale: 1, rotate: 0, opacity: 1 }}
                        transition={{ 
                          delay: 0.4, 
                          duration: 0.6, 
                          type: "spring", 
                          stiffness: 150,
                          damping: 12
                        }}
                      >
                        {isCorrect ? (
                          <motion.div 
                            className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center shadow-lg"
                            whileHover={{ scale: 1.1, rotate: 5 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <motion.span 
                              className="text-white text-xl"
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{ delay: 0.6, duration: 0.3 }}
                            >
                              ✓
                            </motion.span>
                          </motion.div>
                        ) : isSelected ? (
                          <motion.div 
                            className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center shadow-lg"
                            whileHover={{ scale: 1.1, rotate: -5 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <motion.span 
                              className="text-white text-xl"
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{ delay: 0.6, duration: 0.3 }}
                            >
                              ✗
                            </motion.span>
                          </motion.div>
                        ) : null}
                      </motion.div>
                    )}
                  </motion.button>
                );
              })}
            </div>

            {/* Answer Result Display - Smooth Animation */}
            {isAnswered && (
              <motion.div
                initial={{ opacity: 0, y: 30, scale: 0.9, rotateX: -10 }}
                animate={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
                transition={{ 
                  delay: 0.3, 
                  duration: 0.8, 
                  type: "spring", 
                  stiffness: 100,
                  damping: 15
                }}
                className={`mt-6 p-6 rounded-2xl border-2 overflow-hidden ${
                  selectedAnswer === question.correctAnswer
                    ? 'bg-gradient-to-r from-green-500/20 to-emerald-500/20 border-green-400'
                    : 'bg-gradient-to-r from-red-500/20 to-rose-500/20 border-red-400'
                }`}
              >
                {/* Background glow effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-white/5 to-white/10"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                />
                
                <div className="flex items-center gap-4 relative z-10">
                  <motion.div
                    className={`w-12 h-12 rounded-full flex items-center justify-center shadow-lg ${
                      selectedAnswer === question.correctAnswer
                        ? 'bg-green-500'
                        : 'bg-red-500'
                    }`}
                    initial={{ scale: 0, rotate: -180, opacity: 0 }}
                    animate={{ scale: 1, rotate: 0, opacity: 1 }}
                    transition={{ 
                      delay: 0.6, 
                      duration: 0.6, 
                      type: "spring", 
                      stiffness: 150,
                      damping: 10
                    }}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                  >
                    <motion.span 
                      className="text-white text-2xl"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.8, duration: 0.3 }}
                    >
                      {selectedAnswer === question.correctAnswer ? '✓' : '✗'}
                    </motion.span>
                  </motion.div>
                  
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.7, duration: 0.5 }}
                  >
                    <motion.h3 
                      className={`text-xl font-bold font-dancing-script ${
                        selectedAnswer === question.correctAnswer ? 'text-green-300' : 'text-red-300'
                      }`}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.8, duration: 0.4 }}
                    >
                      {selectedAnswer === question.correctAnswer ? 'Chính xác!' : 'Sai rồi!'}
                    </motion.h3>
                    <motion.p 
                      className="text-white/80 text-lg font-dancing-script"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.9, duration: 0.4 }}
                    >
                      {selectedAnswer === question.correctAnswer 
                        ? 'Bạn đã trả lời đúng câu hỏi này.' 
                        : `Đáp án đúng là: ${question.options[question.correctAnswer]}`
                      }
                    </motion.p>
                  </motion.div>
                </div>
                
                {/* Floating particles effect */}
                {selectedAnswer === question.correctAnswer && (
                  <div className="absolute inset-0 pointer-events-none">
                    {[...Array(6)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute w-2 h-2 bg-green-400 rounded-full"
                        style={{
                          left: `${20 + i * 15}%`,
                          top: `${30 + (i % 2) * 40}%`
                        }}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ 
                          opacity: [0, 1, 0],
                          scale: [0, 1, 0],
                          y: [0, -30, -60]
                        }}
                        transition={{
                          delay: 1 + i * 0.1,
                          duration: 1.5,
                          ease: "easeOut"
                        }}
                      />
                    ))}
                  </div>
                )}
              </motion.div>
            )}

            {/* Navigation Buttons - Always visible */}
            <div className="flex justify-between items-center mt-8">
              {currentQuestion > 0 ? (
                <motion.button
                  onClick={handlePrevious}
                  className="px-6 py-3 rounded-xl font-bold text-lg shadow-lg transition-all duration-300 bg-gradient-to-r from-[#8B4513]/80 to-[#D97706]/80 text-white hover:from-[#8B4513] hover:to-[#D97706]"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  ← Câu trước
                </motion.button>
              ) : (
                <div className="px-6 py-3"></div>
              )}

              <motion.button
                onClick={handleNext}
                disabled={!isAnswered}
                className={`px-8 py-4 rounded-xl font-bold text-lg shadow-lg relative overflow-hidden transition-all duration-300 ${
                  isAnswered
                    ? 'bg-gradient-to-r from-[#8B4513] to-[#D97706] text-white'
                    : 'bg-gray-600/50 text-gray-300 cursor-not-allowed'
                }`}
                whileHover={isAnswered ? { scale: 1.05 } : {}}
                whileTap={isAnswered ? { scale: 0.95 } : {}}
                animate={isAnswered ? { 
                  x: [0, -2, 2, -2, 2, 0]
                } : {}}
                transition={{ 
                  duration: 0.5,
                  repeat: Infinity,
                  repeatDelay: 2
                }}
              >
                <span className="relative z-10">
                  {currentQuestion < QUIZ_CONFIG.totalQuestions - 1 ? 'Câu tiếp theo →' : 'Xem kết quả →'}
                </span>
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
