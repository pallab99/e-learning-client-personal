import {
  FacebookFilled,
  HeartOutlined,
  InstagramFilled,
  LinkedinFilled,
  NotificationOutlined,
  ShoppingCartOutlined,
  TwitterCircleFilled,
  UserOutlined,
} from "@ant-design/icons";
import React from "react";
import "./icon.style.scss";
const IconTypes = {
  user: UserOutlined,
  notification: NotificationOutlined,
  linkedIn: LinkedinFilled,
  facebook: FacebookFilled,
  twitter: TwitterCircleFilled,
  instagram: InstagramFilled,
  heart: HeartOutlined,
  cart: ShoppingCartOutlined,
};
interface IIconAtom {
  type: keyof typeof IconTypes;
  size?: string;
  handleOnClick?: () => void;
  className?: string;
}

const IconAtom: React.FC<IIconAtom> = ({
  type,
  size,
  handleOnClick,
  className,
}) => {
  const Icon = IconTypes[type];
  return (
    <Icon
      className={className}
      style={{ fontSize: size }}
      onClick={handleOnClick}
    />
  );
};

export default IconAtom;
