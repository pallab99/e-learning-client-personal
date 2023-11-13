import { Typography } from 'antd';
import { BaseType } from 'antd/es/typography/Base';
// import './heading.style.scss';
import React from 'react';
const { Paragraph } = Typography;
interface ParagraphAtomProps {
  text?: string;
  type?: BaseType;
  className?: string;
  ellipsis?: boolean;
}
const ParagraphAtom: React.FC<ParagraphAtomProps> = ({
  text,
  type,
  className,
  ellipsis,
}) => {
  return (
    <Paragraph type={type} className={className} ellipsis={ellipsis}>
      {text}
    </Paragraph>
  );
};

export default ParagraphAtom;
