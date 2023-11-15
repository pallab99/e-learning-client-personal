import { UserOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Avatar, Dropdown } from "antd";
import { useState } from "react";
import { Link } from "react-router-dom";
import ParagraphAtom from "../../../atoms/paragraph/paragraph.atom";

const items: MenuProps["items"] = [
  {
    label: (
      <Link to={"/profile/basic-information"}>
        <ParagraphAtom text="profile"></ParagraphAtom>
      </Link>
    ),
    key: "0",
  },
  {
    label: (
      <ParagraphAtom
        text="cart"
        className="text-18 cursor-pointer"
      ></ParagraphAtom>
    ),
    key: "1",
  },
  {
    type: "divider",
  },
  {
    label: "3rd menu item",
    key: "3",
  },
];
const DesktopHeaderDropdownMenuMolecules = () => {
  const [visible, setVisible] = useState(false);

  const handleVisibleChange = (flag: boolean) => {
    setVisible(flag);
  };

  return (
    <Dropdown
      menu={{ items }}
      open={visible}
      onOpenChange={handleVisibleChange}
      trigger={["hover"]}
    >
      <Avatar size={30} icon={<UserOutlined />} className="cursor-pointer" />
    </Dropdown>
  );
};

export default DesktopHeaderDropdownMenuMolecules;
