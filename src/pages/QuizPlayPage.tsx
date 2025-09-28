import { useState } from "react";
import SimpleQuiz from "../components/SimpleQuiz";
import QuizResults from "../components/QuizResults";

export default function QuizPlayPage() {
  const [quizResults, setQuizResults] = useState<{
    score: number;
    total: number;
    answers: number[];
  } | null>(null);

  const handleQuizComplete = (score: number, total: number, answers: number[]) => {
    setQuizResults({ score, total, answers });
  };

  const restartQuiz = () => {
    setQuizResults(null);
  };

  // const goBack = () => {
  //   navigate("/quiz");
  // };

  if (quizResults) {
    return (
      <QuizResults 
        score={quizResults.score}
        total={quizResults.total}
        answers={quizResults.answers}
        onRestart={restartQuiz}
      />
    );
  }

  return (
    <div className="relative z-50">
      <SimpleQuiz onComplete={handleQuizComplete} />
    </div>
  );
}
