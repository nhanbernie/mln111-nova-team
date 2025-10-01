import React from 'react';
import { motion } from 'framer-motion';

const Footer: React.FC = () => {
  return (
    <footer className="min-h-screen relative overflow-hidden">
      {/* Background with existing design */}
      <div className="absolute inset-0 -z-10">
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

      {/* Footer Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-7xl mx-auto text-center">
          <motion.div 
            className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-white/20"
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            {/* Team Members Section */}
            <div className="mb-8">
              <motion.h3 
                className="text-4xl font-bold text-white mb-6 drop-shadow-lg font-xarrovv"
                initial={{ opacity: 0, y: -30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
              >
                Team Nova
              </motion.h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Team Member 1 */}
                <motion.div 
                  className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20"
                  initial={{ opacity: 0, y: 30, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ delay: 0.5, duration: 0.6 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                >
                  <p className="text-sm font-medium text-white/70">QS180146</p>
                  <p className="text-lg text-white font-semibold">Lê Thu Thương</p>
                </motion.div>

                {/* Team Member 2 */}
                <motion.div 
                  className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20"
                  initial={{ opacity: 0, y: 30, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ delay: 0.6, duration: 0.6 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                >
                  <p className="text-sm font-medium text-white/70">QS180011</p>
                  <p className="text-lg text-white font-semibold">Trần Lê Mỹ Duyên</p>
                </motion.div>

                {/* Team Member 3 */}
                <motion.div 
                  className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20"
                  initial={{ opacity: 0, y: 30, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ delay: 0.7, duration: 0.6 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                >
                  <p className="text-sm font-medium text-white/70">SE173621</p>
                  <p className="text-lg text-white font-semibold">Nguyễn Phú Cường</p>
                </motion.div>

                {/* Team Member 4 */}
                <motion.div 
                  className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20"
                  initial={{ opacity: 0, y: 30, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ delay: 0.8, duration: 0.6 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                >
                  <p className="text-sm font-medium text-white/70">SE183714</p>
                  <p className="text-lg text-white font-semibold">Nguyễn Quốc Minh Hiếu</p>
                </motion.div>
              </div>
            </div>

            {/* University Info */}
            <motion.div 
              className="mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.6 }}
            >
              <motion.h4 
                className="text-2xl font-bold text-white mb-3 font-xarrovv"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.0, duration: 0.5 }}
              >
                Đại học FPT HCM
              </motion.h4>
              <motion.p 
                className="text-white/80 text-lg"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.1, duration: 0.5 }}
              >
                Trường Đại học FPT - Cơ sở TP. Hồ Chí Minh
              </motion.p>
            </motion.div>

            {/* Copyright */}
            <motion.div 
              className="border-t border-white/20 pt-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.6 }}
            >
              <motion.p 
                className="text-white/70 text-base"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.3, duration: 0.5 }}
              >
                © 2024 Team Nova - Đại học FPT HCM. Tất cả quyền được bảo lưu.
              </motion.p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
