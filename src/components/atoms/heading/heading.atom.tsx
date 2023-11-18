import { Typography } from 'antd';
import { BaseType } from 'antd/es/typography/Base';
import './heading.style.scss';
const { Title } = Typography;
interface HeadingAtomProps {
  text?: string;
  level?: 1 | 2 | 3 | 4 | 5;
  type?: BaseType;
  className?: string;
  ellipsis?: boolean;
  style?: any;
}
const HeadingAtom = ({
  text,
  level,
  type,
  className,
  ellipsis,
  style,
}: HeadingAtomProps) => {
  return (
    <Title
      level={level}
      type={type}
      className={className}
      ellipsis={ellipsis}
      style={style}
    >
      {text}
    </Title>
  );
};

export default HeadingAtom;
