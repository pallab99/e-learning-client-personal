import { useEffect, useState } from "react";
import QuizApi from "../../api/QuizApi";

const useGetSubmittedQuiz = (quizId: string, recallApi?: number) => {
  const [submittedQuiz, setSubmittedQuiz] = useState<object>({});
  const [SubmittedQuizLoading, setSubmittedQuizLoading] = useState(false);
  const [error, setError] = useState();

  useEffect(() => {
    getSubmittedQuiz(quizId);
  }, [quizId, recallApi]);

  const getSubmittedQuiz = async (quizId: string) => {
    try {
      setSubmittedQuizLoading(true);
      const response = await QuizApi.getSubmittedQuiz(quizId);
      setSubmittedQuiz(response?.data?.data);
      setSubmittedQuizLoading(false);
    } catch (error: any) {
      setSubmittedQuizLoading(false);
      setError(error);
    } finally {
      setSubmittedQuizLoading(false);
    }
  };

  return { submittedQuiz, SubmittedQuizLoading, error };
};

export default useGetSubmittedQuiz;
