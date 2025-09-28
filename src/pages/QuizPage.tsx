import { motion } from "framer-motion";

export default function QuizPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative z-10 flex items-center justify-center min-h-screen p-8"
    >
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-6xl font-bold text-white mb-8 drop-shadow-lg">
          Quiz
        </h1>
        <p className="text-xl text-white/90 leading-relaxed drop-shadow-md">
          Kiểm tra kiến thức của bạn với các câu hỏi thú vị.
        </p>
      </div>
    </motion.div>
  );
}
