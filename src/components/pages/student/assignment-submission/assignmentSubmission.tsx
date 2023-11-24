import { useScrollToTop } from "../../../../hooks/useScrollToTop";
import AssignmentSubmission from "../../../organism/student/assignment-submission/assignmentSubmission";

const AssignmentSubmissionPage = () => {
  useScrollToTop();

  return <AssignmentSubmission />;
};

export default AssignmentSubmissionPage;
