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

  //   {
  //     id: '1',
  //     avatar: <Avatar icon={<UserOutlined />}></Avatar>,
  //     name: 'John Brown',
  //     email: 'johnbrown@gmail.com',
  //     phoneNumber: '01984101170',
  //     createdAt: '2023-10-27T07:07:06.369+00:00',
  //   },
  //   {
  //     id: '2',
  //     avatar: <Avatar icon={<UserOutlined />}></Avatar>,
  //     name: 'John doe',
  //     email: 'johndoe@gmail.com',
  //     phoneNumber: '01984101170',
  //     createdAt: '2023-11-06T09:38:21.193+00:00',
  //   },
  //   {
  //     id: '3',
  //     avatar: <Avatar icon={<UserOutlined />}></Avatar>,
  //     name: 'steve smith',
  //     email: 'stevesmith@gmail.com',
  //     phoneNumber: '01984101170',
  //     createdAt: '2023-11-09T05:20:02.982+00:00',
  //   },
  //   {
  //     id: '4',
  //     avatar: <Avatar icon={<UserOutlined />} />,
  //     name: 'Virat kohli',
  //     email: 'viratkohli@gmail.com',
  //     phoneNumber: '01984101170',
  //     createdAt: '2023-10-28T10:13:57.142+00:00',
  //   },
  //   {
  //     id: '5',
  //     avatar: <Avatar icon={<UserOutlined />} />,
  //     name: 'Pallab majumdar',
  //     email: '@gmail.com',
  //     phoneNumber: '01984101170',
  //     createdAt: '2023-10-28T10:13:57.142+00:00',
  //   },
  //   {
  //     id: '6',
  //     avatar: <Avatar icon={<UserOutlined />} />,
  //     name: 'Virat kohli',
  //     email: 'viratkohli@gmail.com',
  //     phoneNumber: '01984101170',
  //     createdAt: '2023-10-28T10:13:57.142+00:00',
  //   },
  //   {
  //     id: '7',
  //     avatar: <Avatar icon={<UserOutlined />} />,
  //     name: 'Virat kohli',
  //     email: 'viratkohli@gmail.com',
  //     phoneNumber: '01984101170',
  //     createdAt: '2023-10-28T10:13:57.142+00:00',
  //   },
  // ];

  //   const foramattedData = data.map((item: any) => ({
  //     key: item.key,
  //     avatar: <Avatar icon={<UserOutlined />}></Avatar>,
  //     name: item.name,
  //     email: item.email,
  //     phoneNumber: item.phoneNumber,
  //     createdAt: item.createdAt,
  //     action: (
  //       <>
  //         <ButtonAtom
  //           text="edit"
  //           type="default"
  //           handleButtonClick={() => handleEdit(item.key)}
  //         />
  //         <ButtonAtom
  //           text="delete"
  //           type="default"
  //           dangerBtn={true}
  //           handleButtonClick={() => handleDelete(item.key)}
  //         />
  //       </>
  //     ),
  //   }));
  return (
    <div className="all-student-page">
      <AllStudentTableOrganism data={tableData} loading={loading} />
    </div>
  );
};

export default AllStudentPage;
