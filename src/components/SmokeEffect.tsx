import { Canvas, useFrame } from "@react-three/fiber";
import { useRef, useMemo, useState, useEffect } from "react";
import { Cloud } from "@react-three/drei";
import * as THREE from "three";

// ========================================
// SMOKE CONFIGURATION - TÙY CHỈNH KHÓI
// ========================================
// Chỉ cần thay đổi các giá trị bên dưới để customize hiệu ứng khói

const SMOKE_CONFIG = {
  // 🎯 SỐ LƯỢNG & TẦN SUẤT
  cloudCount: 4, // Số lượng đám khói (1-10)
  minDelay: 5, // Delay tối thiểu (giây)
  maxDelay: 17, // Delay tối đa (giây)

  // 🎨 MÀU SẮC & ĐỘ ĐẬM
  smokeColor: "#FAFAFA", // Màu khói (hex: #FFFFFF, #F0F0F0, #E0E0E0...)
  opacity: 0.07, // Độ trong suốt (0.05-0.3)

  // ⚡ TỐC ĐỘ & CHUYỂN ĐỘNG
  movementSpeed: 0.002, // Tốc độ bay lên (0.001-0.01)
  rotationSpeed: 0.0003, // Tốc độ xoay (0.0001-0.001)
  cloudSpeed: 0.05, // Tốc độ animation Cloud (0.01-0.2)
  fadeSpeed: 0.005, // Tốc độ fade in (0.001-0.01)

  // 📏 KÍCH THƯỚC & VỊ TRÍ
  minScale: 0.3, // Kích thước tối thiểu (0.1-1.0)
  maxScale: 0.8, // Kích thước tối đa (0.5-2.0)
  spawnArea: 20, // Vùng xuất hiện (10-50)
  resetHeight: 8, // Chiều cao reset (5-15)

  // 🔧 CHẤT LƯỢNG
  segments: 12, // Số segments (8-32, cao hơn = mượt hơn)
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
        }}
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
