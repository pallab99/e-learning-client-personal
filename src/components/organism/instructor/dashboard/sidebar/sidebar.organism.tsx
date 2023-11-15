import {
  MessageOutlined,
  PieChartOutlined,
  SignalFilled,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import React, { useState } from "react";
import { useMediaQuery } from "react-responsive";
import { Link } from "react-router-dom";
import DesktopSideBar from "./desktopSidebar";
import MobileSideBar from "./mobileSidebar";
import "./sidebar.style.scss";
type MenuItem = Required<MenuProps>["items"][number];
function getItem(
  label: React.ReactNode,
  key: React.Key,
  path: string,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: "group"
): MenuItem {
  return {
    key,
    icon,
    children,
    label: <Link to={path}>{label}</Link>,
    type,
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem("Courses", "1", "/instructor/courses", <PieChartOutlined />),
  getItem("Communication", "sub1", "/communication", <MessageOutlined />, [
    getItem("QNA", "2", "/qna"),
    getItem("Messages", "3", "/messages"),
    getItem("Assignments", "4", "/assignments"),
  ]),
  getItem("Performance", "sub2", "/performance", <SignalFilled />, [
    getItem("Students", "5", "/students"),
    getItem("Reviews", "6", "/reviews"),
  ]),
];

const InstructorDashboardSideBarOrganism: React.FC = () => {
  const [collapsed, setCollapsed] = useState(true);

  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-device-width: 1224px)",
  });

  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1224px)" });
  return (
    <div className="instructor-dashboard-sidebar">
      {isDesktopOrLaptop && <DesktopSideBar items={items} />}
      {isTabletOrMobile && <MobileSideBar items={items} />}
    </div>
  );
};

export default InstructorDashboardSideBarOrganism;
