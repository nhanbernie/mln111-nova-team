import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import LoadingScreen from "./components/LoadingScreen";
import AnimatedTitle from "./components/AnimatedTitle";
import MusicToggle from "./components/MusicToggle";
import BottomNavBar from "./components/BottomNavBar";
import SmokeEffect from "./components/SmokeEffect";
import ScrollSections from "./components/ScrollSections";

function MLN() {
  const [isLoading, setIsLoading] = useState(true);
  const [showContent, setShowContent] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

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

      {/* Main Content */}
      <AnimatePresence>
        {showContent && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="relative z-10 flex items-center justify-center min-h-screen p-8"
          >
            <div className="max-w-7xl mx-auto text-center">
              {/* Animated Title */}
              <AnimatedTitle />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating 3D Flags */}
      {/* {showContent && <FloatingFlags />} */}
      {showContent && <SmokeEffect />}
      {showContent && <ScrollSections />}
      {/* Bottom Navigation Bar */}
      {showContent && <BottomNavBar />}
    </div>
  );
}

export default MLN;
