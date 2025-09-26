import { useRef, useState, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Environment, Float, useTexture } from '@react-three/drei';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import * as THREE from 'three';
import { SiteConfig } from '../types';

// 3D Scene Components
const TorusKnot = ({ isHovered, reducedMotion }: { isHovered: boolean; reducedMotion: boolean }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((_, delta) => {
    if (meshRef.current && !reducedMotion) {
      const baseSpeed = 0.3;
      const hoverMultiplier = isHovered ? 1.3 : 1;
      meshRef.current.rotation.x += delta * baseSpeed * hoverMultiplier;
      meshRef.current.rotation.y += delta * baseSpeed * 0.7 * hoverMultiplier;
    }
  });

  return (
    <Float speed={reducedMotion ? 0 : 1.2} rotationIntensity={reducedMotion ? 0 : 0.2} floatIntensity={reducedMotion ? 0 : 0.3}>
      <mesh ref={meshRef} position={[0, 0, 0]} castShadow receiveShadow>
        <torusKnotGeometry args={[1.2, 0.4, 128, 16]} />
        <meshStandardMaterial
          color="#8A6E49"
          metalness={0.8}
          roughness={0.2}
          envMapIntensity={1.2}
        />
      </mesh>
    </Float>
  );
};

const Scene3D = ({ isHovered, reducedMotion }: { isHovered: boolean; reducedMotion: boolean }) => {
  return (
    <>
      <ambientLight intensity={0.3} />
      <directionalLight 
        position={[10, 10, 5]} 
        intensity={0.8} 
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />
      <pointLight position={[-10, -10, -5]} intensity={0.3} color="#D4AF37" />
      
      <TorusKnot isHovered={isHovered} reducedMotion={reducedMotion} />
      
      <Environment preset="city" />
      
      <OrbitControls
        enablePan={false}
        enableZoom={false}
        enableRotate={!reducedMotion}
        autoRotate={!reducedMotion}
        autoRotateSpeed={0.5}
        maxPolarAngle={Math.PI / 1.6}
        minPolarAngle={Math.PI / 3}
      />
    </>
  );
};

interface Hero3DProps {
  config: SiteConfig['hero'];
}

const Hero3D = ({ config }: Hero3DProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [canvasInView, setCanvasInView] = useState(false);
  const shouldReduceMotion = useReducedMotion();
  const { scrollY } = useScroll();
  
  // Parallax transforms
  const y = useTransform(scrollY, [0, 500], [0, -150]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

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
      y: shouldReduceMotion ? 0 : 40,
      x: shouldReduceMotion ? 0 : -30 
    },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
      transition: {
        duration: shouldReduceMotion ? 0.1 : 1,
        ease: "easeOut" as const,
      },
    },
  };

  const buttonVariants = {
    hidden: { 
      opacity: 0, 
      scale: shouldReduceMotion ? 1 : 0.9 
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: shouldReduceMotion ? 0.1 : 0.8,
        ease: "easeOut" as const,
      },
    },
    hover: shouldReduceMotion ? {} : {
      scale: 1.05,
      transition: { duration: 0.2 },
    },
    tap: shouldReduceMotion ? {} : {
      scale: 0.98,
    },
  };

  return (
    <section className="min-h-screen bg-vintage-parchment relative overflow-hidden">
      {/* Ornamental corners */}
      <div className="absolute top-8 left-8 w-16 h-16 border-l-2 border-t-2 border-vintage-bronze opacity-30"></div>
      <div className="absolute top-8 right-8 w-16 h-16 border-r-2 border-t-2 border-vintage-bronze opacity-30"></div>
      <div className="absolute bottom-8 left-8 w-16 h-16 border-l-2 border-b-2 border-vintage-bronze opacity-30"></div>
      <div className="absolute bottom-8 right-8 w-16 h-16 border-r-2 border-b-2 border-vintage-bronze opacity-30"></div>

      <div className="container mx-auto px-6 lg:px-8 min-h-screen">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 min-h-screen items-center">
          
          {/* Left Column - Content */}
          <motion.div
            className="flex flex-col justify-center space-y-8 lg:pr-8 order-2 lg:order-1 z-10"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            style={{ y, opacity }}
          >
            <motion.div variants={itemVariants} className="space-y-6">
              <motion.div variants={itemVariants}>
                <p className="small-caps text-vintage-bronze text-sm font-medium mb-4">
                  {config.subheadline}
                </p>
                <h1 className="vintage-heading text-5xl md:text-6xl lg:text-7xl text-vintage-charcoal leading-tight">
                  {config.headline}
                </h1>
              </motion.div>
              
              <motion.p 
                variants={itemVariants}
                className="text-lg md:text-xl text-vintage-charcoal/80 leading-relaxed max-w-lg font-light"
              >
                {config.description}
              </motion.p>
            </motion.div>

            <motion.div 
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4"
            >
              <motion.a
                href={config.primaryCta.href}
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
                onHoverStart={() => setIsHovered(true)}
                onHoverEnd={() => setIsHovered(false)}
                className="inline-flex items-center px-8 py-4 bg-vintage-deep-green text-vintage-parchment font-medium rounded-none embossed hover:bg-vintage-deep-red transition-colors duration-300"
              >
                {config.primaryCta.text}
                <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </motion.a>
              
              <motion.a
                href={config.secondaryCta.href}
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
                className="inline-flex items-center px-8 py-4 border-2 border-vintage-bronze text-vintage-bronze font-medium rounded-none hover:bg-vintage-bronze hover:text-vintage-parchment transition-colors duration-300"
              >
                {config.secondaryCta.text}
              </motion.a>
            </motion.div>

            <motion.div 
              variants={itemVariants}
              className="flex items-center space-x-8 text-sm text-vintage-bronze"
            >
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-vintage-deep-green rounded-full"></div>
                <span>Est. 1847</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-vintage-gold rounded-full"></div>
                <span>Master Crafted</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column - 3D Canvas */}
          <motion.div
            className="h-[50vh] lg:h-[80vh] order-1 lg:order-2 relative"
            initial={{ opacity: 0, scale: shouldReduceMotion ? 1 : 0.9 }}
            animate={{ 
              opacity: 1, 
              scale: 1,
              transition: { 
                duration: shouldReduceMotion ? 0.1 : 1.5, 
                ease: "easeOut",
                delay: 0.5 
              }
            }}
            onViewportEnter={() => setCanvasInView(true)}
            onViewportLeave={() => setCanvasInView(false)}
          >
            <div className="absolute inset-4 hairline-border bg-vintage-parchment/50 backdrop-blur-sm"></div>
            {canvasInView && (
              <Suspense fallback={
                <div className="w-full h-full flex items-center justify-center bg-vintage-parchment/30">
                  <div className="text-vintage-bronze">Loading...</div>
                </div>
              }>
                <Canvas
                  camera={{ position: [0, 0, 6], fov: 45 }}
                  className="rounded-none"
                  shadows
                >
                  <Scene3D isHovered={isHovered} reducedMotion={!!shouldReduceMotion} />
                </Canvas>
              </Suspense>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero3D;
