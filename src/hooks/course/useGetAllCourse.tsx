import { useEffect, useState } from "react";
import CourseApi from "../../api/CourseApi";
import { useAppSelector } from "../../redux/store";

const useGetAllCourse = () => {
  const [data, setData] = useState<object>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const courseSearchTerm = useAppSelector(
    (state) => state.instructor.searchTerm
  );
  useEffect(() => {
    getAllCourse();
  }, []);

  const getAllCourse = async () => {
    try {
      setLoading(true);
      const response = await CourseApi.getAllCourse();
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

export default useGetAllCourse;
