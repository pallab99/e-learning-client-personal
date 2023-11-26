import { useEffect, useState } from 'react';
import CourseApi from '../../api/CourseApi';

const useGetCourseById = (courseId: string, recallApi?: number) => {
  const [data, setData] = useState<object>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();

  useEffect(() => {
    getCourseById(courseId);
  }, [courseId, recallApi]);

  const getCourseById = async (courseId: string) => {
    try {
      setLoading(true);
      const response = await CourseApi.getCourseById(courseId);
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

export default useGetCourseById;
