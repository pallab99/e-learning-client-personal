import { message } from "antd";
import { useState } from "react";
import CartApi from "../../api/CartApi";

const useRemoveCourseFromCart = () => {
  const [loading, setLoading] = useState(false);
  const removeCourseFromCart = async (courseId: string) => {
    try {
      setLoading(true);
      const response = await CartApi.removeCourseFromCart(courseId);
      setLoading(false);
      message.success(response?.data.message);
    } catch (error: any) {
      setLoading(false);
      message.error(error.response.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, removeCourseFromCart };
};

export default useRemoveCourseFromCart;
