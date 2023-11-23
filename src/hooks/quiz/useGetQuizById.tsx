import { useEffect, useState } from "react";
import QuizApi from "../../api/QuizApi";

const useGetQuizById = (
  sectionId: string,
  quizId: string,
  recallApi?: number
) => {
  const [data, setData] = useState<object>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  useEffect(() => {
    getQuizById(sectionId, quizId);
  }, [sectionId, quizId, recallApi]);

  const getQuizById = async (sectionId: string, quizId: string) => {
    try {
      setLoading(true);
      const response = await QuizApi.getQuizById(sectionId, quizId);
      setData(response?.data?.data);
      setLoading(false);
    } catch (error: any) {
      setLoading(false);
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error };
};

export default useGetQuizById;
