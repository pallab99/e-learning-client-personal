import { Tabs, TabsProps } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import InstructorDashboardSideBarOrganism from "../../../../organism/instructor/dashboard/sidebar/sidebar.organism";
import CourseLandingPage from "../../../../organism/instructor/update-course/course-landing-page/courseLandingPage";
import UpdateCourseOrganism from "../../../../organism/instructor/update-course/updateCourse";
// import "./createCourse.scss";
import CourseContent from "../../../../organism/instructor/update-course/course-content/courseContent";
import CourseSection from "../../../../organism/instructor/update-course/course-section/courseSection";
import "./updateCourse.scss";
const UpdateCoursePage = () => {
  const navigate = useNavigate();
  const { courseId } = useParams();
  const items: TabsProps["items"] = [
    {
      key: `/instructor/course/update/${courseId}`,
      label: "Basic Information",
      children: <UpdateCourseOrganism />,
    },
    {
      key: `/instructor/course/landing-page/${courseId}`,
      label: "Landing Page",
      children: <CourseLandingPage />,
    },
    {
      key: `/instructor/course/section/${courseId}`,
      label: "Course Section",
      children: <CourseSection />,
    },
    {
      key: `/instructor/course/content/${courseId}`,
      label: "Course content",
      children: <CourseContent />,
    },
  ];
  const tabOnchange = (key: string) => {
    navigate(key);
  };
  return (
    <div className="tab-div">
      <InstructorDashboardSideBarOrganism />
      <Tabs items={items} onChange={tabOnchange} style={{ width: "100%" }} />
    </div>
  );
};

export default UpdateCoursePage;
