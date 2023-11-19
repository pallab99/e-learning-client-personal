import { useEffect, useState } from 'react';

import CategoryApi from '../../api/CategoryApi';

const useGetAllCategory = () => {
  const [category, setCategory] = useState<Array<any>>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  useEffect(() => {
    getAllCategory();
  }, []);

  const getAllCategory = async () => {
    try {
      setLoading(true);
      const response = await CategoryApi.getAllCategory();
      setCategory(response?.data?.data);
      setLoading(false);
    } catch (error: any) {
      setLoading(false);
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  return { category, loading, error };
};

export default useGetAllCategory;
