import { Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import AllAdminTableOrganism from '../../../../organism/admin/user/admin/admin';

const AllAdminPage = () => {
  const data = [
    {
      id: '1',
      avatar: <Avatar icon={<UserOutlined />}></Avatar>,
      name: 'John Brown',
      email: 'johnbrown@gmail.com',
      phoneNumber: '01984101170',
      createdAt: '2023-10-27T07:07:06.369+00:00',
    },
    {
      id: '2',
      avatar: <Avatar icon={<UserOutlined />}></Avatar>,
      name: 'John doe',
      email: 'johndoe@gmail.com',
      phoneNumber: '01984101170',
      createdAt: '2023-11-06T09:38:21.193+00:00',
    },
    {
      id: '3',
      avatar: <Avatar icon={<UserOutlined />}></Avatar>,
      name: 'steve smith',
      email: 'stevesmith@gmail.com',
      phoneNumber: '01984101170',
      createdAt: '2023-11-09T05:20:02.982+00:00',
    },
    {
      id: '4',
      avatar: <Avatar icon={<UserOutlined />} />,
      name: 'Virat kohli',
      email: 'viratkohli@gmail.com',
      phoneNumber: '01984101170',
      createdAt: '2023-10-28T10:13:57.142+00:00',
    },
    {
      id: '5',
      avatar: <Avatar icon={<UserOutlined />} />,
      name: 'Pallab majumdar',
      email: '@gmail.com',
      phoneNumber: '01984101170',
      createdAt: '2023-10-28T10:13:57.142+00:00',
    },
    {
      id: '6',
      avatar: <Avatar icon={<UserOutlined />} />,
      name: 'Virat kohli',
      email: 'viratkohli@gmail.com',
      phoneNumber: '01984101170',
      createdAt: '2023-10-28T10:13:57.142+00:00',
    },
    {
      id: '7',
      avatar: <Avatar icon={<UserOutlined />} />,
      name: 'Virat kohli',
      email: 'viratkohli@gmail.com',
      phoneNumber: '01984101170',
      createdAt: '2023-10-28T10:13:57.142+00:00',
    },
  ];

  return (
    <div className="all-student-page">
      <AllAdminTableOrganism data={data} />
    </div>
  );
};

export default AllAdminPage;
