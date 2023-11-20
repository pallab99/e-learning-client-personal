import { UserOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Avatar, Dropdown } from "antd";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../../../redux/store";
import ParagraphAtom from "../../../atoms/paragraph/paragraph.atom";

const MobileHeaderDropdownMenuMolecules = ({ handleOpenCartDrawer }: any) => {
  const student = useAppSelector((state) => state.auth.userData.rank);
  const items: MenuProps["items"] = [
    {
      label: <Link to={"/profile/basic-information"}>Profile</Link>,
      key: "0",
    },
    {
      label: (
        <ParagraphAtom
          text="cart"
          className="text-18 cursor-pointer"
          handleOnClick={handleOpenCartDrawer}
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
  return (
    <Dropdown menu={{ items }} trigger={["click"]}>
      <Avatar size={30} icon={<UserOutlined />} className="cursor-pointer" />
    </Dropdown>
  );
};

export default MobileHeaderDropdownMenuMolecules;
