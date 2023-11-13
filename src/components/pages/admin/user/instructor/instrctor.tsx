import { Image } from 'antd';
import AllInstructorTableOrganism from '../../../../organism/admin/user/instructor/instructor';
import useGetAllInstructor from '../../../../../hooks/user/useGetAllInstructor';

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
      <AllInstructorTableOrganism data={tableData} loading={loading} />
    </div>
  );
};

export default AllInstructorPage;
