import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import FlagScene from "./FlagScene";

export default function FloatingFlags() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Parallax effects
  const y = useTransform(
    scrollYProgress,
    [0, 0.3, 0.7, 1],
    [0, -100, -300, -500]
  );
  const scale = useTransform(
    scrollYProgress,
    [0, 0.3, 0.7, 1],
    [1, 1.1, 1.3, 1.5]
  );
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.3, 0.7, 1],
    [1, 0.9, 0.6, 0]
  );
  const rotateZ = useTransform(
    scrollYProgress,
    [0, 0.3, 0.7, 1],
    [0, 5, 15, 30]
  );
  const rotateX = useTransform(
    scrollYProgress,
    [0, 0.3, 0.7, 1],
    [0, -10, -20, -30]
  );

  return (
    <>
      {/* Main Flag - Top Left with Scroll Parallax */}
      <div
        ref={containerRef}
        style={{
          position: "fixed",
          top: "10rem",
          left: "11.5rem",
          width: "16rem",
          height: "10rem",
          zIndex: 20,
          pointerEvents: "none",
          transform: "translate3d(0, 0, 0)",
          willChange: "transform, opacity",
          backfaceVisibility: "hidden",
          WebkitBackfaceVisibility: "hidden",
          isolation: "isolate",
        }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{
            opacity: 1,
            scale: 1,
          }}
          transition={{
            duration: 2,
            delay: 1.5,
          }}
          style={{
            width: "100%",
            height: "100%",
            y,
            scale,
            opacity,
            rotateZ,
            rotateX,
            transformOrigin: "center center",
            filter: "drop-shadow(0 10px 20px rgba(0,0,0,0.3))",
          }}
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
            disableControls={true}
          />
        </motion.div>
      </div>

      {/* Secondary Flag - Bottom Right with Parallax */}
      {/* <div
        style={{
          position: "fixed",
          bottom: "8rem",
          right: "4rem",
          width: "12rem",
          height: "8rem",
          zIndex: 15,
          pointerEvents: "none",
          transform: "translate3d(0, 0, 0)",
          willChange: "transform, opacity",
          backfaceVisibility: "hidden",
          WebkitBackfaceVisibility: "hidden",
          isolation: "isolate",
        }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.3 }}
          animate={{
            opacity: 0.8,
            scale: 0.7,
          }}
          transition={{
            duration: 2.5,
            delay: 2.2,
          }}
          style={{
            width: "100%",
            height: "100%",
            y: useTransform(
              scrollYProgress,
              [0, 0.4, 0.8, 1],
              [0, -50, -200, -400]
            ),
            scale: useTransform(
              scrollYProgress,
              [0, 0.4, 0.8, 1],
              [0.7, 0.8, 1.0, 1.2]
            ),
            opacity: useTransform(
              scrollYProgress,
              [0, 0.4, 0.8, 1],
              [0.8, 0.7, 0.4, 0]
            ),
            rotateZ: useTransform(
              scrollYProgress,
              [0, 0.4, 0.8, 1],
              [0, -5, -15, -25]
            ),
            rotateX: useTransform(
              scrollYProgress,
              [0, 0.4, 0.8, 1],
              [0, 5, 15, 25]
            ),
            transformOrigin: "center center",
            filter: "drop-shadow(0 8px 16px rgba(0,0,0,0.2))",
          }}
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
            disableControls={true}
          />
        </motion.div>
      </div> */}
    </>
  );
}
