import { message } from "antd";
import { useState } from "react";
import AuthApi from "../../api/AuthApi";

const useForgetPassword = () => {
  const [forgetPasswordLoading, setForgetPasswordLoading] = useState(false);
  const forgetPassword = async (values: any) => {
    try {
      setForgetPasswordLoading(true);
      const response = await AuthApi.sendResetPasswordRequest(values);
      setForgetPasswordLoading(false);
      message.success(response?.data.message);
    } catch (error: any) {
      setForgetPasswordLoading(false);
      message.error(error.response.message);
    } finally {
      setForgetPasswordLoading(false);
    }
  };

  return { forgetPasswordLoading, forgetPassword };
};

export default useForgetPassword;
