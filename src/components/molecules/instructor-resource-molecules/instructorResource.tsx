import React from 'react';
import HeadingAtom from '../../atoms/heading/heading.atom';
import ParagraphAtom from '../../atoms/paragraph/paragraph.atom';
import ButtonAtom from '../../atoms/button/button.attom';
import FlexAtom from '../../atoms/flex/flex.atom';
import './instructorResouces.scss';
import { Card } from 'antd';
export interface IInstructorResource {
  img: string;
  headingText: string;
  paragraphText: string;
  btnText: string;
}
const InstructorResourceMolecules: React.FC<IInstructorResource> = ({
  img,
  headingText,
  paragraphText,
  btnText,
}) => {
  return (
    <Card
      className="mt-20 instructor-resource-molecules-card"
      style={{ padding: '0px' }}
      hoverable
    >
      <div className="instructor-resource-molecules-two-div">
        <div className="instructor-resource-molecules-left">
          <img src={img} alt="img" />
        </div>
        <div className="instructor-resource-molecules-right">
          <HeadingAtom level={4} text={headingText} />
          <ParagraphAtom text={paragraphText} />
          <ButtonAtom text={btnText} type="link" />
        </div>
      </div>
    </Card>
  );
};

export default InstructorResourceMolecules;
