import './courseDetails.scss';

import CourseDetailsLandingPage from '../../molecules/course-details/course-details-landing-page/courseDetailsLandingPage';
import WhatYouWillLearn from '../../molecules/course-details/what-you-will-learn/whatYouWillLearn';
import CourseContent from '../../molecules/course-details/course-content/courseContent';
import Requirements from '../../molecules/course-details/requirements/requirements';
import CourseReview from '../../molecules/course-review/courseReview';
import QnAModal from '../../molecules/QNA/qna';
const CourseDetailsOrganism = () => {
  return (
    <>
      <CourseDetailsLandingPage />
      <WhatYouWillLearn />
      <CourseContent />
      <Requirements />
      <CourseReview />
      <QnAModal></QnAModal>
    </>
  );
};

export default CourseDetailsOrganism;
