import { Skeleton } from "antd";
import "./instructorCourseListSkeleton.scss";
const InstructorCourseListSkeletonAtom = () => {
  return (
    <div className="skeleton-div mt-50 mb-40">
      <Skeleton.Image active />
      <Skeleton active />
    </div>
  );
};

export default InstructorCourseListSkeletonAtom;
