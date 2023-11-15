import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import React, { useState } from 'react';
import './sidebar.style.scss';
type MenuItem = Required<MenuProps>['items'][number];

const DesktopSideBar: React.FC = ({ items }: any) => {
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
        // theme="dark"
        // inlineCollapsed={collapsed}
        items={items}
      />
    </div>
  );
};

export default DesktopSideBar;
