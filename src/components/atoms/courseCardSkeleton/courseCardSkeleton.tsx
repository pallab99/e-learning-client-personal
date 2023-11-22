import { Skeleton } from "antd";
import "./courseCardSkeleton.scss";
const CourseCardSkeleton = () => {
  return (
    <div className="course_card_skeleton_div">
      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]?.map((ele: any) => {
        return (
          <div key={ele}>
            <Skeleton.Image active></Skeleton.Image>
            <Skeleton active></Skeleton>
          </div>
        );
      })}
    </div>
  );
};

export default CourseCardSkeleton;
