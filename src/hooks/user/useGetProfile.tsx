import { useEffect, useState } from 'react';
import UserApi from '../../api/UserApi';
import { useAppSelector } from '../../redux/store';

const useGetProfile = () => {
  const [data, setData] = useState<object>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const recallUserApi = useAppSelector((state) => state.auth.cnt);
  useEffect(() => {
    getAllCourse();
  }, [recallUserApi]);

  const getAllCourse = async () => {
    try {
      setLoading(true);
      const response = await UserApi.myProfile();
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

export default useGetProfile;
