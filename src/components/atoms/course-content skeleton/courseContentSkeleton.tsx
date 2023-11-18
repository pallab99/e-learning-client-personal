import { Skeleton } from 'antd';
import React from 'react';

const CourseContentSkeleton = () => {
  return [1, 2, 3, 4, 5].map((ele: any) => {
    return <Skeleton active className="mt-10" key={ele}></Skeleton>;
  });
};

export default CourseContentSkeleton;
