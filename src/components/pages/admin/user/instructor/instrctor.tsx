import { Image } from 'antd';
import AllInstructorTableOrganism from '../../../../organism/admin/user/instructor/instructor';
import useGetAllInstructor from '../../../../../hooks/user/useGetAllInstructor';
import AdminDashboardSideBarOrganism from '../../../../organism/admin/sidebar/sidebar.organism';

const AllInstructorPage = () => {
  const { data, loading } = useGetAllInstructor();
  const tableData =
    data &&
    data?.map((ele: any) => {
      return {
        id: ele?._id,
        avatar: <Image src={ele?.user?.dp}></Image>,
        name: ele?.user?.name,
        email: ele?.email,
        phoneNumber: ele?.user?.phoneNumber,
        createdAt: ele?.createdAt,
      };
    });

  return (
    <div className="all-student-page">
      <AdminDashboardSideBarOrganism />
      <div className="admin_right_side_div">
        <AllInstructorTableOrganism data={tableData} loading={loading} />
      </div>
    </div>
  );
};

export default AllInstructorPage;
