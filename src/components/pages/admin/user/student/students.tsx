import { Image } from 'antd';
import useGetAllStudent from '../../../../../hooks/user/useGetAllStudent';
import AllStudentTableOrganism from '../../../../organism/admin/user/student/students';
import './student.scss';
import AdminDashboardSideBarOrganism from '../../../../organism/admin/sidebar/sidebar.organism';

const AllStudentPage = () => {
  const { data, loading } = useGetAllStudent();

  const tableData =
    data &&
    data?.map((ele: any) => {
      const date = new Date(ele?.createdAt);
      const dateString = date.toLocaleDateString();

      return {
        id: ele?._id,
        avatar: <Image src={ele?.user?.dp}></Image>,
        name: ele?.user?.name,
        email: ele?.email,
        phoneNumber: ele?.user?.phoneNumber,
        createdAt: dateString,
      };
    });

  return (
    <div className="all-student-page">
      <AdminDashboardSideBarOrganism />
      <div className="admin_right_side_div">
        <AllStudentTableOrganism data={tableData} loading={loading} />
      </div>
    </div>
  );
};

export default AllStudentPage;
