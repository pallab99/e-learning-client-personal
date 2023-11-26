import { UserOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Avatar, Dropdown, message } from 'antd';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthApi from '../../../../api/AuthApi';
import { ADMIN, STUDENT } from '../../../../constant/userType';
import { logOut } from '../../../../redux/slices/authSlice';
import { useAppDispatch, useAppSelector } from '../../../../redux/store';
import ParagraphAtom from '../../../atoms/paragraph/paragraph.atom';

const DesktopHeaderDropdownMenuMolecules = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isStudent = useAppSelector((state) => state?.auth?.userData?.rank);
  const userData = useAppSelector((state) => state?.auth?.userData);

  const logout = async () => {
    try {
      const res = await AuthApi.logOut();
      message.success(res?.data.message);
      if (userData?.rank === ADMIN) {
        navigate('/admin/log-in');
      } else {
        navigate('/log-in');
      }
      dispatch(logOut());
    } catch (error: any) {
      message.error(error.response.message);
    }
  };
  const items: MenuProps['items'] = [
    {
      label: (
        <Link to={'/profile/basic-information'}>
          <ParagraphAtom text="profile"></ParagraphAtom>
        </Link>
      ),
      key: '0',
    },
    isStudent === STUDENT
      ? {
          label: (
            <ParagraphAtom
              text="cart"
              className="text-18 cursor-pointer"
            ></ParagraphAtom>
          ),
          key: '1',
        }
      : null,
    {
      type: 'divider',
    },
    {
      label: (
        <ParagraphAtom
          text="Logout"
          className="text-18 cursor-pointer"
          type="danger"
          handleOnClick={logout}
        ></ParagraphAtom>
      ),
      key: '3',
    },
  ];
  const [visible, setVisible] = useState(false);

  const handleVisibleChange = (flag: boolean) => {
    setVisible(flag);
  };

  return (
    <>
      {userData.accessToken && (
        <div id="my_profile">
          <Dropdown
            menu={{ items }}
            open={visible}
            onOpenChange={handleVisibleChange}
            trigger={['hover']}
          >
            <Avatar
              size={30}
              icon={<UserOutlined />}
              className="cursor-pointer"
            />
          </Dropdown>
        </div>
      )}
    </>
  );
};

export default DesktopHeaderDropdownMenuMolecules;
