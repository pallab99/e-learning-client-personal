import { Skeleton } from 'antd';
import React from 'react';
import './editProfilePicture.scss';
const EditProfilePicSkeleton = () => {
  return (
    <div className="edit-profile-pic-skeleton">
      <Skeleton.Image active />
      <Skeleton.Button active />
    </div>
  );
};

export default EditProfilePicSkeleton;
