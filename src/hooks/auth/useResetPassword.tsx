import { message } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthApi from "../../api/AuthApi";

const useResetPassword = () => {
  const [resetPasswordLoading, setResetPasswordLoading] = useState(false);
  const [data, setData] = useState();
  const navigate = useNavigate();
  const resetPassword = async (values: any) => {
    try {
      setResetPasswordLoading(true);
      const response = await AuthApi.resetPassword(values);
      setResetPasswordLoading(false);
      setData(response?.data);
      message.success(response?.data.message);
      navigate("/log-in");
    } catch (error: any) {
      setResetPasswordLoading(false);
      message.error(error.response.message);
    } finally {
      setResetPasswordLoading(false);
    }
  };

  return { resetPasswordLoading, data, resetPassword };
};

export default useResetPassword;
