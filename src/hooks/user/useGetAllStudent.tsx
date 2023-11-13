import { useEffect, useState } from "react";
import UserApi from "../../api/UserApi";

const useGetAllStudent = () => {
  const [data, setData] = useState<object>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  useEffect(() => {
    getAllStudent();
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);

  const getAllStudent = async () => {
    try {
      setLoading(true);
      const response = await UserApi.getAllStudent();
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

export default useGetAllStudent;
