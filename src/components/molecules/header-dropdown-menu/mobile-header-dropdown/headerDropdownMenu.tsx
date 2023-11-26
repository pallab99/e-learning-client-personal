import { UserOutlined } from '@ant-design/icons';
import { Avatar, Dropdown, type MenuProps } from 'antd';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../../../../redux/store';
import ParagraphAtom from '../../../atoms/paragraph/paragraph.atom';
const MobileHeaderDropdownMenuMolecules = ({ handleOpenCartDrawer }: any) => {
  const student = useAppSelector((state) => state.auth.userData.rank);
  const userData = useAppSelector((state) => state.auth.userData);
  const items: MenuProps['items'] = [
    {
      label: <Link to={'/profile/basic-information'}>Profile</Link>,
      key: '0',
    },
    {
      label: (
        <ParagraphAtom
          text="cart"
          className="text-18 cursor-pointer"
          handleOnClick={handleOpenCartDrawer}
        ></ParagraphAtom>
      ),
      key: '1',
    },
    {
      label: (
        <div>
          <Link
            to="/my-learning"
            style={{ textDecoration: 'none' }}
            id="my_learning_link"
          >
            <ParagraphAtom
              text="My Learning"
              className="text-18 cursor-pointer"
            />
          </Link>
        </div>
      ),
      key: '2',
    },
    {
      type: 'divider',
    },
    {
      label: '3rd menu item',
      key: '3',
    },
  ];
  return (
    <>
      {userData.accessToken && (
        <Dropdown menu={{ items }} trigger={['click']}>
          <Avatar
            size={30}
            icon={<UserOutlined />}
            className="cursor-pointer"
          />
        </Dropdown>
      )}
    </>
  );
};

export default MobileHeaderDropdownMenuMolecules;
