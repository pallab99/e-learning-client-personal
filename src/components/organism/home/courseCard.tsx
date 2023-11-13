import React from 'react';
import CourseCardMolecules, {
  ICourseCardMolecules,
} from '../../molecules/course-card/courseCard';

const CourseCardOrganism: React.FC<ICourseCardMolecules> = ({
  courseTitle,
  img,
  tag,
  instructorName,
  rating,
}) => {
  return (
    <div>
      <CourseCardMolecules
        courseTitle={courseTitle}
        img={img}
        tag={tag}
        instructorName={instructorName}
        rating={rating}
      />
    </div>
  );
};

export default CourseCardOrganism;
