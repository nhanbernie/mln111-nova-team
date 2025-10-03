import { motion } from "framer-motion";

interface MusicToggleProps {
  isPlaying: boolean;
  onToggle: () => void;
}

const MusicToggle = ({ isPlaying, onToggle }: MusicToggleProps) => {
  return (
    <motion.button
      onClick={onToggle}
      className="fixed top-6 right-6 z-[1000] w-14 h-14 bg-[#2D1810] rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      animate={
        isPlaying
          ? {
              boxShadow: [
                "0 0 0 0 rgba(45, 24, 16, 0.4)",
                "0 0 0 20px rgba(45, 24, 16, 0)",
              ],
            }
          : {}
      }
      transition={
        isPlaying
          ? { duration: 1.5, repeat: Infinity, ease: "easeOut" }
          : {}
      }
    >
      <div className="flex items-center justify-center w-full h-full relative">
        {isPlaying ? (
          // Speaker icon with animated sound waves
          <div className="relative">
            <motion.svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="#f3ebdd"
              animate={{ y: [0, -1, 0] }}
              transition={{
                duration: 0.8,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <path d="M3 9v6h4l5 5V4L7 9H3z" />
            </motion.svg>

            {/* Animated sound waves */}
            <motion.div
              className="absolute -right-1 top-1/2 transform -translate-y-1/2"
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{
                duration: 0.6,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#f3ebdd"
                strokeWidth="2"
              >
                <path d="M9 9c0 1.5 1 3 3 3s3-1.5 3-3" />
              </svg>
            </motion.div>

            <motion.div
              className="absolute -right-2 top-1/2 transform -translate-y-1/2"
              animate={{ opacity: [0.2, 0.8, 0.2] }}
              transition={{
                duration: 0.8,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.2,
              }}
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#f3ebdd"
                strokeWidth="2"
              >
                <path d="M8 8c0 2 2 4 4 4s4-2 4-4" />
              </svg>
            </motion.div>

            <motion.div
              className="absolute -right-3 top-1/2 transform -translate-y-1/2"
              animate={{ opacity: [0.1, 0.6, 0.1] }}
              transition={{
                duration: 1,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.4,
              }}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#f3ebdd"
                strokeWidth="2"
              >
                <path d="M7 7c0 2.5 2.5 5 5 5s5-2.5 5-5" />
              </svg>
            </motion.div>
          </div>
        ) : (
          // Muted speaker icon
          <motion.svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="#f3ebdd"
            animate={{ opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z" />
          </motion.svg>
        )}
      </div>
    </motion.button>
  );
};

export default MusicToggle;
