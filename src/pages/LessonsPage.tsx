import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { 
  ShieldCheckIcon,
  GlobeAltIcon,
  BuildingOfficeIcon,
  HeartIcon
} from "@heroicons/react/24/outline";
import RevolutionSection from "../components/RevolutionSection";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

export default function LessonsPage() {
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // ScrollTrigger works with Lenis automatically
    
    // Hero section animation - Simplified
    if (heroRef.current) {
      gsap.fromTo(heroRef.current, 
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power1.out" }
      );
    }

    // Optimized animation using GSAP Timeline
    const sectionElements = sectionRefs.current.filter(Boolean);
    
    sectionElements.forEach((section) => {
      if (section) {
        // Create timeline for each section
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top 95%",
            end: "bottom 5%",
            toggleActions: "play none none reverse",
            fastScrollEnd: true,
            refreshPriority: -1,
            // Lenis integration
            onUpdate: (self) => {
              if (self.progress > 0.1) {
                section.style.willChange = 'auto';
              }
            }
          }
        });

        // Add animation to timeline
        tl.fromTo(section, {
          opacity: 0,
          y: 10
        }, {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: "power1.out"
        });
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div className="min-h-screen relative overflow-hidden z-100">
      {/* Floating Particles Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1.5 h-1.5 bg-white/10 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -20, 0],
              x: [0, Math.random() * 15 - 7.5, 0],
              opacity: [0.1, 0.6, 0.1],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 4 + Math.random() * 2,
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
            transition={{ duration: 3, repeat: Infinity }}
            style={{
              background: "linear-gradient(135deg, #f59e0b, #d97706, #b45309)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent"
            }}
          >
            CHƯƠNG 3
          </motion.h1>
          <motion.h2
            className="text-4xl md:text-6xl font-bold mb-6 p-2 font-dancing-script"
            style={{
              background: "linear-gradient(135deg, #f59e0b, #d97706, #b45309)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent"
            }}
          >
            NHÀ NƯỚC VÀ CÁCH MẠNG XÃ HỘI
          </motion.h2>
          <motion.p
            className="text-2xl text-white/90 font-dancing-script"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
          >
            Khám phá bản chất và vai trò của nhà nước trong xã hội
          </motion.p>
        </div>
      </motion.div>

      {/* Main Content - Seamless Design */}
      <div className="relative">
        {/* Section 1: Nhà nước - Nguồn gốc */}
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
                  className="text-7xl md:text-9xl font-bold font-dancing-script text-gray-800"
                  animate={{
                    scale: [1, 1.02, 1]
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  1. NHÀ NƯỚC
                </motion.h2>
              </div>
              <div className="w-32 h-1 bg-gray-800 mx-auto rounded-full"></div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Nguồn gốc */}
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
                    a. Nguồn gốc
                  </motion.h3>
                </div>
                
                <div className="space-y-6">
                  <div className="bg-gradient-to-r from-white/10 to-white/5 rounded-2xl p-6 border-l-4 border-amber-700">
                    <h4 className="text-xl font-semibold text-white mb-4">Xã hội cộng sản nguyên thủy:</h4>
                    <p className="text-white/90 leading-relaxed">
                      Chưa có của dư thừa, chưa có tư hữu, chưa có giai cấp <span className="text-amber-300 font-bold">⟹</span> chưa có nhà nước.
                    </p>
                  </div>

                  <div className="bg-gradient-to-r from-white/10 to-white/5 rounded-2xl p-6 border-l-4 border-amber-700">
                    <h4 className="text-xl font-semibold text-white mb-4">Khi lực lượng sản xuất phát triển:</h4>
                    <p className="text-white/90 leading-relaxed">
                      Xuất hiện của cải dư thừa, chế độ tư hữu ra đời <span className="text-amber-300 font-bold">⟹</span> giai cấp hình thành, mâu thuẫn giai cấp không thể điều hòa <span className="text-amber-300 font-bold">⟹</span> nhà nước xuất hiện để duy trì trật tự và bảo vệ lợi ích giai cấp thống trị.
                    </p>
                  </div>

                  <div className="bg-gradient-to-r from-white/10 to-white/5 rounded-2xl p-6 border-l-4 border-amber-700">
                    <h4 className="text-xl font-semibold text-white mb-4">Quá trình lịch sử:</h4>
                    <div className="space-y-3">
                      <p className="text-white/90 leading-relaxed">
                        <span className="text-amber-300 font-bold">1.</span> Thời kỳ đồ đá cũ: Con người sống theo bầy đàn, săn bắt hái lượm
                      </p>
                      <p className="text-white/90 leading-relaxed">
                        <span className="text-amber-300 font-bold">2.</span> Thời kỳ đồ đá mới: Nông nghiệp xuất hiện, định cư, hình thành thị tộc
                      </p>
                      <p className="text-white/90 leading-relaxed">
                        <span className="text-amber-300 font-bold">3.</span> Thời kỳ kim khí: Công cụ kim loại, năng suất lao động tăng, xuất hiện của cải dư thừa
                      </p>
                      <p className="text-white/90 leading-relaxed">
                        <span className="text-amber-300 font-bold">4.</span> Chế độ tư hữu ra đời <span className="text-amber-300 font-bold">⟹</span> giai cấp hình thành <span className="text-amber-300 font-bold">⟹</span> nhà nước xuất hiện
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Bản chất */}
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
                    b. Bản chất
                  </motion.h3>
                </div>
                
                <div className="space-y-6">
                  <div className="bg-gradient-to-r from-white/10 to-white/5 rounded-2xl p-6 border-l-4 border-amber-700">
                    <p className="text-white/90 leading-relaxed mb-4">
                      Nhà nước là một tổ chức chính trị của giai cấp thống trị về kinh tế, dùng để bảo vệ trật tự hiện hành, đàn áp sự phản kháng của các giai cấp khác.
                    </p>
                  </div>

                  <div className="bg-gradient-to-r from-white/10 to-white/5 rounded-2xl p-6 border-l-4 border-amber-700">
                    <blockquote className="text-white/90 italic leading-relaxed">
                      "Theo Mác, nhà nước là một cơ quan thống trị giai cấp, là một cơ quan bạo lực của một giai cấp này đối với một giai cấp khác; đó là sự kiện lập một 'trật tự', trật tự này hợp pháp hóa và củng cố sự áp bức kia bằng cách làm dịu xung đột giai cấp" - V.I. Lênin
                    </blockquote>
                  </div>

                  <div className="bg-gradient-to-r from-white/10 to-white/5 rounded-2xl p-6 border-l-4 border-amber-700">
                    <h4 className="text-lg font-semibold text-white mb-3">Liên hệ hiện đại:</h4>
                    <p className="text-white/90 text-sm leading-relaxed">
                      Trong các xã hội tư bản hiện nay, như Hoa Kỳ, nhà nước phục vụ lợi ích của giai cấp tư sản thông qua các chính sách bảo vệ quyền sở hữu tư nhân và lợi nhuận của các tập đoàn lớn.
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Section 2: Đặc trưng cơ bản */}
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
                  className="text-6xl font-bold font-dancing-script text-gray-800"
                  animate={{
                    scale: [1, 1.02, 1]
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  c. Đặc trưng cơ bản
                </motion.h2>
              </div>
              <div className="w-32 h-1 bg-gray-800 mx-auto rounded-full"></div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Đặc trưng 1 */}
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
                    Quản lý cư dân
                  </motion.h3>
                </div>
                <p className="text-white/90 leading-relaxed mb-4">
                  Trên một lãnh thổ nhất định.
                </p>
                <div className="bg-gradient-to-r from-white/10 to-white/5 rounded-xl p-4 border border-white/20">
                  <h4 className="text-sm font-semibold text-white mb-2">Liên hệ hiện đại:</h4>
                  <p className="text-white/90 text-sm leading-relaxed">
                    Ở Việt Nam hiện nay, mọi công dân sống trong lãnh thổ quốc gia đều chịu sự quản lý của nhà nước thông qua hệ thống hành chính từ trung ương đến địa phương.
                  </p>
                </div>
              </motion.div>

              {/* Đặc trưng 2 */}
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
                    className="text-xl font-bold text-rose-100"
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
                    Cơ quan quyền lực
                  </motion.h3>
                </div>
                <p className="text-white/90 leading-relaxed mb-4">
                  Có hệ thống cơ quan quyền lực chuyên nghiệp (mang tính cưỡng chế).
                </p>
                <div className="bg-gradient-to-r from-white/10 to-white/5 rounded-xl p-4 border border-white/20">
                  <h4 className="text-sm font-semibold text-white mb-2">Liên hệ hiện đại:</h4>
                  <p className="text-white/90 text-sm leading-relaxed">
                    Trong các quốc gia hiện đại, như Hoa Kỳ, hệ thống cảnh sát, FBI, và quân đội là các cơ quan quyền lực chuyên nghiệp.
                  </p>
                </div>
              </motion.div>

              {/* Đặc trưng 3 */}
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
                    className="text-xl font-bold text-amber-100"
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
                    Hệ thống thuế khóa
                  </motion.h3>
                </div>
                <p className="text-white/90 leading-relaxed mb-4">
                  Có hệ thống thuế khóa để duy trì hoạt động.
                </p>
                <div className="bg-gradient-to-r from-white/10 to-white/5 rounded-xl p-4 border border-white/20">
                  <h4 className="text-sm font-semibold text-white mb-2">Liên hệ hiện đại:</h4>
                  <p className="text-white/90 text-sm leading-relaxed">
                    Ở Việt Nam hiện nay, nhà nước thu các loại thuế như thuế thu nhập cá nhân, thuế giá trị gia tăng (VAT) để duy trì hoạt động.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Section 3: Chức năng cơ bản */}
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
                <h2 className="text-6xl font-bold text-gray-800 font-dancing-script">
                  d. Chức năng cơ bản
                </h2>
              </div>
              <div className="w-32 h-1 bg-gray-800 mx-auto rounded-full"></div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Chức năng chính trị */}
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
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-slate-600 to-slate-700 flex items-center justify-center">
                    <ShieldCheckIcon className="w-6 h-6 text-slate-100" />
                  </div>
                    <h3 className="text-2xl font-bold text-white font-dancing-script">Chính trị</h3>
                </div>
                <p className="text-white/90 leading-relaxed">
                  Duy trì sự thống trị giai cấp, ổn định chính trị, bảo vệ lợi ích giai cấp cầm quyền.
                </p>
              </motion.div>

              {/* Chức năng xã hội */}
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
                  <h3 className="text-2xl font-bold text-green-100 font-dancing-script">Xã hội</h3>
                </div>
                <p className="text-white/90 leading-relaxed">
                  Củng cố và thúc đẩy xã hội phát triển, định hướng chính trị, ban hành luật pháp, phát triển văn hóa – y tế – giáo dục.
                </p>
              </motion.div>

              {/* Chức năng đối nội */}
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
                    <BuildingOfficeIcon className="w-6 h-6 text-blue-100" />
                  </div>
                  <h3 className="text-2xl font-bold text-blue-100 font-dancing-script">Đối nội</h3>
                </div>
                <p className="text-white/90 leading-relaxed">
                  Giữ trật tự xã hội, quản lý kinh tế – xã hội.
                </p>
              </motion.div>

              {/* Chức năng đối ngoại */}
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
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-indigo-600 to-indigo-700 flex items-center justify-center">
                    <GlobeAltIcon className="w-6 h-6 text-indigo-100" />
                  </div>
                  <h3 className="text-2xl font-bold text-indigo-100 font-dancing-script">Đối ngoại</h3>
                </div>
                <p className="text-white/90 leading-relaxed">
                  Bảo vệ lãnh thổ, giao lưu kinh tế – văn hóa – khoa học với các quốc gia khác.
                </p>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Section 4: Các kiểu và hình thức nhà nước */}
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
                <h2 className="text-6xl font-bold text-gray-800 font-dancing-script">
                  e. Các kiểu và hình thức nhà nước
                </h2>
              </div>
              <div className="w-32 h-1 bg-gray-800 mx-auto rounded-full"></div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Kiểu nhà nước */}
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
                <h3 className="text-3xl font-bold text-amber-100 mb-6 font-dancing-script">Kiểu nhà nước</h3>
                <p className="text-white/90 leading-relaxed mb-6">
                  Dùng để chỉ quyền lực nhà nước đó thuộc về giai cấp nào, tồn tại trên cơ sở kinh tế nào tương ứng với HTKT-XH nào.
                </p>
                
                <div className="space-y-4">
                  <div className="bg-gradient-to-r from-amber-800/40 to-amber-900/40 rounded-xl p-4 border border-amber-700/40">
                    <h4 className="text-lg font-semibold text-amber-200 mb-2">Kiểu cơ bản:</h4>
                    <ul className="text-white/90 space-y-1">
                      <li>• Nhà nước chiếm hữu nô lệ</li>
                      <li>• Nhà nước phong kiến</li>
                      <li>• Nhà nước tư sản</li>
                    </ul>
                  </div>
                  
                  <div className="bg-gradient-to-r from-amber-800/40 to-amber-900/40 rounded-xl p-4 border border-amber-700/40">
                    <h4 className="text-lg font-semibold text-amber-200 mb-2">Kiểu đặc biệt:</h4>
                    <p className="text-white/90">• Nhà nước vô sản</p>
                  </div>
                </div>
              </motion.div>

              {/* Hình thức nhà nước */}
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
                <h3 className="text-3xl font-bold text-amber-100 mb-6 font-dancing-script">Hình thức nhà nước</h3>
                <p className="text-white/90 leading-relaxed mb-6">
                  Cách tổ chức, phương thức thực hiện quyền lực nhà nước của giai cấp thống trị.
                </p>
                
                <div className="space-y-4">
                  <div className="bg-gradient-to-r from-amber-800/40 to-amber-900/40 rounded-xl p-4 border border-amber-700/40">
                    <h4 className="text-lg font-semibold text-amber-200 mb-2">Nhà nước chiếm hữu nô lệ:</h4>
                    <ul className="text-white/90 space-y-1 text-sm">
                      <li>• Quân chủ chủ nô</li>
                      <li>• Cộng hòa quý tộc</li>
                      <li>• Cộng hòa dân chủ</li>
                    </ul>
                  </div>
                  
                  <div className="bg-gradient-to-r from-amber-800/40 to-amber-900/40 rounded-xl p-4 border border-amber-700/40">
                    <h4 className="text-lg font-semibold text-amber-200 mb-2">Nhà nước tư sản:</h4>
                    <ul className="text-white/90 space-y-1 text-sm">
                      <li>• Quân chủ lập hiến</li>
                      <li>• Cộng hòa đại nghị</li>
                      <li>• Cộng hòa tổng thống</li>
                    </ul>
                  </div>
                  
                  <div className="bg-gradient-to-r from-amber-800/40 to-amber-900/40 rounded-xl p-4 border border-amber-700/40">
                    <h4 className="text-lg font-semibold text-amber-200 mb-2">Nhà nước vô sản:</h4>
                    <ul className="text-white/90 space-y-1 text-sm">
                      <li>• Công xã</li>
                      <li>• Xô viết</li>
                      <li>• Cộng hòa dân chủ nhân dân</li>
                    </ul>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Section 5: Ví dụ lịch sử */}
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
                <h2 className="text-6xl font-bold text-gray-800 font-dancing-script">
                  Ví dụ lịch sử
                </h2>
              </div>
              <div className="w-32 h-1 bg-gray-800 mx-auto rounded-full"></div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
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
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-red-500 to-red-600 flex items-center justify-center">
                    <ShieldCheckIcon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-red-100 font-dancing-script">Cách mạng Tháng Mười Nga (1917)</h3>
                </div>
                
                <p className="text-white/90 leading-relaxed mb-6">
                  Dẫn đến sự ra đời của nhà nước Xô Viết, nhà nước chuyên chính vô sản đầu tiên thành công trên thế giới.
                </p>
                
                {/* Historical Image */}
                <div className="relative mb-6 overflow-hidden rounded-2xl">
                  <motion.img
                    src="https://file3.qdnd.vn/data/images/0/2023/11/06/upload_2080/1828102509am.jpg?dpi=150&quality=100&w=870"
                    alt="Cách mạng Tháng Mười Nga - V.I. Lenin"
                    className="w-full h-64 object-cover rounded-2xl shadow-2xl"
                    whileHover={{
                      scale: 1.05,
                      transition: { duration: 0.3 }
                    }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-2xl"></div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <p className="text-white text-sm font-semibold drop-shadow-lg">
                      V.I. Lenin - Lãnh tụ Cách mạng Tháng Mười Nga
                    </p>
                  </div>
                </div>
                
                <div className="bg-gradient-to-r from-white/10 to-white/5 rounded-xl p-4 border-l-4 border-amber-700">
                  <p className="text-white/90 text-sm italic">
                    "V.I.Lênin đọc diễn văn tại Quảng trường Đỏ ở Moscow trong lễ kỷ niệm một năm Ngày thắng lợi của Cách mạng Tháng Mười Nga vào ngày 7.11.1918"
                  </p>
                </div>
              </motion.div>

              {/* Cách mạng Tháng Tám Việt Nam */}
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
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-emerald-500 to-emerald-600 flex items-center justify-center">
                    <GlobeAltIcon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-emerald-100 font-dancing-script">Cách mạng Tháng Tám (1945)</h3>
                </div>
                
                <p className="text-white/90 leading-relaxed mb-6">
                  Lật đổ ách thống trị của thực dân và phong kiến, khai sinh ra nước Việt Nam Dân chủ Cộng hòa - nhà nước công nông đầu tiên ở Đông Nam Á.
                </p>
                
                {/* Historical Image */}
                <div className="relative mb-6 overflow-hidden rounded-2xl">
                  <motion.img
                    src="https://cdnmedia.baotintuc.vn/Upload/a7srThwxbojBCucvUWgnxA/files/2020/08/19/cach-mang-thang-tam-19082020.jpg"
                    alt="Cách mạng Tháng Tám Việt Nam 1945"
                    className="w-full h-64 object-cover rounded-2xl shadow-2xl"
                    whileHover={{
                      scale: 1.05,
                      transition: { duration: 0.3 }
                    }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-2xl"></div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <p className="text-white text-sm font-semibold drop-shadow-lg">
                      Cách mạng Tháng Tám 1945 - Việt Nam
                    </p>
                  </div>
                </div>
                
                <div className="bg-gradient-to-r from-white/10 to-white/5 rounded-xl p-4 border-l-4 border-amber-700">
                  <p className="text-white/90 text-sm italic">
                    "Cuộc mít tinh tại quảng trường Nhà hát Lớn ngày 19/8/1945"
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Revolution Section */}
      <RevolutionSection />

      {/* Beautiful End Section */}
      <motion.div
        className="min-h-screen flex items-center justify-center relative overflow-hidden"
        style={{
          background: "linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(240, 240, 240, 0.1) 100%)"
        }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 2 }}
        viewport={{ once: true }}
      >
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Floating Geometric Shapes */}
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                width: `${Math.random() * 100 + 20}px`,
                height: `${Math.random() * 100 + 20}px`,
              }}
              animate={{
                y: [0, -100, 0],
                x: [0, Math.random() * 50 - 25, 0],
                rotate: [0, 360, 0],
                scale: [1, 1.2, 1],
                opacity: [0.1, 0.8, 0.1],
              }}
              transition={{
                duration: 8 + Math.random() * 4,
                repeat: Infinity,
                delay: Math.random() * 5,
                ease: "easeInOut"
              }}
            >
              <div 
                className="w-full h-full rounded-full"
                style={{
                  background: `linear-gradient(45deg, 
                    rgba(${Math.random() * 100 + 100}, ${Math.random() * 100 + 100}, ${Math.random() * 100 + 100}, 0.3),
                    rgba(${Math.random() * 100 + 150}, ${Math.random() * 100 + 150}, ${Math.random() * 100 + 150}, 0.1)
                  )`,
                  filter: 'blur(1px)'
                }}
              />
            </motion.div>
          ))}

          {/* Floating Particles */}
          {[...Array(30)].map((_, i) => (
            <motion.div
              key={`particle-${i}`}
              className="absolute w-1 h-1 bg-white/30 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -200, 0],
                x: [0, Math.random() * 100 - 50, 0],
                opacity: [0, 1, 0],
                scale: [0, 1, 0],
              }}
              transition={{
                duration: 6 + Math.random() * 4,
                repeat: Infinity,
                delay: Math.random() * 3,
                ease: "easeInOut"
              }}
            />
          ))}
        </div>

        {/* Main Content */}
        <div className="text-center max-w-6xl mx-auto px-8 relative z-10 mb-36">
          {/* Thank You Message */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, delay: 0.5 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <motion.h1
              className="text-6xl md:text-8xl font-bold mb-6 font-dancing-script"
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
              style={{
                background: "linear-gradient(135deg, #f59e0b, #d97706, #b45309)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent"
              }}
            >
              Cảm ơn bạn!
            </motion.h1>
            
            <motion.p
              className="text-2xl md:text-3xl text-white/90 font-dancing-script mb-8"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1 }}
              viewport={{ once: true }}
            >
              Đã học xong gòi....
            </motion.p>
          </motion.div>

          {/* Achievement Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {[
              {
                title: "Nhà nước",
                description: "Hiểu về nguồn gốc, bản chất và chức năng",
                icon: "🏛️"
              },
              {
                title: "Cách mạng xã hội", 
                description: "Nắm vững nguyên nhân và phương pháp",
                icon: "⚡"
              },
              {
                title: "Thực tiễn",
                description: "Áp dụng vào tình hình hiện tại",
                icon: "🌟"
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                className="bg-gradient-to-br from-white/10 to-white/5 rounded-3xl p-8 border border-white/20 backdrop-blur-sm shadow-lg"
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
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
              >
                <div className="text-6xl mb-4">{item.icon}</div>
                <h3 className="text-2xl font-bold text-white mb-4 font-dancing-script">
                  {item.title}
                </h3>
                <p className="text-white/90 leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Final Message */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, delay: 1.5 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-white/10 to-white/5 rounded-3xl p-12 border border-white/20 backdrop-blur-sm shadow-lg"
          >
            <motion.h2
              className="text-4xl md:text-5xl font-bold text-white mb-6 font-dancing-script"
              animate={{
                scale: [1, 1.02, 1]
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              Chúc bạn học tập hiệu quả! 🎓
            </motion.h2>
            
            <motion.p
              className="text-xl text-white/90 leading-relaxed mb-8"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 1, delay: 2 }}
              viewport={{ once: true }}
            >
              Tiếp tục khám phá và áp dụng những kiến thức đã học vào thực tế cuộc sống.
            </motion.p>

            {/* Animated Stars */}
            <div className="flex justify-center space-x-4">
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  className="text-4xl"
                  animate={{
                    rotate: [0, 360],
                    scale: [1, 1.2, 1],
                    opacity: [0.5, 1, 0.5]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: i * 0.2,
                    ease: "easeInOut"
                  }}
                >
                  ⭐
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Bottom Gradient */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/20 to-transparent"></div>
      </motion.div>
    </div>
  );
}