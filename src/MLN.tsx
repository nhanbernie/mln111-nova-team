import { useState, useEffect, useRef } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
// import { useLenis } from "./hooks/useLenis";
import LoadingScreen from "./components/LoadingScreen";
import MusicToggle from "./components/MusicToggle";
import BottomNavBar from "./components/BottomNavBar";
import SmokeEffect from "./components/SmokeEffect";
import VintageChatbot from "./components/VintageChatbot";
import HomePage from "./pages/HomePage";
import LessonsPage from "./pages/LessonsPage";
import PracticePage from "./pages/PracticePage";
import QuizStartPage from "./pages/QuizStartPage";
import QuizPlayPage from "./pages/QuizPlayPage";
import AIPage from "./pages/AIPage";

function MLN() {
  const [isLoading, setIsLoading] = useState(true);
  const [showContent, setShowContent] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const location = useLocation();

  // Initialize Lenis for smooth scrolling
  // useLenis();

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
      setTimeout(() => setShowContent(true), 500);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative">
      <audio ref={audioRef} loop>
        <source src="/music.mp3" type="audio/mpeg" />
      </audio>

      <MusicToggle isPlaying={isPlaying} onToggle={toggleMusic} />

      {/* Fixed Background - không bị giãn */}
      <div className="fixed inset-0 -z-10">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-[oklch(95%_0.03_240)] to-[oklch(78%_0.07_230)]" />

        {/* Background Image - fixed size */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat bg-fixed"
          style={{
            backgroundImage: "url('/pastel-yellow-vignette.jpg')",
          }}
        >
          {/* Overlay for better text readability */}
          <div className="absolute inset-0 bg-black/20"></div>
        </div>
      </div>

      {/* Loading Screen */}
      <AnimatePresence>{isLoading && <LoadingScreen />}</AnimatePresence>

      {/* Main Content with Router */}
      <AnimatePresence mode="wait">
        {showContent && (
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<HomePage />} />
            <Route path="/lessons" element={<LessonsPage />} />
            <Route path="/practice" element={<PracticePage />} />
            <Route path="/quiz" element={<QuizStartPage />} />
            <Route path="/quiz/start" element={<QuizPlayPage />} />
            <Route path="/ai" element={<AIPage />} />
          </Routes>
        )}
      </AnimatePresence>
      {showContent && <SmokeEffect />}

      {/* Chatbot */}
      {showContent && (
        <VintageChatbot
          isOpen={isChatbotOpen}
          onClose={() => setIsChatbotOpen(false)}
        />
      )}

      {/* Chatbot Toggle Button */}
      {showContent && (
        <button
          onClick={() => setIsChatbotOpen(true)}
          className="fixed bottom-20 left-4 sm:bottom-44 sm:left-6 z-[100] w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-[#8B4513]/80 to-[#D97706]/80 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group"
        >
          <svg
            className="w-4 h-4 sm:w-5 sm:h-5 text-white group-hover:scale-110 transition-transform"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
            />
          </svg>
        </button>
      )}

      {/* Bottom Navigation Bar */}
      {showContent && <BottomNavBar />}
    </div>
  );
}

export default MLN;
