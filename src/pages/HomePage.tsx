import { motion } from "framer-motion";
import AnimatedTitle from "../components/AnimatedTitle";
import ScrollSections from "../components/ScrollSections";

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
    </>
  );
}
