import { Skeleton } from "antd";
import "./courseDetailsLandingPage.scss";
const CourseDetailsLandingPageSkeleton = () => {
  return (
    <div className="course_details_landing_page_skeleton_div mt-20">
      <div className="course_details_landing_page_skeleton_wrapper">
        <div className="course_details_landing_page_skeleton_div_right-div">
          <Skeleton active></Skeleton>
        </div>
        <div className="course_details_landing_page_skeleton_div_left-div">
          <Skeleton.Image active></Skeleton.Image>
        </div>
      </div>
    </div>
  );
};

export default CourseDetailsLandingPageSkeleton;
