//@ts-nocheck
import { useParams } from "react-router-dom";
import useGetCourseById from "../../../hooks/course/useGetCourseById";
import { useScrollToTop } from "../../../hooks/useScrollToTop";
import CourseDetailsLandingPageSkeleton from "../../atoms/courseDetailsLandingPageSkeleton/courseDetailsLandingPageSkeleton";
import QuizSubmissionSkeleton from "../../atoms/quiz-submission-skeleton/quizSubmissionSkeleton";
import WhatYouWillLearnSkeleton from "../../atoms/whatYouWillLearnSkeleton/whatYouWillLearnSkeleton";
import CourseDescription from "../../molecules/course-description/courseDescription";
import CourseContent from "../../molecules/course-details/course-content/courseContent";
import CourseDetailsLandingPage from "../../molecules/course-details/course-details-landing-page/courseDetailsLandingPage";
import Requirements from "../../molecules/course-details/requirements/requirements";
import WhatYouWillLearn from "../../molecules/course-details/what-you-will-learn/whatYouWillLearn";
import CourseReview from "../../molecules/course-review/courseReview";
import "./courseDetails.scss";
const CourseDetailsOrganism = () => {
  const { courseId } = useParams();
  const { data, loading } = useGetCourseById(courseId as string);
  useScrollToTop();
  return (
    <>
      {loading ? (
        <CourseDetailsLandingPageSkeleton />
      ) : (
        <CourseDetailsLandingPage courseBasicInfo={data} loading={loading} />
      )}
      {loading ? (
        <div
          style={{
            maxWidth: "80rem",
            margin: "0 auto",
          }}
        >
          <WhatYouWillLearnSkeleton />
        </div>
      ) : (
        <WhatYouWillLearn
          whatWillYouLearnData={data?.data?.benefits}
          loading={loading}
        />
      )}
      {loading ? (
        <div
          style={{
            maxWidth: "80rem",
            margin: "0 auto",
            paddingLeft: "2%",
            paddingRight: "2%",
          }}
        >
          <QuizSubmissionSkeleton />
        </div>
      ) : (
        <CourseContent />
      )}
      {loading ? (
        <WhatYouWillLearn />
      ) : (
        <Requirements prerequisitesData={data?.data?.prerequisites} />
      )}
      <CourseDescription courseDescription={data?.data?.description} />
      <CourseReview />
    </>
  );
};

export default CourseDetailsOrganism;
