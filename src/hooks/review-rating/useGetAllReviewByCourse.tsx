import { useEffect, useState } from 'react';
import reviewApi from '../../api/reviewApi';

const useGetAllReviewByCourse = (courseId: string, recallApi?: number) => {
  const [data, setData] = useState<Array<any>>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  useEffect(() => {
    GetAllReviewByCourse(courseId);
  }, [courseId, recallApi]);

  const GetAllReviewByCourse = async (courseId: string) => {
    try {
      setLoading(true);
      const response = await reviewApi.getAllReviewByCourse(courseId);
      setData(response?.data);
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

export default useGetAllReviewByCourse;
