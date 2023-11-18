import './courseDetails.scss';

import CourseDetailsLandingPage from '../../molecules/course-details/course-details-landing-page/courseDetailsLandingPage';
import WhatYouWillLearn from '../../molecules/course-details/what-you-will-learn/whatYouWillLearn';
import CourseContent from '../../molecules/course-details/course-content/courseContent';
import Requirements from '../../molecules/course-details/requirements/requirements';
import CourseReview from '../../molecules/course-review/courseReview';
const CourseDetailsOrganism = () => {
  return (
    <>
      <CourseDetailsLandingPage />
      <WhatYouWillLearn />
      <CourseContent />
      <Requirements />
      <CourseReview />
    </>
  );
};

export default CourseDetailsOrganism;
