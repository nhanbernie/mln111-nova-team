import { useState, useEffect } from "react";
import SimpleQuiz from "../components/SimpleQuiz";
import QuizResults from "../components/QuizResults";
import type { QuizQuestion } from "../data/quizData";
import { quizQuestions } from "../data/quizData";

export default function QuizPlayPage() {
  const [quizResults, setQuizResults] = useState<{
    score: number;
    total: number;
    answers: number[];
  } | null>(null);
  const [questions, setQuestions] = useState<QuizQuestion[]>(quizQuestions);
  const [useAIGenerated, setUseAIGenerated] = useState(false);


  useEffect(() => {
    // Check if using AI generated questions
    const useAI = localStorage.getItem('useAIGenerated') === 'true';
    const aiQuestions = localStorage.getItem('aiGeneratedQuestions');
    
    
    if (useAI && aiQuestions) {
      try {
        const parsedQuestions = JSON.parse(aiQuestions);
        setQuestions(parsedQuestions);
        setUseAIGenerated(true);
      } catch (error) {
        setQuestions(quizQuestions);
        setUseAIGenerated(false);
      }
    } else {
      setQuestions(quizQuestions);
      setUseAIGenerated(false);
    }
  }, []);

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
      <SimpleQuiz 
        key={`quiz-${useAIGenerated ? 'ai' : 'default'}-${questions.length}`}
        questions={questions}
        useAIGenerated={useAIGenerated}
        onComplete={handleQuizComplete} 
      />
    </div>
  );
}
