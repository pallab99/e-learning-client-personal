import { useEffect, useState } from 'react';
import QuizApi from '../../api/QuizApi';

const useGetSubmittedQuiz = (quizId: string, recallApi?: number) => {
  const [submittedQuiz, setSubmittedQuiz] = useState<object>({});
  const [SubmittedQuizLoading, setSubmittedQuizLoading] = useState(false);
  const [error, setError] = useState();
  const [noSubmission, setNoSubmission] = useState(false);
  useEffect(() => {
    getSubmittedQuiz(quizId);
  }, [quizId, recallApi]);

  const getSubmittedQuiz = async (quizId: string) => {
    try {
      setSubmittedQuizLoading(true);
      const response = await QuizApi.getSubmittedQuiz(quizId);
      if (response?.data?.length <= 0) {
        console.log('no submission');
        setNoSubmission(true);
      } else {
        setNoSubmission(false);
        setSubmittedQuiz(response?.data?.data);
      }
      setSubmittedQuizLoading(false);
    } catch (error: any) {
      setSubmittedQuizLoading(false);
      setError(error);
    } finally {
      setSubmittedQuizLoading(false);
    }
  };

  return { noSubmission, submittedQuiz, SubmittedQuizLoading, error };
};

export default useGetSubmittedQuiz;
