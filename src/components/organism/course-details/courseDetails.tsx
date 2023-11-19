import './courseDetails.scss';

import CourseDetailsLandingPage from '../../molecules/course-details/course-details-landing-page/courseDetailsLandingPage';
import WhatYouWillLearn from '../../molecules/course-details/what-you-will-learn/whatYouWillLearn';
import CourseContent from '../../molecules/course-details/course-content/courseContent';
import Requirements from '../../molecules/course-details/requirements/requirements';
import CourseReview from '../../molecules/course-review/courseReview';
import QnAModal from '../../molecules/QNA/qna';
import Quiz from '../../molecules/quiz-submision/quizSubmission';
const CourseDetailsOrganism = () => {
  return (
    <>
      <CourseDetailsLandingPage />
      <WhatYouWillLearn />
      <CourseContent />
      <Requirements />
      <CourseReview />
      <QnAModal />
      <Quiz />
    </>
  );
};

export default CourseDetailsOrganism;
