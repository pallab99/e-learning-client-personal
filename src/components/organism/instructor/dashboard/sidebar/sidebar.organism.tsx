import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  PieChartOutlined,
  MessageOutlined,
  SignalFilled,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import './sidebar.style.scss';
type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  path: string,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: 'group'
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
  getItem('Courses', '1', '/instructor/courses', <PieChartOutlined />),
  getItem('Communication', 'sub1', '/communication', <MessageOutlined />, [
    getItem('QNA', '2', '/qna'),
    getItem('Messages', '3', '/messages'),
    getItem('Assignments', '4', '/assignments'),
  ]),
  getItem('Performance', 'sub2', '/performance', <SignalFilled />, [
    getItem('Students', '5', '/students'),
    getItem('Reviews', '6', '/reviews'),
  ]),
];

const InstructorDashboardSideBarOrganism: React.FC = () => {
  const [collapsed, setCollapsed] = useState(true);

  const handleMouseEnter = () => {
    setCollapsed(false); // expand the menu when mouse enters
  };

  const handleMouseLeave = () => {
    setCollapsed(true); // collapse the menu when mouse leaves
  };
  return (
    <div
      className="instructor-dashboard-sidebar"
      style={{ width: 300, height: '100vh' }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Menu
        style={{ height: 'inherit' }}
        defaultSelectedKeys={['1']}
        mode="inline"
        theme="dark"
        inlineCollapsed={collapsed}
        items={items}
      />
    </div>
  );
};

export default InstructorDashboardSideBarOrganism;
