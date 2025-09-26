import { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  OrbitControls,
  Environment,
  Stars,
  Float,
  MeshTransmissionMaterial,
} from "@react-three/drei";
import { motion, useReducedMotion } from "framer-motion";
import * as THREE from "three";

// 3D Scene Components
const TorusKnot = ({ isHovered }: { isHovered: boolean }) => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (meshRef.current) {
      const baseSpeed = 0.5;
      const hoverMultiplier = isHovered ? 1.8 : 1;
      meshRef.current.rotation.x += delta * baseSpeed * hoverMultiplier;
      meshRef.current.rotation.y += delta * baseSpeed * 0.7 * hoverMultiplier;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.5}>
      <mesh ref={meshRef} position={[0, 0, 0]}>
        <torusKnotGeometry args={[1, 0.3, 128, 16]} />
        <meshStandardMaterial
          color="#e5e7eb"
          metalness={0.9}
          roughness={0.1}
          envMapIntensity={1}
        />
      </mesh>
    </Float>
  );
};

const GlassOrb = () => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3;
      meshRef.current.position.y =
        Math.sin(state.clock.elapsedTime * 0.8) * 0.2;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.2} floatIntensity={0.3}>
      <mesh ref={meshRef} position={[2.5, 1, -1]} scale={0.4}>
        <icosahedronGeometry args={[1, 0]} />
        <MeshTransmissionMaterial
          backside
          samples={16}
          resolution={512}
          transmission={1}
          roughness={0.1}
          thickness={0.5}
          ior={1.5}
          chromaticAberration={0.1}
          anisotropy={0.3}
          distortion={0.1}
          distortionScale={0.2}
          temporalDistortion={0.1}
        />
      </mesh>
    </Float>
  );
};

const Scene3D = ({ isHovered }: { isHovered: boolean }) => {
  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <TorusKnot isHovered={isHovered} />
      <GlassOrb />
      <Environment preset="city" />
      <Stars
        radius={100}
        depth={50}
        count={5000}
        factor={4}
        saturation={0}
        fade
        speed={1}
      />
      <OrbitControls
        enablePan={false}
        enableZoom={true}
        enableRotate={true}
        autoRotate
        autoRotateSpeed={0.5}
        maxPolarAngle={Math.PI / 1.8}
        minPolarAngle={Math.PI / 3}
      />
    </>
  );
};

// Main Hero Component
const HeroPage = () => {
  const [isHovered, setIsHovered] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: shouldReduceMotion ? 0 : 30,
      x: shouldReduceMotion ? 0 : -20,
    },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
      transition: {
        duration: shouldReduceMotion ? 0.1 : 0.8,
        ease: "easeOut" as const,
      },
    },
  };

  const buttonVariants = {
    hidden: {
      opacity: 0,
      scale: shouldReduceMotion ? 1 : 0.9,
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: shouldReduceMotion ? 0.1 : 0.6,
        ease: "easeOut" as const,
      },
    },
    hover: shouldReduceMotion
      ? {}
      : {
          scale: 1.05,
          transition: { duration: 0.2 },
        },
    tap: shouldReduceMotion
      ? {}
      : {
          scale: 0.98,
        },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 overflow-hidden">
      <div className="container mx-auto px-6 lg:px-8 min-h-screen">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 min-h-screen items-center">
          {/* Left Column - Content */}
          <motion.div
            className="flex flex-col justify-center space-y-8 lg:pr-8 order-2 lg:order-1"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={itemVariants} className="space-y-6">
              <motion.h1
                variants={itemVariants}
                className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight"
              >
                Transform Your
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                  Digital Vision
                </span>
              </motion.h1>

              <motion.p
                variants={itemVariants}
                className="text-lg md:text-xl text-gray-300 leading-relaxed max-w-lg"
              >
                Experience the future of interactive design with cutting-edge 3D
                experiences that captivate and engage your audience like never
                before.
              </motion.p>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4"
            >
              <motion.button
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
                onHoverStart={() => setIsHovered(true)}
                onHoverEnd={() => setIsHovered(false)}
                className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                Get Started
              </motion.button>

              <motion.button
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
                className="px-8 py-4 border-2 border-gray-300 text-gray-300 font-semibold rounded-lg hover:border-white hover:text-white transition-colors duration-300"
              >
                Learn More
              </motion.button>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="flex items-center space-x-8 text-sm text-gray-400"
            >
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span>Trusted by 10K+ users</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                <span>99.9% uptime</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column - 3D Canvas */}
          <motion.div
            className="h-[50vh] lg:h-[80vh] order-1 lg:order-2"
            initial={{ opacity: 0, scale: shouldReduceMotion ? 1 : 0.8 }}
            animate={{
              opacity: 1,
              scale: 1,
              transition: {
                duration: shouldReduceMotion ? 0.1 : 1.2,
                ease: "easeOut",
                delay: 0.3,
              },
            }}
          >
            <Canvas
              camera={{ position: [0, 0, 6], fov: 45 }}
              className="rounded-lg"
            >
              <Scene3D isHovered={isHovered} />
            </Canvas>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default HeroPage;
