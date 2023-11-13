import { useEffect, useState } from 'react';
import UserApi from '../../api/UserApi';

const useGetAllInstructor = () => {
  const [data, setData] = useState<Array<any>>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  useEffect(() => {
    getAllInstructor();
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }, []);

  const getAllInstructor = async () => {
    try {
      setLoading(true);
      const response = await UserApi.getAllInstructor();
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

export default useGetAllInstructor;
