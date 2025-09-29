import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { 
  GlobeAltIcon,
  HeartIcon,
  UserGroupIcon,
  AcademicCapIcon
} from "@heroicons/react/24/outline";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

export default function RevolutionSection() {
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Hero section animation
    if (heroRef.current) {
      gsap.fromTo(heroRef.current, 
        { opacity: 0, y: 30, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 1.2, ease: "power2.out" }
      );
    }

    // Sections animation
    const sectionElements = sectionRefs.current.filter(Boolean);
    
    sectionElements.forEach((section, index) => {
      if (section) {
        gsap.fromTo(section, {
          opacity: 0,
          y: 30, // Reduced movement
          scale: 0.98 // Reduced scale change
        }, {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8, // Reduced duration
          delay: index * 0.1, // Reduced stagger delay
          ease: "power1.out", // Simpler easing
          scrollTrigger: {
            trigger: section,
            start: "top 90%", // Optimized trigger
            end: "bottom 10%",
            toggleActions: "play none none reverse"
          }
        });
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
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-white/20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -50, 0],
              x: [0, Math.random() * 30 - 15, 0],
              opacity: [0.2, 0.8, 0.2],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 4 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 3,
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
          background: "linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(240, 240, 240, 0.1) 100%)"
        }}
      >
        <div className="text-center max-w-6xl mx-auto px-8">
          <motion.h1
            className="text-7xl md:text-9xl font-bold mb-8 font-dancing-script"
            animate={{
              textShadow: [
                "0 0 20px rgba(255, 255, 255, 0.3)",
                "0 0 40px rgba(255, 255, 255, 0.5)",
                "0 0 20px rgba(255, 255, 255, 0.3)"
              ]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            2. CÁCH MẠNG XÃ HỘI
          </motion.h1>
          <motion.p
            className="text-2xl text-white/90 font-dancing-script"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
          >
            Khám phá những cuộc cách mạng làm thay đổi lịch sử nhân loại
          </motion.p>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="relative">
        {/* Section 1: Khái niệm cách mạng xã hội */}
        <motion.div
          ref={(el) => { sectionRefs.current[0] = el; }}
          className="min-h-screen flex items-center justify-center py-20 px-8"
          style={{
            background: "linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(240, 240, 240, 0.05) 100%)"
          }}
        >
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <div className="text-center mb-8">
                <motion.h2 
                  className="text-6xl font-bold text-gray-800 font-dancing-script"
                  animate={{
                    scale: [1, 1.02, 1]
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  1. Khái niệm
                </motion.h2>
              </div>
              <div className="w-32 h-1 bg-gray-800 mx-auto rounded-full"></div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Card: Định nghĩa chung */}
              <motion.div
                className="bg-gradient-to-br from-white/10 to-white/5 rounded-3xl p-8 border border-white/20 backdrop-blur-sm shadow-lg"
                whileHover={{
                  scale: 1.05,
                  rotateY: 8,
                  rotateX: 4,
                  boxShadow: "0 30px 60px rgba(0,0,0,0.3)",
                  transition: { duration: 0.4, ease: "easeOut" }
                }}
                style={{ 
                  transformStyle: "preserve-3d",
                  perspective: "1000px"
                }}
                transition={{ duration: 0.4 }}
              >
                <div className="mb-6">
                  <motion.h3 
                    className="text-3xl font-bold text-gray-800 font-dancing-script"
                    animate={{
                      scale: [1, 1.02, 1]
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    Định nghĩa chung
                  </motion.h3>
                </div>
                
                <div className="space-y-6">
                  <div className="bg-gradient-to-r from-white/10 to-white/5 rounded-2xl p-6 border-l-4 border-amber-700">
                    <p className="text-white/90 leading-relaxed">
                      Cách mạng xã hội là sự thay đổi căn bản, toàn diện về chất trong mọi lĩnh vực đời sống xã hội.
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Card: Nghĩa hẹp */}
              <motion.div
                className="bg-gradient-to-br from-white/10 to-white/5 rounded-3xl p-8 border border-white/20 backdrop-blur-sm shadow-lg"
                whileHover={{
                  scale: 1.05,
                  rotateY: 8,
                  rotateX: 4,
                  boxShadow: "0 30px 60px rgba(0,0,0,0.3)",
                  transition: { duration: 0.4, ease: "easeOut" }
                }}
                style={{ 
                  transformStyle: "preserve-3d",
                  perspective: "1000px"
                }}
                transition={{ duration: 0.4 }}
              >
                <div className="mb-6">
                  <motion.h3 
                    className="text-3xl font-bold text-gray-800 font-dancing-script"
                    animate={{
                      scale: [1, 1.02, 1]
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    Nghĩa hẹp
                  </motion.h3>
                </div>
                
                <div className="space-y-6">
                  <div className="bg-gradient-to-r from-white/10 to-white/5 rounded-2xl p-6 border-l-4 border-amber-700">
                    <p className="text-white/90 leading-relaxed">
                      Đó là cuộc đấu tranh nhằm lật đổ chính quyền cũ và thiết lập một chính quyền mới tiến bộ hơn.
                    </p>
                    <p className="text-white/90 leading-relaxed mt-4">
                      <span className="text-amber-300 font-bold">⟹</span> Thường là đỉnh cao của đấu tranh giai cấp.
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Section 2: Nguyên nhân */}
        <motion.div
          ref={(el) => { sectionRefs.current[1] = el; }}
          className="min-h-screen flex items-center justify-center py-20 px-8"
          style={{
            background: "linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(240, 240, 240, 0.05) 100%)"
          }}
        >
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <div className="text-center mb-8">
                <motion.h2 
                  className="text-6xl font-bold text-gray-800 font-dancing-script"
                  animate={{
                    scale: [1, 1.02, 1]
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  2. Nguyên nhân
                </motion.h2>
              </div>
              <div className="w-32 h-1 bg-gray-800 mx-auto rounded-full"></div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Card: Nguyên nhân khách quan */}
              <motion.div
                className="bg-gradient-to-br from-white/10 to-white/5 rounded-3xl p-8 border border-white/20 backdrop-blur-sm shadow-lg"
                whileHover={{
                  scale: 1.05,
                  rotateY: 8,
                  rotateX: 4,
                  boxShadow: "0 30px 60px rgba(0,0,0,0.3)",
                  transition: { duration: 0.4, ease: "easeOut" }
                }}
                style={{ 
                  transformStyle: "preserve-3d",
                  perspective: "1000px"
                }}
                transition={{ duration: 0.4 }}
              >
                <div className="mb-6">
                  <motion.h3 
                    className="text-3xl font-bold text-gray-800 font-dancing-script"
                    animate={{
                      scale: [1, 1.02, 1]
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    Khách quan
                  </motion.h3>
                </div>
                
                <div className="space-y-6">
                  <div className="bg-gradient-to-r from-white/10 to-white/5 rounded-2xl p-6 border-l-4 border-amber-700">
                    <p className="text-white/90 leading-relaxed">
                      Mâu thuẫn gay gắt giữa lực lượng sản xuất phát triển với quan hệ sản xuất lạc hậu kìm hãm.
                    </p>
                    <p className="text-white/90 leading-relaxed mt-4">
                      Mâu thuẫn đó biểu hiện về mặt chính trị - xã hội thành cuộc đấu tranh giai cấp, tất yếu dẫn đến sự bùng nổ Cách Mạng.
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Card: Nguyên nhân chủ quan */}
              <motion.div
                className="bg-gradient-to-br from-white/10 to-white/5 rounded-3xl p-8 border border-white/20 backdrop-blur-sm shadow-lg"
                whileHover={{
                  scale: 1.05,
                  rotateY: 8,
                  rotateX: 4,
                  boxShadow: "0 30px 60px rgba(0,0,0,0.3)",
                  transition: { duration: 0.4, ease: "easeOut" }
                }}
                style={{ 
                  transformStyle: "preserve-3d",
                  perspective: "1000px"
                }}
                transition={{ duration: 0.4 }}
              >
                <div className="mb-6">
                  <motion.h3 
                    className="text-3xl font-bold text-gray-800 font-dancing-script"
                    animate={{
                      scale: [1, 1.02, 1]
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    Chủ quan
                  </motion.h3>
                </div>
                
                <div className="space-y-6">
                  <div className="bg-gradient-to-r from-white/10 to-white/5 rounded-2xl p-6 border-l-4 border-amber-700">
                    <p className="text-white/90 leading-relaxed">
                      Nhận thức, ý chí và tổ chức của giai cấp đại biểu cho phương thức sản xuất mới tiến bộ hơn.
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Ví dụ lịch sử */}
            <div className="mt-16">
              <div className="text-center mb-12">
                <motion.h3 
                  className="text-4xl font-bold text-gray-800 font-dancing-script"
                  animate={{
                    scale: [1, 1.02, 1]
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  Ví dụ lịch sử
                </motion.h3>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Cách mạng tư sản Pháp */}
                <motion.div
                  className="bg-gradient-to-br from-white/10 to-white/5 rounded-3xl p-8 border border-white/20 backdrop-blur-sm shadow-lg"
                  whileHover={{
                    scale: 1.05,
                    rotateY: 8,
                    rotateX: 4,
                    boxShadow: "0 30px 60px rgba(0,0,0,0.3)",
                    transition: { duration: 0.4, ease: "easeOut" }
                  }}
                  style={{ 
                    transformStyle: "preserve-3d",
                    perspective: "1000px"
                  }}
                  transition={{ duration: 0.4 }}
                >
                  <div className="mb-6">
                    <motion.h4 
                      className="text-2xl font-bold text-gray-800 font-dancing-script"
                      animate={{
                        scale: [1, 1.02, 1]
                      }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    >
                      Cách mạng tư sản Pháp 1789
                    </motion.h4>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="bg-gradient-to-r from-white/10 to-white/5 rounded-2xl p-6 border-l-4 border-amber-700">
                      <p className="text-white/90 leading-relaxed">
                        Trong thế kỷ XVIII, lực lượng sản xuất ở Pháp (thủ công nghiệp, thương nghiệp, giai cấp tư sản) phát triển mạnh mẽ, nhưng bị kìm hãm bởi chế độ phong kiến lạc hậu.
                      </p>
                    </div>
                    
                    <div className="bg-gradient-to-r from-white/10 to-white/5 rounded-2xl p-6 border-l-4 border-amber-700">
                      <p className="text-white/90 leading-relaxed">
                        Mâu thuẫn giữa giai cấp tư sản tiến bộ và tầng lớp quý tộc phong kiến trở nên gay gắt, dẫn đến sự bùng nổ của Cách mạng tư sản Pháp.
                      </p>
                    </div>

                    <div className="bg-gradient-to-r from-white/10 to-white/5 rounded-2xl p-6 border-l-4 border-amber-700">
                      <p className="text-white/90 leading-relaxed">
                        Sự kiện tấn công ngục Bastille ngày 14/7/1789 đã trở thành biểu tượng, đánh dấu sự xóa bỏ chế độ quân chủ chuyên chế và mở đường cho xã hội tư bản chủ nghĩa.
                      </p>
                    </div>
                  </div>
                </motion.div>

                {/* Cách mạng Tháng Mười Nga */}
                <motion.div
                  className="bg-gradient-to-br from-white/10 to-white/5 rounded-3xl p-8 border border-white/20 backdrop-blur-sm shadow-lg"
                  whileHover={{
                    scale: 1.05,
                    rotateY: 8,
                    rotateX: 4,
                    boxShadow: "0 30px 60px rgba(0,0,0,0.3)",
                    transition: { duration: 0.4, ease: "easeOut" }
                  }}
                  style={{ 
                    transformStyle: "preserve-3d",
                    perspective: "1000px"
                  }}
                  transition={{ duration: 0.4 }}
                >
                  <div className="mb-6">
                    <motion.h4 
                      className="text-2xl font-bold text-gray-800 font-dancing-script"
                      animate={{
                        scale: [1, 1.02, 1]
                      }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    >
                      Cách mạng Tháng Mười Nga 1917
                    </motion.h4>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="bg-gradient-to-r from-white/10 to-white/5 rounded-2xl p-6 border-l-4 border-amber-700">
                      <p className="text-white/90 leading-relaxed">
                        Vào đầu thế kỷ XX, ở nước Nga, lực lượng sản xuất (công nhân, nông dân) đòi hỏi hòa bình, ruộng đất và quyền lợi dân sinh, nhưng bị kìm hãm bởi quan hệ sản xuất lạc hậu của chế độ Nga hoàng và giai cấp địa chủ.
                      </p>
                    </div>
                    
                    <div className="bg-gradient-to-r from-white/10 to-white/5 rounded-2xl p-6 border-l-4 border-amber-700">
                      <p className="text-white/90 leading-relaxed">
                        Dưới sự lãnh đạo của Đảng Bolshevik, Cách mạng Tháng Mười bùng nổ, dẫn đến sự ra đời của Nhà nước Xô viết – nhà nước vô sản đầu tiên trong lịch sử nhân loại.
                      </p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Section 3: Các yếu tố cơ bản */}
        <motion.div
          ref={(el) => { sectionRefs.current[2] = el; }}
          className="min-h-screen flex items-center justify-center py-20 px-8"
          style={{
            background: "linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(240, 240, 240, 0.05) 100%)"
          }}
        >
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <div className="text-center mb-8">
                <motion.h2 
                  className="text-6xl font-bold text-gray-800 font-dancing-script"
                  animate={{
                    scale: [1, 1.02, 1]
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  3. Các yếu tố cơ bản
                </motion.h2>
              </div>
              <div className="w-32 h-1 bg-gray-800 mx-auto rounded-full"></div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
              {/* Tính chất */}
              <motion.div
                className="bg-gradient-to-br from-white/10 to-white/5 rounded-3xl p-8 border border-white/20 backdrop-blur-sm shadow-lg"
                whileHover={{
                  scale: 1.05,
                  rotateY: 8,
                  rotateX: 4,
                  boxShadow: "0 30px 60px rgba(0,0,0,0.3)",
                  transition: { duration: 0.4, ease: "easeOut" }
                }}
                style={{ 
                  transformStyle: "preserve-3d",
                  perspective: "1000px"
                }}
                transition={{ duration: 0.4 }}
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-600 to-blue-700 flex items-center justify-center">
                    <GlobeAltIcon className="w-6 h-6 text-blue-100" />
                  </div>
                  <motion.h3 
                    className="text-xl font-bold text-white"
                    animate={{
                      textShadow: [
                        "0 0 8px rgba(59, 130, 246, 0.3)",
                        "0 0 16px rgba(59, 130, 246, 0.5)",
                        "0 0 8px rgba(59, 130, 246, 0.3)"
                      ]
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    Tính chất
                  </motion.h3>
                </div>
                <p className="text-white/90 leading-relaxed">
                  Do mâu thuẫn giai cấp quy định.
                </p>
              </motion.div>

              {/* Lực lượng */}
              <motion.div
                className="bg-gradient-to-br from-white/10 to-white/5 rounded-3xl p-8 border border-white/20 backdrop-blur-sm shadow-lg"
                whileHover={{
                  scale: 1.05,
                  rotateY: 8,
                  rotateX: 4,
                  boxShadow: "0 30px 60px rgba(0,0,0,0.3)",
                  transition: { duration: 0.4, ease: "easeOut" }
                }}
                style={{ 
                  transformStyle: "preserve-3d",
                  perspective: "1000px"
                }}
                transition={{ duration: 0.4 }}
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-emerald-600 to-emerald-700 flex items-center justify-center">
                    <UserGroupIcon className="w-6 h-6 text-emerald-100" />
                  </div>
                  <motion.h3 
                    className="text-xl font-bold text-white"
                    animate={{
                      textShadow: [
                        "0 0 8px rgba(16, 185, 129, 0.3)",
                        "0 0 16px rgba(16, 185, 129, 0.5)",
                        "0 0 8px rgba(16, 185, 129, 0.3)"
                      ]
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    Lực lượng
                  </motion.h3>
                </div>
                <p className="text-white/90 leading-relaxed">
                  Giai cấp, tầng lớp, quần chúng có lợi ích gắn với cách mạng.
                </p>
              </motion.div>

              {/* Động lực */}
              <motion.div
                className="bg-gradient-to-br from-white/10 to-white/5 rounded-3xl p-8 border border-white/20 backdrop-blur-sm shadow-lg"
                whileHover={{
                  scale: 1.05,
                  rotateY: 8,
                  rotateX: 4,
                  boxShadow: "0 30px 60px rgba(0,0,0,0.3)",
                  transition: { duration: 0.4, ease: "easeOut" }
                }}
                style={{ 
                  transformStyle: "preserve-3d",
                  perspective: "1000px"
                }}
                transition={{ duration: 0.4 }}
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-amber-600 to-amber-700 flex items-center justify-center">
                    <HeartIcon className="w-6 h-6 text-amber-100" />
                  </div>
                  <motion.h3 
                    className="text-xl font-bold text-white"
                    animate={{
                      textShadow: [
                        "0 0 8px rgba(245, 158, 11, 0.3)",
                        "0 0 16px rgba(245, 158, 11, 0.5)",
                        "0 0 8px rgba(245, 158, 11, 0.3)"
                      ]
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    Động lực
                  </motion.h3>
                </div>
                <p className="text-white/90 leading-relaxed">
                  Các giai cấp có lợi ích lâu dài gắn bó với cách mạng.
                </p>
              </motion.div>

              {/* Đối tượng */}
              <motion.div
                className="bg-gradient-to-br from-white/10 to-white/5 rounded-3xl p-8 border border-white/20 backdrop-blur-sm shadow-lg"
                whileHover={{
                  scale: 1.05,
                  rotateY: 8,
                  rotateX: 4,
                  boxShadow: "0 30px 60px rgba(0,0,0,0.3)",
                  transition: { duration: 0.4, ease: "easeOut" }
                }}
                style={{ 
                  transformStyle: "preserve-3d",
                  perspective: "1000px"
                }}
                transition={{ duration: 0.4 }}
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-600 to-purple-700 flex items-center justify-center">
                    <AcademicCapIcon className="w-6 h-6 text-purple-100" />
                  </div>
                  <motion.h3 
                    className="text-xl font-bold text-white"
                    animate={{
                      textShadow: [
                        "0 0 8px rgba(147, 51, 234, 0.3)",
                        "0 0 16px rgba(147, 51, 234, 0.5)",
                        "0 0 8px rgba(147, 51, 234, 0.3)"
                      ]
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    Đối tượng
                  </motion.h3>
                </div>
                <p className="text-white/90 leading-relaxed">
                  Giai cấp, chế độ xã hội bị lật đổ.
                </p>
              </motion.div>

              {/* Giai cấp lãnh đạo */}
              <motion.div
                className="bg-gradient-to-br from-white/10 to-white/5 rounded-3xl p-8 border border-white/20 backdrop-blur-sm shadow-lg lg:col-span-2 xl:col-span-1"
                whileHover={{
                  scale: 1.05,
                  rotateY: 8,
                  rotateX: 4,
                  boxShadow: "0 30px 60px rgba(0,0,0,0.3)",
                  transition: { duration: 0.4, ease: "easeOut" }
                }}
                style={{ 
                  transformStyle: "preserve-3d",
                  perspective: "1000px"
                }}
                transition={{ duration: 0.4 }}
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-rose-600 to-rose-700 flex items-center justify-center">
                    <HeartIcon className="w-6 h-6 text-rose-100" />
                  </div>
                  <motion.h3 
                    className="text-xl font-bold text-white"
                    animate={{
                      textShadow: [
                        "0 0 8px rgba(244, 63, 94, 0.3)",
                        "0 0 16px rgba(244, 63, 94, 0.5)",
                        "0 0 8px rgba(244, 63, 94, 0.3)"
                      ]
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    Giai cấp lãnh đạo
                  </motion.h3>
                </div>
                <p className="text-white/90 leading-relaxed">
                  Giai cấp đại diện cho xu hướng tiến bộ của xã hội.
                </p>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Section 4: Điều kiện để cách mạng xã hội xảy ra */}
        <motion.div
          ref={(el) => { sectionRefs.current[3] = el; }}
          className="min-h-screen flex items-center justify-center py-20 px-8"
          style={{
            background: "linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(240, 240, 240, 0.05) 100%)"
          }}
        >
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <div className="text-center mb-8">
                <motion.h2 
                  className="text-6xl font-bold text-gray-800 font-dancing-script"
                  animate={{
                    scale: [1, 1.02, 1]
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  4. Điều kiện để cách mạng xã hội xảy ra
                </motion.h2>
              </div>
              <div className="w-32 h-1 bg-gray-800 mx-auto rounded-full"></div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Điều kiện kinh tế - chính trị - xã hội */}
              <motion.div
                className="bg-gradient-to-br from-white/10 to-white/5 rounded-3xl p-8 border border-white/20 backdrop-blur-sm shadow-lg"
                whileHover={{
                  scale: 1.05,
                  rotateY: 8,
                  rotateX: 4,
                  boxShadow: "0 30px 60px rgba(0,0,0,0.3)",
                  transition: { duration: 0.4, ease: "easeOut" }
                }}
                style={{ 
                  transformStyle: "preserve-3d",
                  perspective: "1000px"
                }}
                transition={{ duration: 0.4 }}
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-600 to-blue-700 flex items-center justify-center">
                    <GlobeAltIcon className="w-6 h-6 text-blue-100" />
                  </div>
                  <motion.h3 
                    className="text-xl font-bold text-white"
                    animate={{
                      textShadow: [
                        "0 0 8px rgba(59, 130, 246, 0.3)",
                        "0 0 16px rgba(59, 130, 246, 0.5)",
                        "0 0 8px rgba(59, 130, 246, 0.3)"
                      ]
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    Điều kiện chín muồi
                  </motion.h3>
                </div>
                <p className="text-white/90 leading-relaxed">
                  Điều kiện kinh tế – chính trị – xã hội chín muồi.
                </p>
              </motion.div>

              {/* Nhân tố chủ quan */}
              <motion.div
                className="bg-gradient-to-br from-white/10 to-white/5 rounded-3xl p-8 border border-white/20 backdrop-blur-sm shadow-lg"
                whileHover={{
                  scale: 1.05,
                  rotateY: 8,
                  rotateX: 4,
                  boxShadow: "0 30px 60px rgba(0,0,0,0.3)",
                  transition: { duration: 0.4, ease: "easeOut" }
                }}
                style={{ 
                  transformStyle: "preserve-3d",
                  perspective: "1000px"
                }}
                transition={{ duration: 0.4 }}
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-emerald-600 to-emerald-700 flex items-center justify-center">
                    <HeartIcon className="w-6 h-6 text-emerald-100" />
                  </div>
                  <motion.h3 
                    className="text-xl font-bold text-white"
                    animate={{
                      textShadow: [
                        "0 0 8px rgba(16, 185, 129, 0.3)",
                        "0 0 16px rgba(16, 185, 129, 0.5)",
                        "0 0 8px rgba(16, 185, 129, 0.3)"
                      ]
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    Nhân tố chủ quan
                  </motion.h3>
                </div>
                <p className="text-white/90 leading-relaxed">
                  Có nhân tố chủ quan (ý chí, năng lực tổ chức, lãnh đạo).
                </p>
              </motion.div>

              {/* Thời cơ cách mạng */}
              <motion.div
                className="bg-gradient-to-br from-white/10 to-white/5 rounded-3xl p-8 border border-white/20 backdrop-blur-sm shadow-lg"
                whileHover={{
                  scale: 1.05,
                  rotateY: 8,
                  rotateX: 4,
                  boxShadow: "0 30px 60px rgba(0,0,0,0.3)",
                  transition: { duration: 0.4, ease: "easeOut" }
                }}
                style={{ 
                  transformStyle: "preserve-3d",
                  perspective: "1000px"
                }}
                transition={{ duration: 0.4 }}
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-amber-600 to-amber-700 flex items-center justify-center">
                    <UserGroupIcon className="w-6 h-6 text-amber-100" />
                  </div>
                  <motion.h3 
                    className="text-xl font-bold text-white"
                    animate={{
                      textShadow: [
                        "0 0 8px rgba(245, 158, 11, 0.3)",
                        "0 0 16px rgba(245, 158, 11, 0.5)",
                        "0 0 8px rgba(245, 158, 11, 0.3)"
                      ]
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    Thời cơ cách mạng
                  </motion.h3>
                </div>
                <p className="text-white/90 leading-relaxed">
                  Có thời cơ cách mạng thích hợp.
                </p>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Section 5: Phương pháp tiến hành */}
        <motion.div
          ref={(el) => { sectionRefs.current[4] = el; }}
          className="min-h-screen flex items-center justify-center py-20 px-8"
          style={{
            background: "linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(240, 240, 240, 0.05) 100%)"
          }}
        >
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <div className="text-center mb-8">
                <motion.h2 
                  className="text-6xl font-bold text-gray-800 font-dancing-script"
                  animate={{
                    scale: [1, 1.02, 1]
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  5. Phương pháp tiến hành
                </motion.h2>
              </div>
              <div className="w-32 h-1 bg-gray-800 mx-auto rounded-full"></div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Bạo lực cách mạng */}
              <motion.div
                className="bg-gradient-to-br from-white/10 to-white/5 rounded-3xl p-8 border border-white/20 backdrop-blur-sm shadow-lg"
                whileHover={{
                  scale: 1.05,
                  rotateY: 8,
                  rotateX: 4,
                  boxShadow: "0 30px 60px rgba(0,0,0,0.3)",
                  transition: { duration: 0.4, ease: "easeOut" }
                }}
                style={{ 
                  transformStyle: "preserve-3d",
                  perspective: "1000px"
                }}
                transition={{ duration: 0.4 }}
              >
                <div className="mb-6">
                  <motion.h3 
                    className="text-3xl font-bold text-gray-800 font-dancing-script"
                    animate={{
                      scale: [1, 1.02, 1]
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    Bạo lực cách mạng
                  </motion.h3>
                </div>
                
                <div className="space-y-6">
                  <div className="bg-gradient-to-r from-white/10 to-white/5 rounded-2xl p-6 border-l-4 border-amber-700">
                    <p className="text-white/90 leading-relaxed">
                      Dùng sức mạnh lật đổ bộ máy nhà nước cũ, thiết lập nhà nước mới.
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Hòa bình */}
              <motion.div
                className="bg-gradient-to-br from-white/10 to-white/5 rounded-3xl p-8 border border-white/20 backdrop-blur-sm shadow-lg"
                whileHover={{
                  scale: 1.05,
                  rotateY: 8,
                  rotateX: 4,
                  boxShadow: "0 30px 60px rgba(0,0,0,0.3)",
                  transition: { duration: 0.4, ease: "easeOut" }
                }}
                style={{ 
                  transformStyle: "preserve-3d",
                  perspective: "1000px"
                }}
                transition={{ duration: 0.4 }}
              >
                <div className="mb-6">
                  <motion.h3 
                    className="text-3xl font-bold text-gray-800 font-dancing-script"
                    animate={{
                      scale: [1, 1.02, 1]
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    Hòa bình
                  </motion.h3>
                </div>
                
                <div className="space-y-6">
                  <div className="bg-gradient-to-r from-white/10 to-white/5 rounded-2xl p-6 border-l-4 border-amber-700">
                    <p className="text-white/90 leading-relaxed">
                      Giành chính quyền bằng đấu tranh nghị trường, bầu cử dân chủ… (trong điều kiện cho phép).
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Section 6: Xu hướng và mục tiêu hiện nay */}
        <motion.div
          ref={(el) => { sectionRefs.current[5] = el; }}
          className="min-h-screen flex items-center justify-center py-20 px-8"
          style={{
            background: "linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(240, 240, 240, 0.05) 100%)"
          }}
        >
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <div className="text-center mb-8">
                <motion.h2 
                  className="text-6xl font-bold text-gray-800 font-dancing-script"
                  animate={{
                    scale: [1, 1.02, 1]
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  6. Xu hướng và mục tiêu hiện nay
                </motion.h2>
              </div>
              <div className="w-32 h-1 bg-gray-800 mx-auto rounded-full"></div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Chuyển hóa dần dần */}
              <motion.div
                className="bg-gradient-to-br from-white/10 to-white/5 rounded-3xl p-8 border border-white/20 backdrop-blur-sm shadow-lg"
                whileHover={{
                  scale: 1.05,
                  rotateY: 8,
                  rotateX: 4,
                  boxShadow: "0 30px 60px rgba(0,0,0,0.3)",
                  transition: { duration: 0.4, ease: "easeOut" }
                }}
                style={{ 
                  transformStyle: "preserve-3d",
                  perspective: "1000px"
                }}
                transition={{ duration: 0.4 }}
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-600 to-blue-700 flex items-center justify-center">
                    <GlobeAltIcon className="w-6 h-6 text-blue-100" />
                  </div>
                  <motion.h3 
                    className="text-xl font-bold text-white"
                    animate={{
                      textShadow: [
                        "0 0 8px rgba(59, 130, 246, 0.3)",
                        "0 0 16px rgba(59, 130, 246, 0.5)",
                        "0 0 8px rgba(59, 130, 246, 0.3)"
                      ]
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    Chuyển hóa dần dần
                  </motion.h3>
                </div>
                <p className="text-white/90 leading-relaxed">
                  Cách mạng xã hội ngày nay có thể diễn ra cả bằng chuyển hóa dần dần từ xã hội cũ sang xã hội mới.
                </p>
              </motion.div>

              {/* Xu hướng */}
              <motion.div
                className="bg-gradient-to-br from-white/10 to-white/5 rounded-3xl p-8 border border-white/20 backdrop-blur-sm shadow-lg"
                whileHover={{
                  scale: 1.05,
                  rotateY: 8,
                  rotateX: 4,
                  boxShadow: "0 30px 60px rgba(0,0,0,0.3)",
                  transition: { duration: 0.4, ease: "easeOut" }
                }}
                style={{ 
                  transformStyle: "preserve-3d",
                  perspective: "1000px"
                }}
                transition={{ duration: 0.4 }}
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-emerald-600 to-emerald-700 flex items-center justify-center">
                    <HeartIcon className="w-6 h-6 text-emerald-100" />
                  </div>
                  <motion.h3 
                    className="text-xl font-bold text-white"
                    animate={{
                      textShadow: [
                        "0 0 8px rgba(16, 185, 129, 0.3)",
                        "0 0 16px rgba(16, 185, 129, 0.5)",
                        "0 0 8px rgba(16, 185, 129, 0.3)"
                      ]
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    Xu hướng
                  </motion.h3>
                </div>
                <p className="text-white/90 leading-relaxed">
                  Giữ vững độc lập dân tộc, đấu tranh cho dân chủ, hòa bình, tiến bộ xã hội.
                </p>
              </motion.div>

              {/* Mục tiêu Việt Nam */}
              <motion.div
                className="bg-gradient-to-br from-white/10 to-white/5 rounded-3xl p-8 border border-white/20 backdrop-blur-sm shadow-lg"
                whileHover={{
                  scale: 1.05,
                  rotateY: 8,
                  rotateX: 4,
                  boxShadow: "0 30px 60px rgba(0,0,0,0.3)",
                  transition: { duration: 0.4, ease: "easeOut" }
                }}
                style={{ 
                  transformStyle: "preserve-3d",
                  perspective: "1000px"
                }}
                transition={{ duration: 0.4 }}
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-amber-600 to-amber-700 flex items-center justify-center">
                    <UserGroupIcon className="w-6 h-6 text-amber-100" />
                  </div>
                  <motion.h3 
                    className="text-xl font-bold text-white"
                    animate={{
                      textShadow: [
                        "0 0 8px rgba(245, 158, 11, 0.3)",
                        "0 0 16px rgba(245, 158, 11, 0.5)",
                        "0 0 8px rgba(245, 158, 11, 0.3)"
                      ]
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    Mục tiêu Việt Nam
                  </motion.h3>
                </div>
                <p className="text-white/90 leading-relaxed">
                  Dân giàu, nước mạnh, xã hội công bằng, dân chủ, văn minh.
                </p>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
