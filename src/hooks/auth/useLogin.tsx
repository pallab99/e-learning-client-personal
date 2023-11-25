import { message } from 'antd';
import { useState } from 'react';
import AuthApi from '../../api/AuthApi';
import { addUserData } from '../../redux/slices/authSlice';
import { useAppDispatch } from '../../redux/store';
import { ILogin } from '../../types/loginData';
import { IUserLoginData } from '../../types/userData';
import { ADMIN, INSTRUCTOR } from '../../constant/userType';
import { useNavigate } from 'react-router-dom';

const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState<IUserLoginData>();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const login = async (values: ILogin) => {
    try {
      setLoading(true);
      const response = await AuthApi.signIn(values);
      console.log('user data', response?.data.data);

      if (response?.data.data.rank === INSTRUCTOR) {
        navigate('/instructor/courses');
      } else if (response?.data.data.rank === ADMIN) {
        navigate('/admin/course/published');
      } else {
        navigate('/');
      }
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
