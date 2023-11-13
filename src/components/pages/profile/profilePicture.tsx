import useGetProfile from "../../../hooks/user/useGetProfile";
import ProfilePictureOrganism from "../../organism/forget-password-form/profile/profilePicture";

const ProfilePicturePage = () => {
  const { loading, data, error } = useGetProfile();

  return <ProfilePictureOrganism data={data.data} loading={loading} />;
};

export default ProfilePicturePage;
