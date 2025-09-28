import { motion } from "framer-motion";
import FlagScene from "./FlagScene";

export default function FloatingFlags() {
  return (
    <>
      {/* Main Flag - Top Left */}
      <motion.div
        initial={{ opacity: 0, scale: 0.5, x: 1, y: -50 }}
        animate={{
          opacity: 1,
          scale: 1,
          x: [-50, -30, -60, -40, -50],
          y: [-50, -40, -55, -45, -50],
        }}
        transition={{
          duration: 2,
          delay: 1.5,
          x: { duration: 12, repeat: Infinity, ease: "easeInOut" },
          y: { duration: 10, repeat: Infinity, ease: "easeInOut" },
        }}
        className="fixed top-56 left-46 w-64 h-40 z-20 pointer-events-auto"
      >
        <FlagScene
          textureUrl="/flags/vn.png"
          flagSize={[1.6, 1.0]}
          segments={[128, 64]}
          waves={{
            amp1: 0.12,
            freq1: 4.0,
            speed1: 2.0,
            amp2: 0.05,
            freq2: 8.0,
            speed2: 2.8,
            amp3: 0.025,
            freq3: 12.0,
            speed3: 3.5,
          }}
          windPinStart={0.18}
          withPole={true}
        />
      </motion.div>

      {/* Secondary Flag - Bottom Right */}
      {/* <motion.div
        initial={{ opacity: 0, scale: 0.3, x: 30, y: 30 }}
        animate={{
          opacity: 0.8,
          scale: 0.7,
          x: [30, 50, 20, 40, 30],
          y: [30, 40, 25, 35, 30],
        }}
        transition={{
          duration: 2.5,
          delay: 2.2,
          x: { duration: 14, repeat: Infinity, ease: "easeInOut" },
          y: { duration: 11, repeat: Infinity, ease: "easeInOut" },
        }}
        className="fixed bottom-32 right-16 w-48 h-32 z-15 pointer-events-auto"
      >
        <FlagScene
          textureUrl="/flags/vn.png"
          flagSize={[1.4, 0.9]}
          segments={[64, 32]}
          waves={{
            amp1: 0.1,
            freq1: 4.5,
            speed1: 2.2,
            amp2: 0.04,
            freq2: 9.0,
            speed2: 3.0,
            amp3: 0.02,
            freq3: 14.0,
            speed3: 3.8,
          }}
          windPinStart={0.2}
          withPole={true}
        />
      </motion.div> */}
    </>
  );
}
