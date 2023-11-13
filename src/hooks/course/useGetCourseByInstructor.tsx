import { useEffect, useState } from "react";
import CourseApi from "../../api/CourseApi";

const useGetAllCourseByInstructor = () => {
  const [data, setData] = useState<object>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  useEffect(() => {
    getAllCourse();
  }, []);

  const getAllCourse = async () => {
    try {
      setLoading(true);
      const response = await CourseApi.getCourseByInstructor();
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

export default useGetAllCourseByInstructor;
