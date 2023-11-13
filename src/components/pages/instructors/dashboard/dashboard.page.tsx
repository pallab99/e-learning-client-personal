import useGetAllCourseByInstructor from "../../../../hooks/course/useGetCourseByInstructor";
import HeadingAtom from "../../../atoms/heading/heading.atom";
import InstructorCourseListSkeletonAtom from "../../../atoms/instructorCourseListSkeleton/instructorCourseListSkeleton";
import TopBarLogoMolecules from "../../../molecules/top-bar-logo/topBarLogo.molecules";
import CourseCardOrganism from "../../../organism/instructor/dashboard/dashboard/courseCard.organism";
import CreateCourseHeaderOrganism from "../../../organism/instructor/dashboard/dashboard/createCourse.organism";
import InstructorResourceOrganism from "../../../organism/instructor/dashboard/instructor-resources/instructorResources";
import "./dashboard.style.scss";
const InstructorDashboardPage = () => {
  const { data, loading } = useGetAllCourseByInstructor();

  return (
    <>
      <TopBarLogoMolecules />
      <div className="instructor-dashboard-div">
        <CreateCourseHeaderOrganism></CreateCourseHeaderOrganism>
        {loading ? (
          [1, 2, 3, 4, 5].map((ele: any) => {
            return <InstructorCourseListSkeletonAtom key={ele} />;
          })
        ) : (
          <CourseCardOrganism data={(data as any)?.data} />
        )}
        <div className="justify-center mt-20 mb-40">
          <HeadingAtom
            level={5}
            text="Based on your experience, we think these resources will be helpful."
          ></HeadingAtom>
        </div>

        <InstructorResourceOrganism />
      </div>
      {/* <FooterOrganism /> */}
      {/* <InstructorDashboardSideBarOrganism /> */}
    </>
  );
};

export default InstructorDashboardPage;
