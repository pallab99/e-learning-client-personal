import { message } from "antd";
import { useState } from "react";
import subscriptionApi from "../../api/subscriptionApi";

const useApplyForSubscription = () => {
  const [subsLoading, setSubsLoading] = useState(false);
  const applyForSubscription = async (cartId: string) => {
    try {
      setSubsLoading(true);
      const response = await subscriptionApi.applyForSubscription(cartId);
      setSubsLoading(false);
      message.success(response?.data.message);
    } catch (error: any) {
      setSubsLoading(false);
      message.error(error.response.message);
    } finally {
      setSubsLoading(false);
    }
  };

  return { subsLoading, applyForSubscription };
};

export default useApplyForSubscription;
