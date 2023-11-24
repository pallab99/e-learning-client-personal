import { useEffect, useState } from "react";
import UserApi from "../../api/UserApi";
import { STUDENT } from "../../constant/userType";
import { useAppSelector } from "../../redux/store";

const useGetMyLearning = () => {
  const [data, setData] = useState<object>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const isLoggedIn = useAppSelector((state) => state.auth.userData);
  useEffect(() => {
    if (isLoggedIn && isLoggedIn?.accessToken && isLoggedIn.rank === STUDENT) {
      getMyLearning();
    }
  }, [isLoggedIn]);

  const getMyLearning = async () => {
    try {
      setLoading(true);
      const response = await UserApi.getMyLearning();
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

export default useGetMyLearning;
