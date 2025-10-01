import { motion } from "framer-motion";
import { VideoCameraIcon } from "@heroicons/react/24/outline";
import { useState, useEffect } from "react";

interface YouTubeFrameProps {
  videoId: string;
  title: string;
  description?: string;
}

export default function YouTubeFrame({ 
  videoId, 
  title, 
  description = "Khám phá thêm về Triết học Mác-Lênin qua video học tập" 
}: YouTubeFrameProps) {
  const [showTip, setShowTip] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowTip(false);
    }, 3000); // Ẩn sau 3 giây

    return () => clearTimeout(timer);
  }, []);
  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      viewport={{ once: true }}
      className="relative py-20 px-4 sm:px-6 lg:px-8"
      style={{ pointerEvents: 'auto' }}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-amber-50/30 to-orange-50/30" />
      <div className="absolute inset-0 opacity-40">
        <div className="w-full h-full bg-gradient-to-br from-amber-100/20 to-orange-100/20" />
      </div>
      
      <div className="relative z-[1000] max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="p-3 bg-gradient-to-br from-[#8B4513] to-[#D97706] rounded-2xl shadow-lg">
              <VideoCameraIcon className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-xarrovv text-gray-800">
              Video Học Tập Với AI Gen
            </h2>
          </div>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            {description}
          </p>
        </motion.div>

        {/* YouTube Frame Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="relative group"
        >
          {/* Decorative Border */}
          <div className="absolute -inset-4 bg-gradient-to-r from-[#8B4513] via-[#D97706] to-[#B45309] rounded-3xl blur-sm opacity-75 group-hover:opacity-100 transition-opacity duration-300" />
          
          {/* Main Frame */}
          <div className="relative bg-white rounded-2xl shadow-2xl overflow-hidden border-4 border-white" style={{ pointerEvents: 'auto' }}>
            {/* Frame Header */}
            <div className="bg-gradient-to-r from-[#8B4513] to-[#D97706] px-6 py-4 flex items-center gap-3">
              <div className="flex gap-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              </div>
              <div className="flex-1 text-center">
                <h3 className="text-white font-semibold text-lg font-xarrovv">
                  {title}
                </h3>
              </div>
              <div className="w-6"></div>
            </div>

            {/* YouTube Embed */}
            <div className="relative aspect-video bg-gray-900">
              <iframe
                src={`https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1&showinfo=0&enablejsapi=1`}
                title={title}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                style={{ pointerEvents: 'auto' }}
              />
            </div>

            {/* Frame Footer */}
            <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
              <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
                <span className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                  YouTube
                </span>
                <span>Triết học Mác-Lênin</span>
              </div>
              {showTip && (
                <motion.div 
                  className="text-center"
                  initial={{ opacity: 1, y: 0 }}
                  animate={{ opacity: 0, y: -10 }}
                  transition={{ duration: 1, delay: 2 }}
                >
                  <p className="text-gray-600 text-xs">
                    💡 <strong>Mẹo:</strong> Bật phụ đề để học hiệu quả hơn
                  </p>
                </motion.div>
              )}
            </div>
          </div>
        </motion.div>

      </div>
    </motion.section>
  );
}
