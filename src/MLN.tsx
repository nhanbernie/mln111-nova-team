import { useState, useEffect, useRef } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import LoadingScreen from "./components/LoadingScreen";
import MusicToggle from "./components/MusicToggle";
import BottomNavBar from "./components/BottomNavBar";
import SmokeEffect from "./components/SmokeEffect";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import TeamPage from "./pages/TeamPage";
import ContactPage from "./pages/ContactPage";
import ProjectsPage from "./pages/ProjectsPage";

function MLN() {
  const [isLoading, setIsLoading] = useState(true);
  const [showContent, setShowContent] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const location = useLocation();

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
            <Route path="/about" element={<AboutPage />} />
            <Route path="/team" element={<TeamPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/projects" element={<ProjectsPage />} />
          </Routes>
        )}
      </AnimatePresence>
      {showContent && <SmokeEffect />}

      {/* Bottom Navigation Bar */}
      {showContent && <BottomNavBar />}
    </div>
  );
}

export default MLN;
