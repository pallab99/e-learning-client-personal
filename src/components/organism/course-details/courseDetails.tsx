import './courseDetails.scss';

import { useParams } from 'react-router-dom';
import useGetCourseById from '../../../hooks/course/useGetCourseById';
import CourseDetailsLandingPageSkeleton from '../../atoms/courseDetailsLandingPageSkeleton/courseDetailsLandingPageSkeleton';
import WhatYouWillLearnSkeleton from '../../atoms/whatYouWillLearnSkeleton/whatYouWillLearnSkeleton';
import CourseDescription from '../../molecules/course-description/courseDescription';
import CourseContent from '../../molecules/course-details/course-content/courseContent';
import CourseDetailsLandingPage from '../../molecules/course-details/course-details-landing-page/courseDetailsLandingPage';
import Requirements from '../../molecules/course-details/requirements/requirements';
import WhatYouWillLearn from '../../molecules/course-details/what-you-will-learn/whatYouWillLearn';
import CourseReview from '../../molecules/course-review/courseReview';
import QuizSubmissionSkeleton from '../../atoms/quiz-submission-skeleton/quizSubmissionSkeleton';
const CourseDetailsOrganism = () => {
  const { courseId } = useParams();
  const { data, loading } = useGetCourseById(courseId as string);
  
  return (
    <>
      {loading ? (
        <CourseDetailsLandingPageSkeleton />
      ) : (
        <CourseDetailsLandingPage courseBasicInfo={data} loading={loading} />
      )}
      {loading ? (
        <WhatYouWillLearnSkeleton />
      ) : (
        <WhatYouWillLearn
          whatWillYouLearnData={data?.data?.benefits}
          loading={loading}
        />
      )}
      {loading ? <QuizSubmissionSkeleton /> : <CourseContent />}
      {loading ? (
        <WhatYouWillLearn />
      ) : (
        <Requirements prerequisitesData={data?.data?.prerequisites} />
      )}
      <CourseDescription courseDescription={data?.data?.description} />
      <CourseReview />
      {/* <QnAModal /> */}
      {/* <Quiz /> */}
    </>
  );
};

export default CourseDetailsOrganism;
