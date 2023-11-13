import useGetProfile from "../../../hooks/user/useGetProfile";
import ProfileOrganism from "../../organism/forget-password-form/profile/profile";
import "./profile.scss";
const ProfilePage = () => {
  const { loading, data, error } = useGetProfile();
  console.log(data);

  return <ProfileOrganism data={data?.data} loading={loading} />;
};

export default ProfilePage;
