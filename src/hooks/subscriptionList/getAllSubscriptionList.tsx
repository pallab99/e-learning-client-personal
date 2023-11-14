import { useEffect, useState } from "react";
import subscriptionApi from "../../api/subscriptionApi";

const useGetAllSubscriptionListByAdmin = () => {
  const [data, setData] = useState<object>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  useEffect(() => {
    getAllSubscriptionAdmin();
  }, []);

  const getAllSubscriptionAdmin = async () => {
    try {
      setLoading(true);
      const response = await subscriptionApi.getAllSubscription();
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

export default useGetAllSubscriptionListByAdmin;
