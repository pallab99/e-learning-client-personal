import { Button } from "antd";
import { SizeType } from "antd/es/config-provider/SizeContext";
export interface IButtonAtomProps {
  type?: "primary" | "default" | "dashed" | "link" | "text";
  loading?: boolean;
  dangerBtn?: boolean;
  disabled?: boolean;
  handleButtonClick?: (data: any) => void;
  text?: string;
  htmlType?: "button" | "submit" | "reset";
  className?: string;
  link?: string;
  size?: SizeType;
  style?: React.CSSProperties;
  icon?: any;
}
const ButtonAtom = ({
  type,
  loading,
  dangerBtn,
  disabled,
  handleButtonClick,
  text,
  htmlType,
  className,
  size,
  style,
  icon,
}: IButtonAtomProps) => {
  return (
    <Button
      className={className}
      type={type}
      loading={loading}
      disabled={disabled}
      onClick={handleButtonClick}
      htmlType={htmlType}
      danger={dangerBtn}
      size={size}
      style={style}
      icon={icon}
    >
      {text}
    </Button>
  );
};

export default ButtonAtom;
