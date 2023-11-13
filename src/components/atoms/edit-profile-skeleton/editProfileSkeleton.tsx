import { Skeleton } from 'antd';
import './editProfileSkeleton.scss';
const EditProfileSkeleton = () => {
  return (
    <div className="edit-profile-skeleton mt-40 mb-40">
      <div className="edit-profile-skeleton-left-div">
        <Skeleton.Button active />
        <Skeleton.Input active />
        <Skeleton.Input active />
        <Skeleton.Input active />
        <Skeleton.Input active />
        <Skeleton.Button active />
      </div>
      <div className="edit-profile-skeleton-right-div">
        <Skeleton.Input active />
        <Skeleton.Input active />
        <Skeleton.Input active />
        <Skeleton.Input active />
      </div>
    </div>
  );
};

export default EditProfileSkeleton;
