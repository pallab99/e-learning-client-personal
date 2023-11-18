import React from 'react';
import ButtonAtom from '../../../atoms/button/button.attom';
import HeadingAtom from '../../../atoms/heading/heading.atom';
import ParagraphAtom from '../../../atoms/paragraph/paragraph.atom';
import './courseContent.scss';
import type { CollapseProps } from 'antd';
import { Collapse } from 'antd';

const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;

const items: CollapseProps['items'] = [
  {
    key: '1',
    label: (
      <div className="accordion_panel_title">
        <HeadingAtom text="Front-End Web Development" level={5}></HeadingAtom>
        <ParagraphAtom text="7 lectures 30 mins"></ParagraphAtom>
      </div>
    ),
    children: <p>{text}</p>,
  },
  {
    key: '2',
    label: (
      <div className="accordion_panel_title">
        <HeadingAtom text="Backend Web Development" level={5}></HeadingAtom>
        <ParagraphAtom text="7 lectures 30 mins"></ParagraphAtom>
      </div>
    ),
    children: <p>{text}</p>,
  },
  {
    key: '3',
    label: (
      <div className="accordion_panel_title">
        <HeadingAtom text="Full-Stack Web Development" level={5}></HeadingAtom>
        <ParagraphAtom text="7 lectures 30 mins"></ParagraphAtom>
      </div>
    ),
    children: <p>{text}</p>,
  },
  {
    key: '4',
    label: (
      <div className="accordion_panel_title">
        <HeadingAtom text="Front-End Web Development" level={5}></HeadingAtom>
        <ParagraphAtom text="7 lectures 30 mins"></ParagraphAtom>
      </div>
    ),
    children: <p>{text}</p>,
  },
];

const CourseContent = () => {
  const [activeKeys, setActiveKeys] = React.useState([]);
  const controlCollapse = () => {
    if (activeKeys.length === items.length) {
      setActiveKeys([]);
    } else {
      setActiveKeys(items?.map((item: any) => item.key));
    }
  };
  return (
    <div className="course-curriculum">
      <div className="course-curriculum_header">
        <HeadingAtom text="Course Content" level={3} />
      </div>
      <div className="course-curriculum_sub_header">
        <ParagraphAtom text="44 sections  •  380 lectures  •  62h 49m total length" />
        <ButtonAtom
          text={
            activeKeys.length === items.length
              ? 'Collapse All Section'
              : 'Expand All Section'
          }
          type="link"
          size="large"
          style={{ color: '#5624d0' }}
          handleButtonClick={controlCollapse}
        />
      </div>
      <div className="course-curriculum_content mt-20">
        <Collapse
          defaultActiveKey={['1']}
          items={items}
          activeKey={activeKeys}
          onChange={setActiveKeys}
          style={{ backgroundColor: '#f6f9fa' }}
        />
      </div>
    </div>
  );
};

export default CourseContent;
