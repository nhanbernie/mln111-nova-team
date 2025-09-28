import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { quizQuestions, QUIZ_CONFIG } from "../data/quizData";

interface SimpleQuizProps {
  onComplete: (score: number, total: number, answers: number[]) => void;
}

export default function SimpleQuiz({ onComplete }: SimpleQuizProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [answers, setAnswers] = useState<number[]>([]);
  const [isAnswered, setIsAnswered] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const question = quizQuestions[currentQuestion];
  const progress = ((currentQuestion + 1) / QUIZ_CONFIG.totalQuestions) * 100;

  const playClickSound = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(() => {
        console.log("Audio play failed");
      });
    }
  };

  const handleAnswerSelect = (answerIndex: number) => {
    playClickSound();
    setSelectedAnswer(answerIndex);
    setIsAnswered(true);
    // Không hiển thị đáp án ngay, chỉ khi hoàn thành quiz
  };

  const handleNext = () => {
    const newAnswers = [...answers, selectedAnswer || 0];
    setAnswers(newAnswers);
    
    if (currentQuestion < QUIZ_CONFIG.totalQuestions - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setIsAnswered(false);
    } else {
      // Quiz completed
      const score = newAnswers.filter((answer, index) => 
        answer === quizQuestions[index].correctAnswer
      ).length;
      onComplete(score, QUIZ_CONFIG.totalQuestions, newAnswers);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setSelectedAnswer(answers[currentQuestion - 1] || null);
      setIsAnswered(true);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden z-50">
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
                /{QUIZ_CONFIG.totalQuestions} câu
              </div>
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
                
                return (
                  <motion.button
                    key={index}
                    className={`p-6 rounded-2xl text-left transition-all duration-300 ${
                      isSelected
                        ? 'bg-gradient-to-r from-[#8B4513]/20 to-[#D97706]/20 border-2 border-[#D97706] text-white shadow-lg'
                        : 'bg-white/10 hover:bg-white/20 border border-white/20 text-white'
                    }`}
                    onClick={() => handleAnswerSelect(index)}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="text-lg font-medium">{option}</div>
                  </motion.button>
                );
              })}
            </div>

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
