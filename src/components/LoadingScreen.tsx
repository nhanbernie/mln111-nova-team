import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { motion } from "framer-motion";
import LoadingSpinner from "./LoadingSpinner";

const LoadingScreen = () => {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-[oklch(0.92_0.04_95)] text-[oklch(0.28_0.06_60)]"
      // style={{
      //   background:
      //     "linear-gradient(135deg, oklch(0.96 0.05 255) 0%, oklch(0.90 0.10 255) 50%, oklch(0.75 0.16 255) 100%)"
      // }}
    >
      <div className="w-32 h-32">
        <Canvas camera={{ position: [0, 0, 5] }}>
          <Suspense fallback={null}>
            <ambientLight intensity={0.6} />
            <pointLight position={[10, 10, 10]} intensity={0.8} />
            <LoadingSpinner />
          </Suspense>
        </Canvas>
      </div>
    </motion.div>
  );
};

export default LoadingScreen;
