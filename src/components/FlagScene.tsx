import { Canvas, useFrame, extend } from "@react-three/fiber";
import {
  PresentationControls,
  Float,
  Environment,
  shaderMaterial,
  useCursor,
} from "@react-three/drei";
import { useRef, useMemo, useState } from "react";
import * as THREE from "three";

// Create placeholder Vietnam flag texture
const createVietnamFlagTexture = (): THREE.Texture => {
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 320; // 1.6:1 ratio
  const ctx = canvas.getContext("2d")!;

  // Red background
  ctx.fillStyle = "#DA020E";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Yellow star
  const centerX = canvas.width / 2;
  const centerY = canvas.height / 2;
  const starRadius = 60;

  ctx.fillStyle = "#FFFF00";
  ctx.beginPath();
  for (let i = 0; i < 5; i++) {
    const angle = (i * 4 * Math.PI) / 5 - Math.PI / 2;
    const x = centerX + Math.cos(angle) * starRadius;
    const y = centerY + Math.sin(angle) * starRadius;
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }
  ctx.closePath();
  ctx.fill();

  const texture = new THREE.CanvasTexture(canvas);
  texture.anisotropy = 8;
  texture.magFilter = THREE.LinearFilter;
  texture.minFilter = THREE.LinearMipmapLinearFilter;
  texture.wrapS = THREE.ClampToEdgeWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;

  return texture;
};

// Enhanced Flag Shader Material with 3 wave layers
const FlagMaterial = shaderMaterial(
  // Uniforms
  {
    uTime: 0,
    uTexture: new THREE.Texture(),
    uAmp1: 0.06,
    uFreq1: 3.0,
    uSpeed1: 1.2,
    uAmp2: 0.02,
    uFreq2: 6.0,
    uSpeed2: 1.8,
    uAmp3: 0.01,
    uFreq3: 9.0,
    uSpeed3: 2.3,
    uPinStart: 0.15,
  },
  // Vertex Shader
  `
    uniform float uTime;
    uniform float uAmp1;
    uniform float uFreq1;
    uniform float uSpeed1;
    uniform float uAmp2;
    uniform float uFreq2;
    uniform float uSpeed2;
    uniform float uAmp3;
    uniform float uFreq3;
    uniform float uSpeed3;
    uniform float uPinStart;

    varying vec2 vUv;
    varying vec3 vNormal;
    varying vec3 vPosition;
    varying float vWaveIntensity;

    void main() {
      vUv = uv;

      // Pin factor - reduces wave amplitude near the pole
      float pinFactor = smoothstep(0.0, uPinStart, uv.x);
      float edgeFactor = 1.0 - pow(abs(uv.y - 0.5) * 2.0, 2.0);

      // First wave layer - main wind effect
      float wave1 = sin(uv.x * uFreq1 + uTime * uSpeed1) * uAmp1 * pinFactor;
      wave1 += sin(uv.y * uFreq1 * 0.5 + uTime * uSpeed1 * 0.8) * uAmp1 * 0.3 * pinFactor * edgeFactor;

      // Second wave layer - medium frequency ripples
      float wave2 = sin(uv.x * uFreq2 + uTime * uSpeed2 + sin(uv.y * 2.0) * 0.5) * uAmp2 * pinFactor;
      wave2 += cos(uv.y * uFreq2 * 0.7 + uTime * uSpeed2 * 1.2) * uAmp2 * 0.5 * pinFactor;

      // Third wave layer - fine detail ripples
      float wave3 = sin(uv.x * uFreq3 + uTime * uSpeed3 + cos(uv.y * 3.0) * 0.3) * uAmp3 * pinFactor;
      wave3 += sin(uv.y * uFreq3 * 0.8 + uTime * uSpeed3 * 0.9) * uAmp3 * 0.4 * pinFactor * edgeFactor;

      // Combine all wave layers
      float totalWave = wave1 + wave2 + wave3;
      vWaveIntensity = abs(totalWave) * 10.0;

      // Apply displacement
      vec3 newPosition = position;
      newPosition.z += totalWave;

      // Calculate normals for realistic lighting
      float epsilon = 0.01;
      float dx1 = sin((uv.x + epsilon) * uFreq1 + uTime * uSpeed1) * uAmp1 * pinFactor;
      float dx2 = sin((uv.x + epsilon) * uFreq2 + uTime * uSpeed2) * uAmp2 * pinFactor;
      float dx3 = sin((uv.x + epsilon) * uFreq3 + uTime * uSpeed3) * uAmp3 * pinFactor;
      float dx = (dx1 + dx2 + dx3) - totalWave;

      float dy1 = sin((uv.y + epsilon) * uFreq1 * 0.5 + uTime * uSpeed1 * 0.8) * uAmp1 * 0.3 * pinFactor;
      float dy2 = cos((uv.y + epsilon) * uFreq2 * 0.7 + uTime * uSpeed2 * 1.2) * uAmp2 * 0.5 * pinFactor;
      float dy3 = sin((uv.y + epsilon) * uFreq3 * 0.8 + uTime * uSpeed3 * 0.9) * uAmp3 * 0.4 * pinFactor;
      float dy = (dy1 + dy2 + dy3) - totalWave;

      vec3 tangent = normalize(vec3(1.0, 0.0, dx * 50.0));
      vec3 bitangent = normalize(vec3(0.0, 1.0, dy * 50.0));
      vNormal = normalize(cross(tangent, bitangent));

      vPosition = newPosition;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
    }
  `,
  // Fragment Shader
  `
    uniform sampler2D uTexture;

    varying vec2 vUv;
    varying vec3 vNormal;
    varying vec3 vPosition;
    varying float vWaveIntensity;

    void main() {
      vec4 textureColor = texture2D(uTexture, vUv);

      // Optimized lighting with reduced brightness
      vec3 lightDirection1 = normalize(vec3(1.0, 1.0, 1.0));
      vec3 lightDirection2 = normalize(vec3(-0.5, 0.8, 0.5));

      float lightIntensity1 = max(dot(vNormal, lightDirection1), 0.0);
      float lightIntensity2 = max(dot(vNormal, lightDirection2), 0.0) * 0.2;
      float totalLight = clamp(lightIntensity1 + lightIntensity2 + 0.25, 0.2, 0.8);

      // Dynamic shadows based on wave intensity
      float shadow = 1.0 - vWaveIntensity * 0.15;
      shadow = clamp(shadow, 0.7, 1.0);

      // Subtle fabric-like shading
      float fabricShading = 1.0 + sin(vUv.x * 100.0) * 0.02 + sin(vUv.y * 80.0) * 0.015;

      vec3 finalColor = textureColor.rgb * totalLight * shadow * fabricShading;

      gl_FragColor = vec4(finalColor, textureColor.a);
    }
  `
);

extend({ FlagMaterial });

// Types
export type FlagSceneProps = {
  textureUrl?: string;
  flagSize?: [number, number];
  segments?: [number, number];
  waves?: {
    amp1?: number;
    freq1?: number;
    speed1?: number;
    amp2?: number;
    freq2?: number;
    speed2?: number;
    amp3?: number;
    freq3?: number;
    speed3?: number;
  };
  windPinStart?: number;
  withPole?: boolean;
  disableControls?: boolean;
};

// Flag Mesh Component
function FlagMesh({
  textureUrl = "/flags/vn.png",
  flagSize = [1.6, 1.0],
  segments = [128, 64],
  waves = {},
  windPinStart = 0.15,
}: Omit<FlagSceneProps, "withPole">) {
  const [hovered, setHovered] = useState(false);
  const [currentScale, setCurrentScale] = useState(1);
  useCursor(hovered);
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  // Load texture with fallback to placeholder
  const texture = useMemo(() => {
    try {
      const loader = new THREE.TextureLoader();
      const tex = loader.load(
        textureUrl,
        (texture) => {
          texture.anisotropy = 8;
          texture.magFilter = THREE.LinearFilter;
          texture.minFilter = THREE.LinearMipmapLinearFilter;
          texture.wrapS = THREE.ClampToEdgeWrapping;
          texture.wrapT = THREE.ClampToEdgeWrapping;
        },
        undefined,
        () => {
          console.log("Failed to load texture, using placeholder");
        }
      );
      return tex;
    } catch {
      return createVietnamFlagTexture();
    }
  }, [textureUrl]);

  // Wave parameters with defaults including 3rd layer
  const waveParams = useMemo(
    () => ({
      amp1: waves.amp1 ?? 0.06,
      freq1: waves.freq1 ?? 3.0,
      speed1: waves.speed1 ?? 1.2,
      amp2: waves.amp2 ?? 0.02,
      freq2: waves.freq2 ?? 6.0,
      speed2: waves.speed2 ?? 1.8,
      amp3: waves.amp3 ?? 0.01,
      freq3: waves.freq3 ?? 9.0,
      speed3: waves.speed3 ?? 2.3,
    }),
    [waves]
  );

  // Animation loop with smooth scale transition
  useFrame((_, delta) => {
    if (materialRef.current && materialRef.current.uniforms) {
      materialRef.current.uniforms.uTime.value += delta;
    }

    // Smooth scale transition
    if (meshRef.current) {
      const targetScale = hovered ? 1.02 : 1;
      const lerpFactor = 1 - Math.pow(0.01, delta);
      setCurrentScale((prev) => prev + (targetScale - prev) * lerpFactor);
      meshRef.current.scale.setScalar(currentScale);
    }
  });

  return (
    <mesh
      ref={meshRef}
      castShadow
      receiveShadow
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => setHovered(false)}
    >
      <planeGeometry
        args={[flagSize[0], flagSize[1], segments[0], segments[1]]}
      />
      {/* @ts-expect-error - Custom shader material not recognized by TypeScript */}
      <flagMaterial
        ref={materialRef}
        uTexture={texture}
        uAmp1={waveParams.amp1}
        uFreq1={waveParams.freq1}
        uSpeed1={waveParams.speed1}
        uAmp2={waveParams.amp2}
        uFreq2={waveParams.freq2}
        uSpeed2={waveParams.speed2}
        uAmp3={waveParams.amp3}
        uFreq3={waveParams.freq3}
        uSpeed3={waveParams.speed3}
        uPinStart={windPinStart}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

// Flag Pole Component
function FlagPole({ height = 1.0 }: { height?: number }) {
  return (
    <mesh position={[-0.82, 0, 0]} castShadow>
      <cylinderGeometry args={[0.008, 0.008, height * 1.1, 16]} />
      <meshStandardMaterial color="#444444" metalness={0.7} roughness={0.25} />
    </mesh>
  );
}

// Main Scene Component
export default function FlagScene({
  textureUrl = "/flags/vn.png",
  flagSize = [1.6, 1.0],
  segments = [128, 64],
  waves = {},
  windPinStart = 0.15,
  withPole = true,
  disableControls = false,
}: FlagSceneProps) {
  return (
    <div className="w-full h-full">
      <Canvas
        shadows
        dpr={Math.min(window.devicePixelRatio, 2)}
        camera={{
          fov: 45,
          position: [0, 0, 2.4],
          near: 0.1,
          far: 100,
        }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
        style={{ background: "transparent" }}
      >
        {/* Optimized Lighting */}
        <ambientLight intensity={0.4} />
        <directionalLight
          position={[2, 2, 2]}
          intensity={0.8}
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
          shadow-camera-far={8}
          shadow-camera-left={-2}
          shadow-camera-right={2}
          shadow-camera-top={2}
          shadow-camera-bottom={-2}
        />

        {/* Environment */}
        <Environment preset="sunset" />

        {/* Interactive Controls - Disabled when disableControls is true */}
        {!disableControls ? (
          <PresentationControls
            enabled={true}
            global={false}
            cursor={true}
            snap={false}
            speed={1}
            zoom={1}
            rotation={[-0.3, 0.2, 0.05]} // Initial tilt like in the image
            polar={[-Math.PI / 6, Math.PI / 6]}
            azimuth={[-Math.PI / 4, Math.PI / 4]}
          >
            {/* Floating Animation with Tilt Effect */}
            <Float speed={0.5} rotationIntensity={0.1} floatIntensity={0.05}>
              <group 
                position={[0.1, 0, 0]}
                rotation={[-0.3, 0.2, 0.05]} // Stronger tilt like in the image
              >
                {/* Flag */}
                <FlagMesh
                  textureUrl={textureUrl}
                  flagSize={flagSize}
                  segments={segments}
                  waves={waves}
                  windPinStart={windPinStart}
                />

                {/* Flag Pole */}
                {withPole && <FlagPole height={flagSize[1]} />}
              </group>
            </Float>
          </PresentationControls>
        ) : (
          /* Static Flag - No Controls */
          <group 
            position={[0.1, 0, 0]}
            rotation={[-0.3, 0.2, 0.05]} // Fixed tilt
          >
            {/* Flag */}
            <FlagMesh
              textureUrl={textureUrl}
              flagSize={flagSize}
              segments={segments}
              waves={waves}
              windPinStart={windPinStart}
            />

            {/* Flag Pole */}
            {withPole && <FlagPole height={flagSize[1]} />}
          </group>
        )}
      </Canvas>
    </div>
  );
}
