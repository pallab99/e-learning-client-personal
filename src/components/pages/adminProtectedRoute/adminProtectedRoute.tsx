import Cookies from 'js-cookie';
import { Navigate, Outlet } from 'react-router-dom';
import { ADMIN } from '../../../constant/userType';
import { useAppSelector } from '../../../redux/store';

const AdminProtectedRoutePage = () => {
  const token = Cookies.get('accessToken');
  const admin = useAppSelector((state) => state.auth.userData.rank);
  if (!token) {
    return <Navigate to="/admin/log-in" />;
  }
  return admin === ADMIN ? <Outlet /> : <Navigate to="/unauthorized" />;
};

export default AdminProtectedRoutePage;
