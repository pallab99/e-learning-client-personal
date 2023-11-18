import { useEffect, useState } from 'react';
import CourseSectionApi from '../../api/CourseSectionApi';

const useGetCourseSection = (courseId: string, recallApi?: number) => {
  const [data, setData] = useState<object>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  useEffect(() => {
    getCourseSection(courseId);
  }, [courseId, recallApi]);

  const getCourseSection = async (courseId: string) => {
    try {
      setLoading(true);
      const response = await CourseSectionApi.getCourseSection(courseId);
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

export default useGetCourseSection;
