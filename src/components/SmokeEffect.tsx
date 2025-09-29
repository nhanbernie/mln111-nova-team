import { Canvas, useFrame } from "@react-three/fiber";
import { useRef, useMemo, useState, useEffect } from "react";
import { Cloud } from "@react-three/drei";
import * as THREE from "three";

// ========================================
// SMOKE CONFIGURATION - TÙY CHỈNH KHÓI
// ========================================
// Chỉ cần thay đổi các giá trị bên dưới để customize hiệu ứng khói

const SMOKE_CONFIG = {
  // 🎯 SỐ LƯỢNG & TẦN SUẤT (Balanced for visibility + performance)
  cloudCount: 3, // Balanced: 3 clouds for good visibility
  minDelay: 6, // Slightly increased delay
  maxDelay: 18, // Slightly increased delay

  // 🎨 MÀU SẮC & ĐỘ ĐẬM (Enhanced visibility)
  smokeColor: "#FAFAFA", // Màu khói (hex: #FFFFFF, #F0F0F0, #E0E0E0...)
  opacity: 0.09, // Slightly increased for better visibility

  // ⚡ TỐC ĐỘ & CHUYỂN ĐỘNG (Optimized but visible)
  movementSpeed: 0.0015, // Balanced speed
  rotationSpeed: 0.0002, // Balanced rotation
  cloudSpeed: 0.03, // Balanced cloud speed
  fadeSpeed: 0.004, // Balanced fade speed

  // 📏 KÍCH THƯỚC & VỊ TRÍ (Good visibility)
  minScale: 0.4, // Slightly larger for visibility
  maxScale: 0.9, // Slightly larger for visibility
  spawnArea: 18, // Slightly reduced area
  resetHeight: 7, // Slightly reduced height

  // 🔧 CHẤT LƯỢNG (Balanced performance)
  segments: 10, // Balanced: 10 segments for good quality
};

// Realistic Smoke using Cloud component
function SmokeCloud({
  position,
  scale,
  delay,
}: {
  position: [number, number, number];
  scale: number;
  delay: number;
}) {
  const cloudRef = useRef<THREE.Group>(null);
  const materialRef = useRef<THREE.MeshBasicMaterial>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [fadeProgress, setFadeProgress] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, delay * 1000);
    return () => clearTimeout(timer);
  }, [delay]);

  useFrame(() => {
    if (cloudRef.current && isVisible) {
      // Di chuyển khói lên trên
      cloudRef.current.position.y += SMOKE_CONFIG.movementSpeed;

      // Xoay nhẹ
      cloudRef.current.rotation.y += SMOKE_CONFIG.rotationSpeed;

      // Fade in mượt mà
      if (fadeProgress < 1) {
        const newProgress = Math.min(fadeProgress + SMOKE_CONFIG.fadeSpeed, 1);
        setFadeProgress(newProgress);
        if (materialRef.current) {
          materialRef.current.opacity = newProgress * SMOKE_CONFIG.opacity;
        }
      }

      // Reset khi bay quá cao
      if (cloudRef.current.position.y > SMOKE_CONFIG.resetHeight) {
        cloudRef.current.position.y = -1;
        cloudRef.current.position.x =
          (Math.random() - 0.5) * SMOKE_CONFIG.spawnArea;
        cloudRef.current.position.z =
          (Math.random() - 0.5) * SMOKE_CONFIG.spawnArea;
        setFadeProgress(0);
      }
    }
  });

  if (!isVisible) return null;

  return (
    <group ref={cloudRef} position={position} scale={scale}>
      <Cloud
        speed={SMOKE_CONFIG.cloudSpeed}
        opacity={SMOKE_CONFIG.opacity}
        color={SMOKE_CONFIG.smokeColor}
        segments={SMOKE_CONFIG.segments}
      />
    </group>
  );
}

// Multiple Smoke Clouds
function SmokeSystem() {
  const clouds = useMemo(() => {
    return Array.from({ length: SMOKE_CONFIG.cloudCount }, (_, i) => ({
      id: i,
      position: [
        (Math.random() - 0.5) * SMOKE_CONFIG.spawnArea,
        -1 + Math.random() * 2,
        (Math.random() - 0.5) * SMOKE_CONFIG.spawnArea,
      ] as [number, number, number],
      scale:
        Math.random() * (SMOKE_CONFIG.maxScale - SMOKE_CONFIG.minScale) +
        SMOKE_CONFIG.minScale,
      delay:
        Math.random() * (SMOKE_CONFIG.maxDelay - SMOKE_CONFIG.minDelay) +
        SMOKE_CONFIG.minDelay,
    }));
  }, []);

  return (
    <>
      {clouds.map((cloud) => (
        <SmokeCloud
          key={cloud.id}
          position={cloud.position}
          scale={cloud.scale}
          delay={cloud.delay}
        />
      ))}
    </>
  );
}

const SmokeEffect = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-10">
      <Canvas
        camera={{
          position: [0, 2, 8],
          fov: 60,
        }}
        style={{ background: "transparent" }}
        gl={{
          alpha: true,
          antialias: true,
          powerPreference: "high-performance",
          preserveDrawingBuffer: false, // Optimize memory
          failIfMajorPerformanceCaveat: false, // Allow fallback
        }}
        dpr={[1, 1.5]} // Slightly limit device pixel ratio
      >
        {/* Soft lighting for realistic smoke */}
        <ambientLight intensity={0.6} />
        <directionalLight position={[2, 2, 2]} intensity={0.2} />

        {/* Atmospheric fog for depth */}
        <fog attach="fog" args={["#f3ebdd", 4, 25]} />

        {/* Realistic 3D Smoke System */}
        <SmokeSystem />
      </Canvas>
    </div>
  );
};

export default SmokeEffect;
