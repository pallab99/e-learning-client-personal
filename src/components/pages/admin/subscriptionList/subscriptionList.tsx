//@ts-nocheck
import { useState } from 'react';
import useGetAllSubscriptionListByAdmin from '../../../../hooks/subscriptionList/getAllSubscriptionList';
import AllSubscriptionTableOrganism from '../../../organism/admin/subscriptionList/subscriptionList';
import AdminDashboardSideBarOrganism from '../../../organism/admin/sidebar/sidebar.organism';

const AllSubscriptionListPage = () => {
  const [selectValue, setSelectValue] = useState({});
  const [recallApi, setRecallApi] = useState(false);
  const { loading, data } = useGetAllSubscriptionListByAdmin(recallApi);
  const tableData = data?.data?.map((ele: any) => {
    return {
      _id: ele?._id,
      dp: ele?.user?.dp,
      userName: ele?.user?.name,
      pendingCourses: ele?.courses?.length,
      courses: ele?.courses,
    };
  });

  return (
    <div className="all-student-page">
      <AdminDashboardSideBarOrganism />
      <div className="admin_right_side_div">
        <AllSubscriptionTableOrganism
          data={tableData}
          loading={loading}
          setRecallApi={setRecallApi}
          recallApi={recallApi}
        />
      </div>
    </div>
  );
};

export default AllSubscriptionListPage;
