import { useScrollToTop } from "../../../../hooks/useScrollToTop";
import QuizSubmission from "../../../organism/student/student-quiz-submission/student-quiz-submission";

const QuizSubmissionForStudentPage = () => {
  useScrollToTop();
  return (
    <>
      <QuizSubmission></QuizSubmission>
    </>
  );
};

export default QuizSubmissionForStudentPage;
