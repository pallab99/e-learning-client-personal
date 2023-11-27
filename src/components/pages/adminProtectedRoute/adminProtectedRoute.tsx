import Cookies from 'js-cookie';
import { Navigate, Outlet } from 'react-router-dom';
import { ADMIN } from '../../../constant/userType';
import { useAppSelector } from '../../../redux/store';

const AdminProtectedRoutePage = () => {
  const token = Cookies.get('accessToken');
  const admin = useAppSelector((state) => state.auth.userData.rank);
  if (!token) {
    return <Navigate to="/log-in" />;
  }
  console.log('admin logout');

  return token && admin === ADMIN ? (
    <Outlet />
  ) : (
    <Navigate to="/unauthorized" />
  );
};

export default AdminProtectedRoutePage;
