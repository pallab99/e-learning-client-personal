//@ts-nocheck
import { useState } from "react";
import useGetAllSubscriptionListByAdmin from "../../../../hooks/subscriptionList/getAllSubscriptionList";
import AllSubscriptionTableOrganism from "../../../organism/admin/subscriptionList/subscriptionList";

const AllSubscriptionListPage = () => {
  const [selectValue, setSelectValue] = useState({});
  const { loading, data } = useGetAllSubscriptionListByAdmin();
  console.log("jjj", data);

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
    <AllSubscriptionTableOrganism
      data={tableData}
      loading={loading}
      // setSelectValue={setSelectValue}
    />
  );
};

export default AllSubscriptionListPage;
