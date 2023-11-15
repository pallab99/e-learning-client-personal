import { MenuOutlined } from '@ant-design/icons';
import { Button, Drawer, Menu } from 'antd';
import { useState } from 'react';

const MobileSideBar = ({ items }: any) => {
  const [visible, setVisible] = useState(false);

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  return (
    <div>
      <Button type="primary" onClick={showDrawer}>
        <MenuOutlined />
      </Button>
      <Drawer open={visible} onClose={onClose} placement="left">
        <Menu items={items} placement="left" mode="inline" />
      </Drawer>
    </div>
  );
};

export default MobileSideBar;
