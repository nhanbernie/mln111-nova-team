import { motion } from "framer-motion";

const AnimatedTitle = () => {
  const text = "Nhà nước và cách mạng xã hội";

  return (
    <div className="text-center space-y-8">
      {/* Main Title with Wave Text Effect */}
      <div className="relative">
        <motion.h1
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight relative"
          style={{
            fontFamily: "Playfair Display, serif",
            letterSpacing: "0.02em",
            wordSpacing: "0.1em",
          }}
        >
          {text.split("").map((char, index) => (
            <motion.span
              key={index}
              className="inline-block"
              animate={{
                color: [
                  "#2D1810",
                  "#8B4513",
                  "#D97706",
                  "#B45309",
                  "#92400E",
                  "#2D1810",
                ],
                y: [0, -3, 0],
              }}
              transition={{
                color: {
                  duration: 8,
                  repeat: Infinity,
                  ease: "linear",
                  delay: index * 0.1,
                },
                y: {
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: index * 0.05,
                },
              }}
              style={{
                textShadow: "2px 2px 4px rgba(0,0,0,0.1)",
                willChange: "color, transform",
              }}
            >
              {char === " " ? "\u00A0" : char}
            </motion.span>
          ))}
        </motion.h1>
      </div>
      {/* 3D Decorative Underline with Tapered Ends */}
      <motion.div
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{ scaleX: 1, opacity: 1 }}
        transition={{ duration: 1.5, delay: 1.5, ease: "easeOut" }}
        className="mx-auto w-96 h-4 relative"
        style={{
          perspective: "1000px",
        }}
      >
        {/* Main Tapered Bar */}
        <motion.div
          className="w-full h-full relative"
          animate={{
            rotateX: [0, 2, -2, 0],
          }}
          transition={{
            rotateX: {
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
            },
          }}
          style={{
            background:
              "linear-gradient(90deg, transparent 0%, #8B4513 15%, #D97706 30%, #B45309 50%, #D97706 70%, #8B4513 85%, transparent 100%)",
            borderRadius: "50px",
            boxShadow: `
              0 4px 8px rgba(139, 69, 19, 0.3),
              0 2px 4px rgba(139, 69, 19, 0.2),
              inset 0 1px 0 rgba(255, 255, 255, 0.2)
            `,
            transformStyle: "preserve-3d",
            willChange: "transform",
          }}
        >
          {/* Animated Gradient Overlay */}
          <motion.div
            className="absolute inset-0"
            animate={{
              background: [
                "linear-gradient(90deg, transparent 0%, rgba(217, 119, 6, 0.8) 20%, rgba(180, 83, 9, 0.9) 50%, rgba(217, 119, 6, 0.8) 80%, transparent 100%)",
                "linear-gradient(90deg, transparent 20%, rgba(217, 119, 6, 0.8) 40%, rgba(180, 83, 9, 0.9) 70%, rgba(217, 119, 6, 0.8) 90%, transparent 100%)",
                "linear-gradient(90deg, transparent 0%, rgba(217, 119, 6, 0.8) 20%, rgba(180, 83, 9, 0.9) 50%, rgba(217, 119, 6, 0.8) 80%, transparent 100%)",
              ],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "linear",
              delay: 1,
            }}
            style={{
              borderRadius: "50px",
              willChange: "background",
            }}
          />

          {/* Top Highlight */}
          <motion.div
            className="absolute top-0 left-0 w-full h-1/2"
            animate={{
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{
              background:
                "linear-gradient(90deg, transparent 10%, rgba(255,255,255,0.4) 50%, transparent 90%)",
              borderRadius: "50px 50px 0 0",
              willChange: "opacity",
            }}
          />

          {/* 3D Depth Shadow */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.2) 100%)",
              borderRadius: "50px",
              transform: "translateZ(-2px) translateY(1px)",
            }}
          />
        </motion.div>
      </motion.div>
      {/* Enhanced Subtitle */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.2, duration: 1, ease: "easeOut" }}
        className="mt-20 relative"
      >
        {/* Decorative Quote Marks */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 2.8, duration: 0.6, ease: "backOut" }}
          className="absolute -top-4 -left-8 text-4xl opacity-30"
          style={{
            fontFamily: "'Playfair Display', serif",
            color: "#D97706",
            fontWeight: "bold",
          }}
        >
          "
        </motion.div>

        <motion.p
          className="text-xl md:text-2xl lg:text-3xl font-normal leading-relaxed px-4"
          animate={{
            textShadow: [
              "2px 2px 8px rgba(45, 24, 16, 0.3), 0px 0px 20px rgba(217, 119, 6, 0.1)",
              "3px 3px 12px rgba(45, 24, 16, 0.4), 0px 0px 25px rgba(217, 119, 6, 0.15)",
              "2px 2px 8px rgba(45, 24, 16, 0.3), 0px 0px 20px rgba(217, 119, 6, 0.1)",
            ],
          }}
          transition={{
            textShadow: {
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            },
          }}
          style={{
            fontFamily: "'Dancing Script', cursive",
            color: "#2D1810",
            letterSpacing: "0.5px",
            fontWeight: "500",
            willChange: "text-shadow",
          }}
        >
          Khám phá hành trình xây dựng và phát triển đất nước
        </motion.p>

        {/* Decorative Quote Marks */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 3, duration: 0.6, ease: "backOut" }}
          className="absolute -bottom-4 -right-8 text-4xl opacity-30"
          style={{
            fontFamily: "'Playfair Display', serif",
            color: "#D97706",
            fontWeight: "bold",
          }}
        >
          "
        </motion.div>

        {/* Background Glow Effect */}
        <motion.div
          className="absolute inset-0 -z-10"
          animate={{
            background: [
              "radial-gradient(ellipse 400px 100px at center, rgba(217, 119, 6, 0.05), transparent)",
              "radial-gradient(ellipse 450px 120px at center, rgba(217, 119, 6, 0.08), transparent)",
              "radial-gradient(ellipse 400px 100px at center, rgba(217, 119, 6, 0.05), transparent)",
            ],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{
            willChange: "background",
          }}
        />
      </motion.div>
    </div>
  );
};

export default AnimatedTitle;
