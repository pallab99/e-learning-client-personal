import { message } from 'antd';
import { useState } from 'react';
import { recallUserApi } from '../../redux/slices/authSlice';
import { useAppDispatch } from '../../redux/store';
import { IUserLoginData, IUserUpdateData } from '../../types/userData';
import UserApi from '../../api/UserApi';

const useUpdateUser = () => {
  const [btnLoading, setBtnLoading] = useState(false);
  const [userData, setUserData] = useState<IUserLoginData>();
  const dispatch = useAppDispatch();
  const updateUser = async (values: IUserUpdateData) => {
    try {
      setBtnLoading(true);
      const response = await UserApi.updateUser(values);
      dispatch(recallUserApi());
      setUserData(response?.data.data);
      setBtnLoading(false);
      message.success(response?.data.message);
    } catch (error: any) {
      setBtnLoading(false);
      message.error(error.response.message);
    } finally {
      setBtnLoading(false);
    }
  };

  return { btnLoading, updateUser, userData };
};

export default useUpdateUser;
