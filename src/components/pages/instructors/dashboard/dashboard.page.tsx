import useGetAllCourseByInstructor from '../../../../hooks/course/useGetCourseByInstructor';
import InstructorCourseListSkeletonAtom from '../../../atoms/instructorCourseListSkeleton/instructorCourseListSkeleton';
import CourseCardOrganism from '../../../organism/instructor/dashboard/dashboard/courseCard.organism';
import CreateCourseHeaderOrganism from '../../../organism/instructor/dashboard/dashboard/createCourse.organism';
import InstructorDashboardSideBarOrganism from '../../../organism/instructor/dashboard/sidebar/sidebar.organism';
import './dashboard.style.scss';
const InstructorDashboardPage = () => {
  const { data, loading } = useGetAllCourseByInstructor();

  return (
    <div className="instructor-dashboard-div-wrapper">
      <InstructorDashboardSideBarOrganism />
      <div className="instructor-dashboard-div">
        <CreateCourseHeaderOrganism></CreateCourseHeaderOrganism>
        {loading ? (
          [1, 2, 3, 4, 5].map((ele: any) => {
            return <InstructorCourseListSkeletonAtom key={ele} />;
          })
        ) : (
          <CourseCardOrganism data={(data as any)?.data} />
        )}
      </div>
    </div>
  );
};

export default InstructorDashboardPage;
