import { useEffect, useState } from 'react';
import CartApi from '../../api/CartApi';
import { useAppSelector } from '../../redux/store';
import { STUDENT } from '../../constant/userType';

const useGetCartByUser = (recallApi: any) => {
  const [data, setData] = useState<Array<any>>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const isStudent = useAppSelector((state) => state.auth.userData.rank);
  useEffect(() => {
    if (isStudent === STUDENT) {
      getCartByUser();
    }
  }, [isStudent, recallApi]);

  const getCartByUser = async () => {
    try {
      setLoading(true);
      const response = await CartApi.getCartDataByUser();
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

export default useGetCartByUser;
