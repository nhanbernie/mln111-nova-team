import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  HomeIcon,
  BookOpenIcon,
  BriefcaseIcon,
  QuestionMarkCircleIcon,
  CpuChipIcon,
} from "@heroicons/react/24/outline";

interface NavItem {
  id: string;
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  color: string;
}

const navItems: NavItem[] = [
  { id: "home", icon: HomeIcon, label: "Trang chủ", color: "#8B4513" },
  { id: "about", icon: BookOpenIcon, label: "Giới thiệu", color: "#D97706" },
  { id: "team", icon: BriefcaseIcon, label: "Đội ngũ", color: "#B45309" },
  { id: "projects", icon: CpuChipIcon, label: "Dự án", color: "#92400E" },
  {
    id: "contact",
    icon: QuestionMarkCircleIcon,
    label: "Liên hệ",
    color: "#92400E",
  },
];

const BottomNavBar = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeItem, setActiveItem] = useState("home");
  const audioRef = useRef<HTMLAudioElement>(null);
  const navigate = useNavigate();

  const playClickSound = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(() => {
        console.log("Audio play failed");
      });
    }
  };

  const handleNavClick = (itemId: string) => {
    playClickSound();
    setActiveItem(itemId);

    switch (itemId) {
      case "home":
        navigate("/");
        break;
      case "about":
        navigate("/about");
        break;
      case "team":
        navigate("/team");
        break;
      case "projects":
        navigate("/projects");
        break;
      case "contact":
        navigate("/contact");
        break;
      default:
        navigate("/");
    }
  };

  return (
    <>
      <audio ref={audioRef} preload="auto">
        <source src="/ui-sound.mp3" type="audio/mpeg" />
      </audio>
      <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50">
        <motion.div
          className="relative"
          onHoverStart={() => {
            playClickSound();
            setIsExpanded(true);
          }}
          onHoverEnd={() => setIsExpanded(false)}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          {/* Collapsed State - Hamburger Button */}
          <AnimatePresence>
            {!isExpanded && (
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: "backOut" }}
                className="w-16 h-16 rounded-full cursor-pointer relative overflow-hidden"
                style={{
                  background:
                    "linear-gradient(135deg, #8B4513 0%, #D97706 50%, #B45309 100%)",
                  boxShadow: `
                  0 8px 32px rgba(139, 69, 19, 0.4),
                  0 4px 16px rgba(139, 69, 19, 0.3),
                  inset 0 2px 0 rgba(255, 255, 255, 0.2)
                `,
                }}
              >
                {/* 3D Depth Effect */}
                <div
                  className="absolute inset-0 rounded-full"
                  style={{
                    background:
                      "linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.2) 100%)",
                    transform: "translateZ(-2px)",
                  }}
                />

                {/* Home Icon with Shake Animation */}
                <motion.div
                  className="absolute inset-0 flex items-center justify-center"
                  animate={{
                    x: [0, -2, 2, -2, 2, 0],
                    y: [0, -1, 1, -1, 1, 0],
                  }}
                  transition={{
                    duration: 0.6,
                    repeat: Infinity,
                    repeatDelay: 2,
                    ease: "easeInOut",
                  }}
                >
                  <HomeIcon className="w-8 h-8 text-white drop-shadow-lg" />
                </motion.div>

                {/* Pulsing Ring */}
                <motion.div
                  className="absolute inset-0 rounded-full border-2 border-white/30"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.5, 0, 0.5],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Expanded State - Full Nav Bar */}
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ width: 64, opacity: 0, scale: 0.9 }}
                animate={{ width: "auto", opacity: 1, scale: 1 }}
                exit={{ width: 64, opacity: 0, scale: 0.9 }}
                transition={{
                  duration: 0.3,
                  ease: [0.25, 0.46, 0.45, 0.94],
                  opacity: { duration: 0.2 },
                  scale: { duration: 0.25, ease: "backOut" },
                }}
                className="flex items-center gap-2 px-4 py-3 rounded-full relative overflow-hidden"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(139, 69, 19, 0.95) 0%, rgba(217, 119, 6, 0.95) 50%, rgba(180, 83, 9, 0.95) 100%)",
                  backdropFilter: "blur(20px)",
                  boxShadow: `
                  0 12px 40px rgba(139, 69, 19, 0.5),
                  0 6px 20px rgba(139, 69, 19, 0.4),
                  inset 0 2px 0 rgba(255, 255, 255, 0.3),
                  inset 0 -1px 0 rgba(0, 0, 0, 0.2)
                `,
                }}
              >
                {/* Animated Background Glow */}
                <motion.div
                  className="absolute inset-0 rounded-full"
                  animate={{
                    background: [
                      "radial-gradient(circle at 20% 50%, rgba(255, 255, 255, 0.1) 0%, transparent 50%)",
                      "radial-gradient(circle at 80% 50%, rgba(255, 255, 255, 0.1) 0%, transparent 50%)",
                      "radial-gradient(circle at 20% 50%, rgba(255, 255, 255, 0.1) 0%, transparent 50%)",
                    ],
                  }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                />

                {/* Nav Items */}
                {navItems.map((item, index) => {
                  const Icon = item.icon;
                  const isActive = activeItem === item.id;

                  return (
                    <motion.button
                      key={item.id}
                      initial={{ scale: 0, x: -20, opacity: 0 }}
                      animate={{ scale: 1, x: 0, opacity: 1 }}
                      transition={{
                        delay: index * 0.08,
                        duration: 0.4,
                        ease: [0.68, -0.55, 0.265, 1.55],
                      }}
                      onClick={() => handleNavClick(item.id)}
                      className="relative group"
                    >
                      {/* Button Container */}
                      <motion.div
                        className="w-12 h-12 rounded-full flex items-center justify-center relative overflow-hidden cursor-pointer"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        animate={isActive ? { scale: 1.05 } : { scale: 1 }}
                        transition={{
                          type: "spring",
                          stiffness: 400,
                          damping: 25,
                        }}
                        style={{
                          background: isActive
                            ? `linear-gradient(135deg, ${item.color} 0%, rgba(255, 255, 255, 0.2) 100%)`
                            : "rgba(255, 255, 255, 0.1)",
                          boxShadow: isActive
                            ? `0 4px 16px ${item.color}40, inset 0 1px 0 rgba(255, 255, 255, 0.3)`
                            : "0 2px 8px rgba(0, 0, 0, 0.1)",
                        }}
                      >
                        {/* Icon */}
                        <motion.div
                          animate={isActive ? { y: [0, -2, 0] } : {}}
                          transition={{ duration: 0.6, repeat: Infinity }}
                        >
                          <Icon
                            className={`w-6 h-6 ${
                              isActive ? "text-white" : "text-white/80"
                            } drop-shadow-sm`}
                          />
                        </motion.div>

                        {/* Active Indicator */}
                        {isActive && (
                          <motion.div
                            className="absolute inset-0 rounded-full"
                            animate={{
                              boxShadow: [
                                `0 0 0 0px ${item.color}40`,
                                `0 0 0 4px ${item.color}20`,
                                `0 0 0 0px ${item.color}40`,
                              ],
                            }}
                            transition={{ duration: 2, repeat: Infinity }}
                          />
                        )}
                      </motion.div>

                      {/* Tooltip */}
                      <motion.div
                        className="absolute -top-12 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 pointer-events-none"
                        initial={{ y: 10, opacity: 0 }}
                        whileHover={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div
                          className="px-3 py-1 rounded-lg text-sm font-medium text-white whitespace-nowrap"
                          style={{
                            background: item.color,
                            boxShadow: `0 4px 12px ${item.color}40`,
                          }}
                        >
                          {item.label}
                          {/* Arrow */}
                          <div
                            className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0"
                            style={{
                              borderLeft: "4px solid transparent",
                              borderRight: "4px solid transparent",
                              borderTop: `4px solid ${item.color}`,
                            }}
                          />
                        </div>
                      </motion.div>
                    </motion.button>
                  );
                })}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </>
  );
};

export default BottomNavBar;
