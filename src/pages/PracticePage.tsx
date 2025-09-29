import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { practiceTopics } from "../data/practiceData";
import { 
  AcademicCapIcon,
  GlobeAltIcon,
  CpuChipIcon,
  BuildingOfficeIcon,
  LightBulbIcon,
  ShieldExclamationIcon,
  ChatBubbleLeftRightIcon,
  HeartIcon
} from "@heroicons/react/24/outline";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

export default function PracticePage() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const heroRef = useRef<HTMLDivElement>(null);


  // GSAP Animations - Enhanced with cool effects
  useEffect(() => {
    // Hero section animation with scale effect
    if (heroRef.current) {
      gsap.fromTo(heroRef.current, 
        { opacity: 0, y: 30, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 1.2, ease: "power2.out" }
      );
    }

    // Sections animation with enhanced effects
    const cardElements = cardRefs.current.filter(Boolean);
    
    cardElements.forEach((card, index) => {
      if (card) {
        // Simplified entrance animation
        gsap.fromTo(card, {
          opacity: 0,
          y: 20
        }, {
          opacity: 1,
          y: 0,
          duration: 0.5,
          delay: index * 0.05,
          ease: "power1.out",
          scrollTrigger: {
            trigger: card,
            start: "top 90%",
            end: "bottom 10%",
            toggleActions: "play none none reverse",
            fastScrollEnd: true
          }
        });

        // Disabled parallax for better performance
        // gsap.to(card, { ... });

        // Content reveal animation - Simplified
        const contentElements = card.querySelectorAll('.content-reveal');
        if (contentElements.length > 0) {
          gsap.fromTo(contentElements, {
            opacity: 0
          }, {
            opacity: 1,
            duration: 0.4,
            stagger: 0.02,
            delay: 0.1,
            ease: "power1.out",
            scrollTrigger: {
              trigger: card,
              start: "top 90%",
              end: "bottom 10%",
              toggleActions: "play none none reverse",
              fastScrollEnd: true
            }
          });
        }
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Floating Particles Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-white/20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              x: [0, Math.random() * 20 - 10, 0],
              opacity: [0.2, 0.8, 0.2],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      {/* Hero Section */}
      <motion.div
        ref={heroRef}
        className="min-h-screen flex items-center justify-center relative z-50"
        style={{
          // background: "linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(147, 51, 234, 0.1) 50%, rgba(236, 72, 153, 0.1) 100%)",
          backgroundSize: "400% 400%"
        }}
        animate={{
          backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <div className="text-center max-w-6xl mx-auto px-8">
          {/* Floating Background Elements - Reduced for performance */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1.5 h-1.5 bg-amber-200/20 rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  y: [0, -20, 0],
                  opacity: [0.2, 0.5, 0.2],
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 8 + Math.random() * 4,
                  repeat: Infinity,
                  delay: Math.random() * 6,
                  ease: "easeInOut"
                }}
              />
            ))}
          </div>

          {/* Main Title */}
          <motion.div
            initial={{ opacity: 0, y: 50, rotateY: -15 }}
            animate={{ opacity: 1, y: 0, rotateY: 0 }}
            transition={{ duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="relative z-10"
          >
            <div className="flex items-center justify-center gap-6 mb-8">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                <AcademicCapIcon className="w-24 h-24 text-white drop-shadow-2xl" />
              </motion.div>
              
              <div>
                <motion.h1 
                  className="text-8xl font-bold text-white mb-4 font-dancing-script"
                  animate={{
                    textShadow: [
                      "0 0 30px rgba(255, 255, 255, 0.5)",
                      "0 0 60px rgba(255, 255, 255, 0.8)",
                      "0 0 30px rgba(255, 255, 255, 0.5)"
                    ]
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  Thực Tiễn
                </motion.h1>
                <motion.p 
                  className="text-3xl text-white/90 font-dancing-script"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                >
                  Vấn đề cách mạng xã hội trên thế giới hiện nay
                </motion.p>
              </div>
            </div>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            className="absolute bottom-12 left-1/2 transform -translate-x-1/2 py-18"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2, duration: 1.2, ease: "easeOut" }}
          >
            <motion.div
              className="flex flex-col items-center gap-4 text-white/80"
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              <span className="text-lg font-dancing-script">Cuộn để khám phá</span>
              <motion.div
                className="w-8 h-12 border-2 border-white/50 rounded-full flex justify-center"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
              >
                <motion.div
                  className="w-2 h-4 bg-white/90 rounded-full mt-2"
                  animate={{ y: [0, 12, 0] }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                />
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      {/* Main Content Sections */}
      <section
        ref={sectionRef}
        className="relative"
      >
        {/* Section 1: Xã hội hiện đại */}
        <motion.div
          ref={(el) => {
            cardRefs.current[0] = el;
          }}
          className="min-h-screen flex items-center justify-center py-20 px-8"
          style={{
            boxShadow: "0 10px 25px rgba(0,0,0,0.1)"
          }}
          whileHover={{
            scale: 1.02,
            boxShadow: "0 20px 40px rgba(0,0,0,0.2)",
            transition: { duration: 0.3 }
          }}
        >
          <div className="max-w-6xl mx-auto">
            {/* Header Banner */}
            <div className="bg-gradient-to-r from-amber-900/90 to-amber-950/90 rounded-2xl p-8 mb-12 shadow-2xl border border-amber-700/60 backdrop-blur-sm">
              <div className="flex items-center gap-6 mb-6">
                <GlobeAltIcon className="w-16 h-16 text-amber-200" />
                <div>
                  <h2 className="text-5xl font-bold text-amber-100 mb-2 font-dancing-script drop-shadow-lg">
                    Xã hội hiện đại
                  </h2>
                  <p className="text-2xl text-amber-200 font-dancing-script">
                    Cách mạng khoa học - công nghệ
                  </p>
                </div>
              </div>
              <div className="w-full h-1 bg-amber-200/30 rounded-full" />
            </div>

            {/* Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Left Content */}
              <div className="space-y-8">
                <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-8 border border-white/20">
                  <h3 className="text-3xl font-bold text-white mb-6 font-dancing-script">
                    Đặc điểm nổi bật
                  </h3>
                  <div className="space-y-4">
                    {practiceTopics[0].features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-4">
                        <div className="w-3 h-3 bg-amber-300/70 rounded-full" />
                        <span className="text-white text-lg font-dancing-script">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-8 border border-white/20">
                  <h3 className="text-3xl font-bold text-white mb-6 font-dancing-script">
                    Thống kê quan trọng
                  </h3>
                  <div className="grid grid-cols-1 gap-6">
                    {practiceTopics[0].statistics.map((stat, idx) => (
                      <div key={idx} className="text-center p-4 bg-white/5 rounded-xl">
                        <div className="text-4xl font-bold text-amber-200/90 mb-2">{stat.value}</div>
                        <div className="text-white/80 text-lg font-dancing-script">{stat.label}</div>
                        <div className="text-white/60 text-sm font-dancing-script">{stat.description}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Content */}
              <div className="space-y-8">
                <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-8 border border-white/20">
                  <h3 className="text-3xl font-bold text-white mb-6 font-dancing-script">
                    Nội dung chính
                  </h3>
                  <p className="text-white/90 text-lg leading-relaxed font-dancing-script mb-6">
                    {practiceTopics[0].content}
                  </p>
                  
                  <div className="space-y-4">
                    <h4 className="text-xl font-semibold text-white font-dancing-script">Ví dụ thực tế:</h4>
                    {practiceTopics[0].examples.map((example, idx) => (
                      <div key={idx} className="flex items-center gap-3 p-3 bg-white/5 rounded-lg">
                        <div className="w-2 h-2 bg-amber-300/70 rounded-full" />
                        <span className="text-white/90 font-dancing-script">{example}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="relative">
                  <motion.img
                    src={practiceTopics[0].image}
                    alt={practiceTopics[0].title}
                    className="w-full h-64 object-cover rounded-2xl shadow-xl"
                    whileHover={{
                      scale: 1.05,
                      boxShadow: "0 25px 50px rgba(0,0,0,0.3)",
                      transition: { duration: 0.3 }
                    }}
                    animate={{
                      boxShadow: [
                        "0 10px 30px rgba(0,0,0,0.2)",
                        "0 15px 35px rgba(0,0,0,0.25)",
                        "0 10px 30px rgba(0,0,0,0.2)"
                      ]
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                    style={{
                      transformStyle: "preserve-3d",
                      perspective: "1000px",
                      willChange: "transform, opacity, filter"
                    }}
                  />
                  <motion.div
                    className="absolute inset-0 rounded-2xl bg-gradient-to-t from-amber-900/20 to-transparent"
                    animate={{ opacity: [0.1, 0.2, 0.1] }}
                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                  />
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Section 2: Trí tuệ nhân tạo */}
        <motion.div
          ref={(el) => {
            cardRefs.current[1] = el;
          }}
          className="min-h-screen flex items-center justify-center py-20 px-8"
          style={{
            boxShadow: "0 10px 25px rgba(0,0,0,0.1)"
          }}
          whileHover={{
            scale: 1.02,
            boxShadow: "0 20px 40px rgba(0,0,0,0.2)",
            transition: { duration: 0.3 }
          }}
        >
          <div className="max-w-6xl mx-auto">
            {/* Header Banner */}
            <div className="bg-gradient-to-r from-slate-900/90 to-slate-950/90 rounded-2xl p-8 mb-12 shadow-2xl border border-slate-700/60 backdrop-blur-sm">
              <div className="flex items-center gap-6 mb-6">
                <CpuChipIcon className="w-16 h-16 text-slate-200" />
                <div>
                  <h2 className="text-5xl font-bold text-slate-100 mb-2 font-dancing-script drop-shadow-lg">
                    Trí tuệ nhân tạo
                  </h2>
                  <p className="text-2xl text-slate-200 font-dancing-script">
                    AI thay đổi cách làm việc
                  </p>
                </div>
              </div>
              <div className="w-full h-1 bg-slate-200/30 rounded-full" />
            </div>

            {/* Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Left Content */}
              <div className="space-y-8">
                <motion.div 
                  className="bg-white/10 backdrop-blur-xl rounded-2xl p-8 border border-white/20"
                  style={{
                    willChange: "transform, opacity, filter",
                    transformStyle: "preserve-3d",
                    perspective: "1000px",
                    boxShadow: "0 15px 30px rgba(0,0,0,0.15)"
                  }}
                >
                  <h3 className="text-3xl font-bold text-white mb-6 font-dancing-script">
                    Đặc điểm nổi bật
                  </h3>
                  <div className="space-y-4">
                    {practiceTopics[1].features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-4">
                        <div className="w-3 h-3 bg-slate-300/70 rounded-full" />
                        <span className="text-white text-lg font-dancing-script">{feature}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>

                <motion.div 
                  className="bg-white/10 backdrop-blur-xl rounded-2xl p-8 border border-white/20"
                  style={{
                    willChange: "transform, opacity, filter",
                    transformStyle: "preserve-3d",
                    perspective: "1000px",
                    boxShadow: "0 15px 30px rgba(0,0,0,0.15)"
                  }}
                >
                  <h3 className="text-3xl font-bold text-white mb-6 font-dancing-script">
                    Thống kê quan trọng
                  </h3>
                  <div className="grid grid-cols-1 gap-6">
                    {practiceTopics[1].statistics.map((stat, idx) => (
                      <div key={idx} className="text-center p-4 bg-white/5 rounded-xl">
                        <div className="text-4xl font-bold text-slate-200/90 mb-2">{stat.value}</div>
                        <div className="text-white/80 text-lg font-dancing-script">{stat.label}</div>
                        <div className="text-white/60 text-sm font-dancing-script">{stat.description}</div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </div>

              {/* Right Content */}
              <div className="space-y-8">
                <motion.div 
                  className="bg-white/10 backdrop-blur-xl rounded-2xl p-8 border border-white/20"
                  style={{
                    willChange: "transform, opacity, filter",
                    transformStyle: "preserve-3d",
                    perspective: "1000px",
                    boxShadow: "0 15px 30px rgba(0,0,0,0.15)"
                  }}
                >
                  <h3 className="text-3xl font-bold text-white mb-6 font-dancing-script">
                    Nội dung chính
                  </h3>
                  <p className="text-white/90 text-lg leading-relaxed font-dancing-script mb-6">
                    {practiceTopics[1].content}
                  </p>
                  
                  <div className="space-y-4">
                    <h4 className="text-xl font-semibold text-white font-dancing-script">Ví dụ thực tế:</h4>
                    {practiceTopics[1].examples.map((example, idx) => (
                      <div key={idx} className="flex items-center gap-3 p-3 bg-white/5 rounded-lg">
                        <div className="w-2 h-2 bg-slate-300/70 rounded-full" />
                        <span className="text-white/90 font-dancing-script">{example}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>

                <div className="relative">
                  <img
                    src={practiceTopics[1].image}
                    alt={practiceTopics[1].title}
                    className="w-full h-64 object-cover rounded-2xl shadow-2xl"
                    style={{
                      transformStyle: "preserve-3d",
                      perspective: "1000px",
                      willChange: "transform, opacity, filter"
                    }}
                  />
                  <motion.div
                    className="absolute inset-0 rounded-2xl bg-gradient-to-t from-black/30 to-transparent"
                    animate={{ opacity: [0.2, 0.4, 0.2] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  />
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Section 3: Thành phố thông minh */}
        <motion.div
          ref={(el) => {
            cardRefs.current[2] = el;
          }}
          className="min-h-screen flex items-center justify-center py-20 px-8"
          style={{
            boxShadow: "0 10px 25px rgba(0,0,0,0.1)"
          }}
          whileHover={{
            scale: 1.02,
            boxShadow: "0 20px 40px rgba(0,0,0,0.2)",
            transition: { duration: 0.3 }
          }}
        >
          <div className="max-w-6xl mx-auto">
            {/* Header Banner */}
            <div className="bg-gradient-to-r from-emerald-900/90 to-emerald-950/90 rounded-2xl p-8 mb-12 shadow-2xl border border-emerald-700/60 backdrop-blur-sm">
              <div className="flex items-center gap-6 mb-6">
                <BuildingOfficeIcon className="w-16 h-16 text-emerald-200" />
                <div>
                  <h2 className="text-5xl font-bold text-emerald-100 mb-2 font-dancing-script drop-shadow-lg">
                    Thành phố thông minh
                  </h2>
                  <p className="text-2xl text-emerald-200 font-dancing-script">
                    5G và IoT
                  </p>
                </div>
              </div>
              <div className="w-full h-1 bg-emerald-200/30 rounded-full" />
            </div>

            {/* Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Left Content */}
              <div className="space-y-8">
                <motion.div 
                  className="bg-white/10 backdrop-blur-xl rounded-2xl p-8 border border-white/20"
                  style={{
                    willChange: "transform, opacity, filter",
                    transformStyle: "preserve-3d",
                    perspective: "1000px",
                    boxShadow: "0 15px 30px rgba(0,0,0,0.15)"
                  }}
                >
                  <h3 className="text-3xl font-bold text-white mb-6 font-dancing-script">
                    Đặc điểm nổi bật
                  </h3>
                  <div className="space-y-4">
                    {practiceTopics[2].features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-4">
                        <div className="w-3 h-3 bg-emerald-300/70 rounded-full" />
                        <span className="text-white text-lg font-dancing-script">{feature}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>

                <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-8 border border-white/20">
                  <h3 className="text-3xl font-bold text-white mb-6 font-dancing-script">
                    Thống kê quan trọng
                  </h3>
                  <div className="grid grid-cols-1 gap-6">
                    {practiceTopics[2].statistics.map((stat, idx) => (
                      <div key={idx} className="text-center p-4 bg-white/5 rounded-xl">
                        <div className="text-4xl font-bold text-emerald-200/90 mb-2">{stat.value}</div>
                        <div className="text-white/80 text-lg font-dancing-script">{stat.label}</div>
                        <div className="text-white/60 text-sm font-dancing-script">{stat.description}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Content */}
              <div className="space-y-8">
                <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-8 border border-white/20">
                  <h3 className="text-3xl font-bold text-white mb-6 font-dancing-script">
                    Nội dung chính
                  </h3>
                  <p className="text-white/90 text-lg leading-relaxed font-dancing-script mb-6">
                    {practiceTopics[2].content}
                  </p>
                  
                  <div className="space-y-4">
                    <h4 className="text-xl font-semibold text-white font-dancing-script">Ví dụ thực tế:</h4>
                    {practiceTopics[2].examples.map((example, idx) => (
                      <div key={idx} className="flex items-center gap-3 p-3 bg-white/5 rounded-lg">
                        <div className="w-2 h-2 bg-emerald-300/70 rounded-full" />
                        <span className="text-white/90 font-dancing-script">{example}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="relative">
                  <img
                    src={practiceTopics[2].image}
                    alt={practiceTopics[2].title}
                    className="w-full h-64 object-cover rounded-2xl shadow-2xl"
                    style={{
                      transformStyle: "preserve-3d",
                      perspective: "1000px",
                      willChange: "transform, opacity, filter"
                    }}
                  />
                  <motion.div
                    className="absolute inset-0 rounded-2xl bg-gradient-to-t from-black/30 to-transparent"
                    animate={{ opacity: [0.2, 0.4, 0.2] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  />
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Section 4: Kinh tế tri thức */}
        <motion.div
          ref={(el) => {
            cardRefs.current[3] = el;
          }}
          className="min-h-screen flex items-center justify-center py-20 px-8"
          style={{
            boxShadow: "0 10px 25px rgba(0,0,0,0.1)"
          }}
          whileHover={{
            scale: 1.02,
            boxShadow: "0 20px 40px rgba(0,0,0,0.2)",
            transition: { duration: 0.3 }
          }}
        >
          <div className="max-w-6xl mx-auto">
            {/* Header Banner */}
            <div className="bg-gradient-to-r from-amber-900/90 to-amber-950/90 rounded-2xl p-8 mb-12 shadow-2xl border border-amber-700/60 backdrop-blur-sm">
              <div className="flex items-center gap-6 mb-6">
                <LightBulbIcon className="w-16 h-16 text-amber-200" />
                <div>
                  <h2 className="text-5xl font-bold text-amber-100 mb-2 font-dancing-script drop-shadow-lg">
                    Kinh tế tri thức
                  </h2>
                  <p className="text-2xl text-amber-200 font-dancing-script">
                    Dựa vào tri thức và sáng tạo
                  </p>
                </div>
              </div>
              <div className="w-full h-1 bg-amber-200/30 rounded-full" />
            </div>

            {/* Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Left Content */}
              <div className="space-y-8">
                <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-8 border border-white/20">
                  <h3 className="text-3xl font-bold text-white mb-6 font-dancing-script">
                    Đặc điểm nổi bật
                  </h3>
                  <div className="space-y-4">
                    {practiceTopics[3].features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-4">
                        <div className="w-3 h-3 bg-amber-300/70 rounded-full" />
                        <span className="text-white text-lg font-dancing-script">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-8 border border-white/20">
                  <h3 className="text-3xl font-bold text-white mb-6 font-dancing-script">
                    Thống kê quan trọng
                  </h3>
                  <div className="grid grid-cols-1 gap-6">
                    {practiceTopics[3].statistics.map((stat, idx) => (
                      <div key={idx} className="text-center p-4 bg-white/5 rounded-xl">
                        <div className="text-4xl font-bold text-amber-200/90 mb-2">{stat.value}</div>
                        <div className="text-white/80 text-lg font-dancing-script">{stat.label}</div>
                        <div className="text-white/60 text-sm font-dancing-script">{stat.description}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Content */}
              <div className="space-y-8">
                <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-8 border border-white/20">
                  <h3 className="text-3xl font-bold text-white mb-6 font-dancing-script">
                    Nội dung chính
                  </h3>
                  <p className="text-white/90 text-lg leading-relaxed font-dancing-script mb-6">
                    {practiceTopics[3].content}
                  </p>
                  
                  <div className="space-y-4">
                    <h4 className="text-xl font-semibold text-white font-dancing-script">Ví dụ thực tế:</h4>
                    {practiceTopics[3].examples.map((example, idx) => (
                      <div key={idx} className="flex items-center gap-3 p-3 bg-white/5 rounded-lg">
                        <div className="w-2 h-2 bg-amber-300/70 rounded-full" />
                        <span className="text-white/90 font-dancing-script">{example}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="relative">
                  <img
                    src={practiceTopics[3].image}
                    alt={practiceTopics[3].title}
                    className="w-full h-64 object-cover rounded-2xl shadow-2xl"
                    style={{
                      transformStyle: "preserve-3d",
                      perspective: "1000px",
                      willChange: "transform, opacity, filter"
                    }}
                  />
                  <motion.div
                    className="absolute inset-0 rounded-2xl bg-gradient-to-t from-black/30 to-transparent"
                    animate={{ opacity: [0.2, 0.4, 0.2] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  />
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Section 5: Xung đột đương đại */}
        <motion.div
          ref={(el) => {
            cardRefs.current[4] = el;
          }}
          className="min-h-screen flex items-center justify-center py-20 px-8"
          style={{
            boxShadow: "0 10px 25px rgba(0,0,0,0.1)"
          }}
          whileHover={{
            scale: 1.02,
            boxShadow: "0 20px 40px rgba(0,0,0,0.2)",
            transition: { duration: 0.3 }
          }}
        >
          <div className="max-w-6xl mx-auto">
            {/* Header Banner */}
            <div className="bg-gradient-to-r from-rose-900/90 to-rose-950/90 rounded-2xl p-8 mb-12 shadow-2xl border border-rose-700/60 backdrop-blur-sm">
              <div className="flex items-center gap-6 mb-6">
                <ShieldExclamationIcon className="w-16 h-16 text-rose-200" />
                <div>
                  <h2 className="text-5xl font-bold text-rose-100 mb-2 font-dancing-script drop-shadow-lg">
                    Xung đột đương đại
                  </h2>
                  <p className="text-2xl text-rose-200 font-dancing-script">
                    Sắc tộc, tôn giáo, kinh tế
                  </p>
                </div>
              </div>
              <div className="w-full h-1 bg-rose-200/30 rounded-full" />
            </div>

            {/* Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Left Content */}
              <div className="space-y-8">
                <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-8 border border-white/20">
                  <h3 className="text-3xl font-bold text-white mb-6 font-dancing-script">
                    Đặc điểm nổi bật
                  </h3>
                  <div className="space-y-4">
                    {practiceTopics[4].features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-4">
                        <div className="w-3 h-3 bg-rose-300/70 rounded-full" />
                        <span className="text-white text-lg font-dancing-script">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-8 border border-white/20">
                  <h3 className="text-3xl font-bold text-white mb-6 font-dancing-script">
                    Thống kê quan trọng
                  </h3>
                  <div className="grid grid-cols-1 gap-6">
                    {practiceTopics[4].statistics.map((stat, idx) => (
                      <div key={idx} className="text-center p-4 bg-white/5 rounded-xl">
                        <div className="text-4xl font-bold text-rose-200/90 mb-2">{stat.value}</div>
                        <div className="text-white/80 text-lg font-dancing-script">{stat.label}</div>
                        <div className="text-white/60 text-sm font-dancing-script">{stat.description}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Content */}
              <div className="space-y-8">
                <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-8 border border-white/20">
                  <h3 className="text-3xl font-bold text-white mb-6 font-dancing-script">
                    Nội dung chính
                  </h3>
                  <p className="text-white/90 text-lg leading-relaxed font-dancing-script mb-6">
                    {practiceTopics[4].content}
                  </p>
                  
                  <div className="space-y-4">
                    <h4 className="text-xl font-semibold text-white font-dancing-script">Ví dụ thực tế:</h4>
                    {practiceTopics[4].examples.map((example, idx) => (
                      <div key={idx} className="flex items-center gap-3 p-3 bg-white/5 rounded-lg">
                        <div className="w-2 h-2 bg-rose-300/70 rounded-full" />
                        <span className="text-white/90 font-dancing-script">{example}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="relative">
                  <img
                    src={practiceTopics[4].image}
                    alt={practiceTopics[4].title}
                    className="w-full h-64 object-cover rounded-2xl shadow-2xl"
                    style={{
                      transformStyle: "preserve-3d",
                      perspective: "1000px",
                      willChange: "transform, opacity, filter"
                    }}
                  />
                  <motion.div
                    className="absolute inset-0 rounded-2xl bg-gradient-to-t from-black/30 to-transparent"
                    animate={{ opacity: [0.2, 0.4, 0.2] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  />
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Section 6: Xu hướng đối thoại */}
        <motion.div
          ref={(el) => {
            cardRefs.current[5] = el;
          }}
          className="min-h-screen flex items-center justify-center py-20 px-8"
          style={{
            boxShadow: "0 10px 25px rgba(0,0,0,0.1)"
          }}
          whileHover={{
            scale: 1.02,
            boxShadow: "0 20px 40px rgba(0,0,0,0.2)",
            transition: { duration: 0.3 }
          }}
        >
          <div className="max-w-6xl mx-auto">
            {/* Header Banner */}
            <div className="bg-gradient-to-r from-blue-900/90 to-blue-950/90 rounded-2xl p-8 mb-12 shadow-2xl border border-blue-700/60 backdrop-blur-sm">
              <div className="flex items-center gap-6 mb-6">
                <ChatBubbleLeftRightIcon className="w-16 h-16 text-blue-200" />
                <div>
                  <h2 className="text-5xl font-bold text-blue-100 mb-2 font-dancing-script drop-shadow-lg">
                    Xu hướng đối thoại
                  </h2>
                  <p className="text-2xl text-blue-200 font-dancing-script">
                    Hòa giải và hợp tác
                  </p>
                </div>
              </div>
              <div className="w-full h-1 bg-blue-200/30 rounded-full" />
            </div>

            {/* Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Left Content */}
              <div className="space-y-8">
                <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-8 border border-white/20">
                  <h3 className="text-3xl font-bold text-white mb-6 font-dancing-script">
                    Đặc điểm nổi bật
                  </h3>
                  <div className="space-y-4">
                    {practiceTopics[5].features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-4">
                        <div className="w-3 h-3 bg-blue-300/70 rounded-full" />
                        <span className="text-white text-lg font-dancing-script">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-8 border border-white/20">
                  <h3 className="text-3xl font-bold text-white mb-6 font-dancing-script">
                    Thống kê quan trọng
                  </h3>
                  <div className="grid grid-cols-1 gap-6">
                    {practiceTopics[5].statistics.map((stat, idx) => (
                      <div key={idx} className="text-center p-4 bg-white/5 rounded-xl">
                        <div className="text-4xl font-bold text-blue-200/90 mb-2">{stat.value}</div>
                        <div className="text-white/80 text-lg font-dancing-script">{stat.label}</div>
                        <div className="text-white/60 text-sm font-dancing-script">{stat.description}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Content */}
              <div className="space-y-8">
                <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-8 border border-white/20">
                  <h3 className="text-3xl font-bold text-white mb-6 font-dancing-script">
                    Nội dung chính
                  </h3>
                  <p className="text-white/90 text-lg leading-relaxed font-dancing-script mb-6">
                    {practiceTopics[5].content}
                  </p>
                  
                  <div className="space-y-4">
                    <h4 className="text-xl font-semibold text-white font-dancing-script">Ví dụ thực tế:</h4>
                    {practiceTopics[5].examples.map((example, idx) => (
                      <div key={idx} className="flex items-center gap-3 p-3 bg-white/5 rounded-lg">
                        <div className="w-2 h-2 bg-blue-300/70 rounded-full" />
                        <span className="text-white/90 font-dancing-script">{example}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="relative">
                  <img
                    src={practiceTopics[5].image}
                    alt={practiceTopics[5].title}
                    className="w-full h-64 object-cover rounded-2xl shadow-2xl"
                    style={{
                      transformStyle: "preserve-3d",
                      perspective: "1000px",
                      willChange: "transform, opacity, filter"
                    }}
                  />
                  <motion.div
                    className="absolute inset-0 rounded-2xl bg-gradient-to-t from-black/30 to-transparent"
                    animate={{ opacity: [0.2, 0.4, 0.2] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  />
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Section 7: Việt Nam hội nhập */}
        <motion.div
          ref={(el) => {
            cardRefs.current[6] = el;
          }}
          className="min-h-screen flex items-center justify-center py-20 px-8"
          style={{
            boxShadow: "0 10px 25px rgba(0,0,0,0.1)"
          }}
          whileHover={{
            scale: 1.02,
            boxShadow: "0 20px 40px rgba(0,0,0,0.2)",
            transition: { duration: 0.3 }
          }}
        >
          <div className="max-w-6xl mx-auto">
            {/* Header Banner */}
            <div className="bg-gradient-to-r from-emerald-900/90 to-emerald-950/90 rounded-2xl p-8 mb-12 shadow-2xl border border-emerald-700/60 backdrop-blur-sm">
              <div className="flex items-center gap-6 mb-6">
                <HeartIcon className="w-16 h-16 text-emerald-200" />
                <div>
                  <h2 className="text-5xl font-bold text-emerald-100 mb-2 font-dancing-script drop-shadow-lg">
                    Việt Nam hội nhập
                  </h2>
                  <p className="text-2xl text-emerald-200 font-dancing-script">
                    Đa phương hóa, đa dạng hóa
                  </p>
                </div>
              </div>
              <div className="w-full h-1 bg-emerald-200/30 rounded-full" />
            </div>

            {/* Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Left Content */}
              <div className="space-y-8">
                <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-8 border border-white/20">
                  <h3 className="text-3xl font-bold text-white mb-6 font-dancing-script">
                    Đặc điểm nổi bật
                  </h3>
                  <div className="space-y-4">
                    {practiceTopics[6].features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-4">
                        <div className="w-3 h-3 bg-emerald-300/70 rounded-full" />
                        <span className="text-white text-lg font-dancing-script">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-8 border border-white/20">
                  <h3 className="text-3xl font-bold text-white mb-6 font-dancing-script">
                    Thống kê quan trọng
                  </h3>
                  <div className="grid grid-cols-1 gap-6">
                    {practiceTopics[6].statistics.map((stat, idx) => (
                      <div key={idx} className="text-center p-4 bg-white/5 rounded-xl">
                        <div className="text-4xl font-bold text-emerald-200/90 mb-2">{stat.value}</div>
                        <div className="text-white/80 text-lg font-dancing-script">{stat.label}</div>
                        <div className="text-white/60 text-sm font-dancing-script">{stat.description}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Content */}
              <div className="space-y-8">
                <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-8 border border-white/20">
                  <h3 className="text-3xl font-bold text-white mb-6 font-dancing-script">
                    Nội dung chính
                  </h3>
                  <p className="text-white/90 text-lg leading-relaxed font-dancing-script mb-6">
                    {practiceTopics[6].content}
                  </p>
                  
                  <div className="space-y-4">
                    <h4 className="text-xl font-semibold text-white font-dancing-script">Ví dụ thực tế:</h4>
                    {practiceTopics[6].examples.map((example, idx) => (
                      <div key={idx} className="flex items-center gap-3 p-3 bg-white/5 rounded-lg">
                        <div className="w-2 h-2 bg-emerald-300/70 rounded-full" />
                        <span className="text-white/90 font-dancing-script">{example}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="relative">
                  <img
                    src={practiceTopics[6].image}
                    alt={practiceTopics[6].title}
                    className="w-full h-64 object-cover rounded-2xl shadow-2xl"
                    style={{
                      transformStyle: "preserve-3d",
                      perspective: "1000px",
                      willChange: "transform, opacity, filter"
                    }}
                  />
                  <motion.div
                    className="absolute inset-0 rounded-2xl bg-gradient-to-t from-black/30 to-transparent"
                    animate={{ opacity: [0.2, 0.4, 0.2] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  />
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
