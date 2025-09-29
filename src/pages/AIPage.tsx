import { motion } from "framer-motion";
import { useState } from "react";
import { 
  CpuChipIcon, 
  CheckCircleIcon, 
  ExclamationTriangleIcon,
  LightBulbIcon,
  AcademicCapIcon,
  DocumentTextIcon,
  ShieldCheckIcon,
  SparklesIcon,
  BeakerIcon,
  BookOpenIcon
} from "@heroicons/react/24/outline";

export default function AIPage() {
  const [activeSection, setActiveSection] = useState(0);

  const sections = [
    {
      id: "transparency",
      title: "Minh bạch",
      icon: SparklesIcon,
      color: "from-blue-400 via-cyan-400 to-teal-400",
      content: {
        tools: ["ChatGPT (GPT-5)", "Notebooklm", "Quizlet AI"],
        purpose: "Hỗ trợ soạn câu hỏi trắc nghiệm, gợi ý sơ đồ tư duy, gợi ý quiz ôn tập",
        results: [
          "Design trang web hiệu ứng mượt với Gsap",
          "Sử dụng AI để tạo câu hỏi từ AI dựa trên nội dung học tập", 
          "Nội dung tóm tắt từ lý thuyết trong PDF"
        ],
        edits: [
          "Rà soát, đối chiếu với giáo trình Giáo trình triết học: Chương 3, Chủ đề 3 - Nhà nước và cách mạng xã hội",
          "Bổ sung dẫn chứng thực tiễn Việt Nam 2023-2025",
          "Điều chỉnh ngôn ngữ phù hợp với chuẩn học thuật"
        ]
      }
    },
    {
      id: "responsibility", 
      title: "Có trách nhiệm",
      icon: ShieldCheckIcon,
      color: "from-emerald-400 via-green-400 to-lime-400",
      content: {
        verification: [
          "Giáo trình LLCT (Mác – Lênin, tư tưởng Hồ Chí Minh)",
          "Văn kiện chính thức: Nghị quyết Đại hội XIII, Cương lĩnh 2011",
          "Văn bản pháp luật hiện hành"
        ],
        responsibility: "Nhóm 7 chịu trách nhiệm cuối cùng về nội dung, đảm bảo tính chính xác, tránh sai lệch so với quan điểm chính thống"
      }
    },
    {
      id: "creativity",
      title: "Sáng tạo", 
      icon: BeakerIcon,
      color: "from-purple-400 via-pink-400 to-rose-400",
      content: {
        aiRole: [
          "Gợi ý sơ đồ hóa lý thuyết (mindmap, timeline)",
          "Tạo quiz ôn tập trắc nghiệm",
          "Đề xuất ý tưởng thiết kế slide",
          "Mô phỏng chatbot hỏi – đáp để luyện tập"
        ],
        studentWork: "Phần phân tích, lập luận, kết nối thực tiễn do sinh viên trực tiếp biên soạn"
      }
    },
    {
      id: "integrity",
      title: "Liêm chính học thuật",
      icon: BookOpenIcon,
      color: "from-amber-400 via-orange-400 to-red-400", 
      content: {
        commitment: "AI chỉ giữ vai trò công cụ hỗ trợ kỹ thuật. Toàn bộ phần nội dung học thuật then chốt được nhóm nghiên cứu, phân tích và biên soạn độc lập",
        sources: [
          "Mác, C. & Ăngghen, Ph. – Toàn tập",
          "Lênin, V. I. – Toàn tập", 
          "Đảng Cộng sản Việt Nam – Văn kiện Đại hội đại biểu toàn quốc lần thứ XIII, Tập II",
          "Giáo trình triết học (Chương 3, Chủ đề 3 – Nhà nước và cách mạng xã hội)"
        ]
      }
    }
  ];

  return (
    <div className="min-h-screen relative overflow-hidden z-50">
      {/* Background with existing design */}
      <div className="absolute inset-0 z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-[oklch(95%_0.03_240)] to-[oklch(78%_0.07_230)]" />
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat bg-fixed"
          style={{
            backgroundImage: "url('/pastel-yellow-vignette.jpg')",
          }}
        >
          <div className="absolute inset-0 bg-black/20"></div>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-50 min-h-screen p-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <motion.div
              className="inline-flex items-center gap-4 mb-6"
              whileHover={{ scale: 1.05 }}
            >
              <CpuChipIcon className="w-16 h-16 text-white" />
              <motion.h1 
                className="text-6xl font-bold drop-shadow-lg relative"
                animate={{
                  color: [
                    "#ff6b6b",
                    "#4ecdc4", 
                    "#45b7d1",
                    "#96ceb4",
                    "#feca57",
                    "#ff6b6b"
                  ],
                  scale: [1, 1.05, 1, 1.05, 1],
                  textShadow: [
                    "0 0 20px rgba(255, 107, 107, 0.5)",
                    "0 0 20px rgba(78, 205, 196, 0.5)",
                    "0 0 20px rgba(69, 183, 209, 0.5)",
                    "0 0 20px rgba(150, 206, 180, 0.5)",
                    "0 0 20px rgba(254, 202, 87, 0.5)",
                    "0 0 20px rgba(255, 107, 107, 0.5)"
                  ]
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                AI Usage
              </motion.h1>
            </motion.div>
            <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed font-dancing-script">
              Minh bạch về việc sử dụng AI trong dự án học tập, đảm bảo tính trách nhiệm và liêm chính học thuật
            </p>
          </motion.div>

          {/* Navigation Tabs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="flex flex-wrap justify-center gap-4 mb-12"
          >
            {sections.map((section, index) => (
              <motion.button
                key={section.id}
                onClick={() => setActiveSection(index)}
                className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center gap-2 font-dancing-script ${
                  activeSection === index
                    ? 'bg-white/20 text-white shadow-lg'
                    : 'bg-white/10 text-white/70 hover:bg-white/15'
                }`}
                whileHover={{ 
                  scale: 1.05,
                  x: [0, -2, 2, -2, 2, 0],
                  transition: { duration: 0.3 }
                }}
                whileTap={{ 
                  scale: 0.95,
                  x: [0, -1, 1, -1, 1, 0],
                  transition: { duration: 0.2 }
                }}
                animate={{
                  x: activeSection === index ? [0, -1, 1, -1, 1, 0] : 0
                }}
                transition={{
                  x: {
                    duration: 2,
                    repeat: Infinity,
                    repeatDelay: 3,
                    ease: "easeInOut"
                  }
                }}
              >
                <section.icon className="w-5 h-5" />
                {section.title}
              </motion.button>
            ))}
          </motion.div>

          {/* Content Section */}
          <motion.div
            key={activeSection}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-white/20"
          >
            <div className="flex items-center gap-4 mb-8">
              <div className={`p-3 rounded-xl bg-gradient-to-r ${sections[activeSection].color}`}>
                {(() => {
                  const IconComponent = sections[activeSection].icon;
                  return <IconComponent className="w-8 h-8 text-white" />;
                })()}
              </div>
              <h2 className="text-3xl font-bold text-white font-dancing-script">
                {sections[activeSection].title}
              </h2>
            </div>

            {/* Content based on active section */}
            {activeSection === 0 && sections[0].content && (
              <div className="space-y-8">
                <div>
                  <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2 font-dancing-script">
                    <DocumentTextIcon className="w-6 h-6" />
                    Công cụ sử dụng
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {sections[0].content.tools?.map((tool, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-white/10 rounded-xl p-4 text-center"
                      >
                        <p className="text-white font-medium">{tool}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-white mb-4 font-dancing-script">Mục đích</h3>
                  <p className="text-white/90 leading-relaxed font-dancing-script">
                    {sections[0].content.purpose}
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-white mb-4 font-dancing-script">Kết quả AI</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {sections[0].content.results?.map((result, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-start gap-3 bg-white/5 rounded-xl p-4"
                      >
                        <CheckCircleIcon className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
                        <p className="text-white/90">{result}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-white mb-4 font-dancing-script">Chỉnh sửa của sinh viên</h3>
                  <div className="space-y-3">
                    {sections[0].content.edits?.map((edit, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-start gap-3 bg-white/5 rounded-xl p-4"
                      >
                        <ExclamationTriangleIcon className="w-5 h-5 text-yellow-400 mt-1 flex-shrink-0" />
                        <p className="text-white/90">{edit}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeSection === 1 && sections[1].content && (
              <div className="space-y-8">
                <div>
                  <h3 className="text-xl font-semibold text-white mb-4 font-dancing-script">Kiểm chứng thông tin</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {sections[1].content.verification?.map((source, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-white/10 rounded-xl p-4 flex items-center gap-3"
                      >
                        <ShieldCheckIcon className="w-6 h-6 text-green-400 flex-shrink-0" />
                        <p className="text-white/90">{source}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>

                <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-xl p-6 border border-green-400/30">
                  <h3 className="text-xl font-semibold text-white mb-3 font-dancing-script">Trách nhiệm</h3>
                  <p className="text-white/90 leading-relaxed font-dancing-script">
                    {sections[1].content.responsibility}
                  </p>
                </div>
              </div>
            )}

            {activeSection === 2 && sections[2].content && (
              <div className="space-y-8">
                <div>
                  <h3 className="text-xl font-semibold text-white mb-4 font-dancing-script">Vai trò của AI</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {sections[2].content.aiRole?.map((role, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-white/10 rounded-xl p-4 flex items-center gap-3"
                      >
                        <LightBulbIcon className="w-5 h-5 text-purple-400 flex-shrink-0" />
                        <p className="text-white/90">{role}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>

                <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-xl p-6 border border-purple-400/30">
                  <h3 className="text-xl font-semibold text-white mb-3 font-dancing-script">Công việc của sinh viên</h3>
                  <p className="text-white/90 leading-relaxed font-dancing-script">
                    {sections[2].content.studentWork}
                  </p>
                </div>
              </div>
            )}

            {activeSection === 3 && sections[3].content && (
              <div className="space-y-8">
                <div className="bg-gradient-to-r from-orange-500/20 to-red-500/20 rounded-xl p-6 border border-orange-400/30">
                  <h3 className="text-xl font-semibold text-white mb-3 font-dancing-script">Cam kết</h3>
                  <p className="text-white/90 leading-relaxed font-dancing-script">
                    {sections[3].content.commitment}
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-white mb-4 font-dancing-script">Nguồn tài liệu chính thống</h3>
                  <div className="space-y-3">
                    {sections[3].content.sources?.map((source, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-white/10 rounded-xl p-4 flex items-center gap-3"
                      >
                        <AcademicCapIcon className="w-5 h-5 text-orange-400 flex-shrink-0" />
                        <p className="text-white/90">{source}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}