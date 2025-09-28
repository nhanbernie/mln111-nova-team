import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";

export default function QuizStartPage() {
  const navigate = useNavigate();
  const audioRef = useRef<HTMLAudioElement>(null);

  const startQuiz = () => {
    // Play click sound
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(() => {
        console.log("Audio play failed");
      });
    }
    navigate("/quiz/start");
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
