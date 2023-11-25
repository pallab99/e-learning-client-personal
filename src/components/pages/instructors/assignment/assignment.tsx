import { Empty } from 'antd';
import useGetAllCourseByInstructor from '../../../../hooks/course/useGetCourseByInstructor';
import InstructorCourseListSkeletonAtom from '../../../atoms/instructorCourseListSkeleton/instructorCourseListSkeleton';
import CourseCardOrganismAssignment from '../../../organism/instructor/dashboard/dashboard/courseCard.organismAssignments';
import InstructorDashboardSideBarOrganism from '../../../organism/instructor/dashboard/sidebar/sidebar.organism';

const ViewAllAssignmentPage = () => {
  const { data, loading } = useGetAllCourseByInstructor();
  console.log(loading);

  return (
    <div className="instructor-dashboard-div-wrapper">
      <InstructorDashboardSideBarOrganism />
      <div className="instructor-dashboard-div">
        {loading ? (
          [1, 2, 3, 4, 5].map((ele: any) => {
            return <InstructorCourseListSkeletonAtom key={ele} />;
          })
        ) : (
          <>
            {data?.data?.length <= 0 ? (
              <Empty className="mt-40" />
            ) : (
              <div className="mt-50">
                <CourseCardOrganismAssignment data={(data as any)?.data} />
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default ViewAllAssignmentPage;
