import { message } from 'antd';
import { useState } from 'react';
import AuthApi from '../../api/AuthApi';
import { addUserData } from '../../redux/slices/authSlice';
import { useAppDispatch } from '../../redux/store';
import { ILogin } from '../../types/loginData';
import { IUserLoginData } from '../../types/userData';

const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState<IUserLoginData>();
  const dispatch = useAppDispatch();
  const login = async (values: ILogin) => {
    try {
      setLoading(true);
      const response = await AuthApi.signIn(values);
      dispatch(addUserData(response?.data.data));
      setUserData(response?.data.data);
      setLoading(false);
      message.success(response?.data.message);
    } catch (error: any) {
      setLoading(false);
      message.error(error.response.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, login, userData };
};

export default useLogin;
