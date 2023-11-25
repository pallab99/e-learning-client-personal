//@ts-nocheck
import { useState } from 'react';
import useGetAllCourseByAdmin from '../../../../../hooks/course/getAllCourseAdmin';
import AllPublishedCourseTableOrganism from '../../../../organism/admin/course/published/publishedCourse';
import AdminDashboardSideBarOrganism from '../../../../organism/admin/sidebar/sidebar.organism';

const AllPublishedCoursePage = () => {
  const [selectValue, setSelectValue] = useState({});
  const [recallApi, setRecallApi] = useState(false);
  const { loading, data } = useGetAllCourseByAdmin(recallApi, selectValue);
  const tableData = data?.courses?.map((ele: any) => {
    return {
      _id: ele?._id,
      title: ele?.title,
      totalStudent: ele?.students?.length,
      category: ele?.category,
      level: ele?.level,
      totalHours: ele?.totalHours | 0,
      numberOfSection: ele?.courseSection?.length | 0,
      thumbnail: ele?.thumbnail,
      instructors: ele?.instructors?.name | 'Pallab Majumdar',
    };
  });

  return (
    <div className="all-student-page">
      <AdminDashboardSideBarOrganism />
      <div className="admin_right_side_div">
        <AllPublishedCourseTableOrganism
          loading={loading}
          data={tableData}
          setSelectValue={setSelectValue}
          recallApi={recallApi}
          setRecallApi={setRecallApi}
        />
      </div>
    </div>
  );
};

export default AllPublishedCoursePage;
