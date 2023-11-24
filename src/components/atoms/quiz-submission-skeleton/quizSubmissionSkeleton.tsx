import { Skeleton } from "antd";
import "./quizSubmission.scss";
const QuizSubmissionSkeleton = () => {
  return (
    <div className="quiz_submission_skeleton_container">
      {[1, 2, 3, 4, 5, 6].map((ele: any) => {
        return <Skeleton active key={ele}></Skeleton>;
      })}
    </div>
  );
};

export default QuizSubmissionSkeleton;
