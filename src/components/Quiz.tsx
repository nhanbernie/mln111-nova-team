import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import { gsap } from "gsap";
import { quizQuestions, QUIZ_CONFIG } from "../data/quizData";

interface QuizProps {
  onComplete: (score: number, total: number, answers: number[]) => void;
}

export default function Quiz({ onComplete }: QuizProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [answers, setAnswers] = useState<number[]>([]);
  const [timeLeft] = useState(QUIZ_CONFIG.totalTime);
  const [isAnswered, setIsAnswered] = useState(false);


  const question = quizQuestions[currentQuestion];
  const progress = ((currentQuestion + 1) / QUIZ_CONFIG.totalQuestions) * 100;

  useEffect(() => {
    // GSAP entrance animation - Check if elements exist
    const quizCard = document.querySelector(".quiz-card");
    if (quizCard) {
      gsap.fromTo(quizCard, 
        { 
          opacity: 0, 
          scale: 0.8, 
          y: 50,
          rotationY: -15 
        },
        { 
          opacity: 1, 
          scale: 1, 
          y: 0,
          rotationY: 0,
          duration: 0.8,
          ease: "back.out(1.7)"
        }
      );
    }
  }, [currentQuestion]);

  const handleAnswerSelect = (answerIndex: number) => {
    if (isAnswered) return;
    
    setSelectedAnswer(answerIndex);
    setIsAnswered(true);
    
    // GSAP selection animation - Check if element exists
    const optionElement = document.querySelector(`.option-${answerIndex}`);
    if (optionElement) {
      gsap.to(optionElement, {
        scale: 1.05,
        duration: 0.3,
        ease: "power2.out"
      });
    }
  };

  const handleNext = () => {
    const newAnswers = [...answers, selectedAnswer || 0];
    setAnswers(newAnswers);
    
    if (currentQuestion < QUIZ_CONFIG.totalQuestions - 1) {
      // GSAP exit animation - Check if element exists
      const quizCard = document.querySelector(".quiz-card");
      if (quizCard) {
        gsap.to(quizCard, {
          opacity: 0,
          scale: 0.8,
          y: -50,
          rotationY: 15,
          duration: 0.5,
          ease: "power2.in",
          onComplete: () => {
            setCurrentQuestion(currentQuestion + 1);
            setSelectedAnswer(null);
            setIsAnswered(false);
          }
        });
      }
    } else {
      // Quiz completed
      const score = newAnswers.filter((answer, index) => 
        answer === quizQuestions[index].correctAnswer
      ).length;
      onComplete(score, QUIZ_CONFIG.totalQuestions, newAnswers);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background with existing design */}
      <div className="absolute inset-0 -z-10">
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

      {/* Debug info */}
      <div className="fixed top-4 left-4 bg-red-500 text-white p-2 rounded z-50">
        Quiz Debug: Question {currentQuestion + 1}
      </div>

      {/* Quiz Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-4xl">
          {/* Header */}
          <motion.div 
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="text-4xl font-bold text-white">
                Câu {currentQuestion + 1}
              </div>
              <div className="text-2xl text-white/70">
                /{QUIZ_CONFIG.totalQuestions} câu
              </div>
            </div>
            
            {/* Progress Bar */}
            <div className="w-full bg-white/20 rounded-full h-3 mb-4">
              <motion.div 
                className="bg-gradient-to-r from-[#8B4513] to-[#D97706] h-3 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>

            {/* Timer */}
            <div className="flex items-center justify-center gap-4">
              <CountdownCircleTimer
                isPlaying={!isAnswered}
                duration={QUIZ_CONFIG.timePerQuestion}
                colors={['#8B4513', '#D97706', '#B45309']}
                colorsTime={[30, 15, 0]}
                size={60}
                strokeWidth={4}
                onComplete={() => {
                  if (!isAnswered) {
                    handleAnswerSelect(0); // Auto-select first option
                  }
                }}
              >
                {({ remainingTime }) => (
                  <div className="text-white font-bold text-lg">
                    {remainingTime}
                  </div>
                )}
              </CountdownCircleTimer>
              
              <div className="text-white/80">
                Tổng thời gian: {formatTime(timeLeft)}
              </div>
            </div>
          </motion.div>

          {/* Question Card */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentQuestion}
              className="quiz-card bg-white/10 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-white/20"
            >
              <motion.h2 
                className="text-3xl font-bold text-white mb-8 text-center leading-relaxed"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                {question.question}
              </motion.h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {question.options.map((option, index) => (
                  <motion.button
                    key={index}
                    className={`option-${index} p-6 rounded-2xl text-left transition-all duration-300 ${
                      selectedAnswer === index
                        ? selectedAnswer === question.correctAnswer
                          ? 'bg-green-500/30 border-2 border-green-400 text-white'
                          : 'bg-red-500/30 border-2 border-red-400 text-white'
                        : 'bg-white/10 hover:bg-white/20 border border-white/20 text-white'
                    }`}
                    onClick={() => handleAnswerSelect(index)}
                    disabled={isAnswered}
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="text-lg font-medium">{option}</div>
                  </motion.button>
                ))}
              </div>

              {/* Next Button */}
              {isAnswered && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center mt-8"
                >
                  <motion.button
                    onClick={handleNext}
                    className="bg-gradient-to-r from-[#8B4513] to-[#D97706] text-white px-8 py-4 rounded-xl font-bold text-lg shadow-lg"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {currentQuestion < QUIZ_CONFIG.totalQuestions - 1 ? 'Câu tiếp theo' : 'Xem kết quả'}
                  </motion.button>
                </motion.div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
