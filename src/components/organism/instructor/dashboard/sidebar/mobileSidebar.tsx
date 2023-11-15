import { MenuOutlined } from "@ant-design/icons";
import { Button, Menu } from "antd";
import { useState } from "react";

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
      <Menu
        items={items}
        visible={visible}
        onClose={onClose}
        placement="left"
      />
    </div>
  );
};

export default MobileSideBar;
