import useGetProfile from '../../../hooks/user/useGetProfile';
import ProfileOrganism from '../../organism/profile/profile';
import './profile.scss';
const ProfilePage = () => {
  const { loading, data } = useGetProfile();

  return <ProfileOrganism data={data?.data} loading={loading} />;
};

export default ProfilePage;
