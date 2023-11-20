import { useEffect, useState } from "react";
import CartApi from "../../api/CartApi";
import { STUDENT } from "../../constant/userType";
import { useAppSelector } from "../../redux/store";

const useGetCartByUser = (recallApi: any) => {
  const [data, setData] = useState<Array<any>>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const isStudent = useAppSelector((state) => state.auth.userData.rank);
  const recallCartApi = useAppSelector((state) => state.cart.cnt);
  useEffect(() => {
    if (isStudent === STUDENT) {
      getCartByUser();
    }
  }, [isStudent, recallApi, recallCartApi]);

  const getCartByUser = async () => {
    try {
      setLoading(true);
      const response = await CartApi.getCartDataByUser();
      setData(response?.data?.data);
      setLoading(false);
      setError(null);
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
