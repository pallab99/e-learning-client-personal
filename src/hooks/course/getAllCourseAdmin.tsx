import { useEffect, useState } from "react";
import CourseApi from "../../api/CourseApi";

const useGetAllCourseByAdmin = (selectFieldData: any) => {
  const [data, setData] = useState<object>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  useEffect(() => {
    getAllCourseAdmin(selectFieldData);
  }, [selectFieldData]);

  const getAllCourseAdmin = async (selectFieldData: any) => {
    try {
      setLoading(true);
      const response = await CourseApi.getAllCourseAdmin(selectFieldData);
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

export default useGetAllCourseByAdmin;
