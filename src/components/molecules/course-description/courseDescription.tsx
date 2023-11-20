import React from 'react';
import './courseDescription.scss';
import { Parser } from 'html-to-react';
import HeadingAtom from '../../atoms/heading/heading.atom';
const CourseDescription: React.FC = ({ courseDescription }: any) => {
  return (
    <div className="course_description_main_container mb-40">
      <HeadingAtom text="Course Description" level={3} className="mb-30" />
      {Parser().parse(courseDescription)}
    </div>
  );
};

export default CourseDescription;
