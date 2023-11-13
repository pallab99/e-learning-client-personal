import { Image } from 'antd';
import useGetAllStudent from '../../../../../hooks/user/useGetAllStudent';
import AllStudentTableOrganism from '../../../../organism/admin/user/student/students';
import './student.scss';

const AllStudentPage = () => {
  const { data, loading } = useGetAllStudent();

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
      <AllStudentTableOrganism data={tableData} loading={loading} />
    </div>
  );
};

export default AllStudentPage;
