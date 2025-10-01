import { motion } from "framer-motion";
import AnimatedTitle from "../components/AnimatedTitle";
import ScrollSections from "../components/ScrollSections";
import YouTubeFrame from "../components/YouTubeFrame";
import Footer from "../components/Footer";

export default function HomePage() {
  return (
    <>
      {/* Animated Title Section */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="relative z-10 flex items-center justify-center min-h-screen p-8"
      >
        <div className="max-w-7xl mx-auto text-center">
          <AnimatedTitle />
        </div>
      </motion.div>
      
      {/* Scroll Sections */}
      <ScrollSections />
      
      {/* YouTube Video Section */}
      <YouTubeFrame 
        videoId="Sc0Xp0Ijn6A" 
        title="Triết học Mác-Lênin"
        description="Khám phá sâu hơn về Triết học Mác-Lênin qua video present, giúp bạn hiểu rõ hơn về nhà nước và cách mạng xã hội."
      />
      
      {/* Footer */}
      <Footer />
    </>
  );
}
