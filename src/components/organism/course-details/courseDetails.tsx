import './courseDetails.scss';

import { useParams } from 'react-router-dom';
import useGetCourseById from '../../../hooks/course/useGetCourseById';
import CourseDetailsLandingPageSkeleton from '../../atoms/courseDetailsLandingPageSkeleton/courseDetailsLandingPageSkeleton';
import WhatYouWillLearnSkeleton from '../../atoms/whatYouWillLearnSkeleton/whatYouWillLearnSkeleton';
import QnAModal from '../../molecules/QNA/qna';
import CourseContent from '../../molecules/course-details/course-content/courseContent';
import CourseDetailsLandingPage from '../../molecules/course-details/course-details-landing-page/courseDetailsLandingPage';
import Requirements from '../../molecules/course-details/requirements/requirements';
import WhatYouWillLearn from '../../molecules/course-details/what-you-will-learn/whatYouWillLearn';
import CourseReview from '../../molecules/course-review/courseReview';
import CourseDescription from '../../molecules/course-description/courseDescription';
const CourseDetailsOrganism = () => {
  const { courseId } = useParams();
  const { data, loading } = useGetCourseById(courseId as string);
  // const {}=useGetCourse
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
      <CourseContent />
      {loading ? (
        <WhatYouWillLearn />
      ) : (
        <Requirements prerequisitesData={data?.data?.prerequisites} />
      )}
      <CourseDescription courseDescription={data?.data?.description} />
      <CourseReview />
      <QnAModal />
      {/* <Quiz /> */}
    </>
  );
};

export default CourseDetailsOrganism;
