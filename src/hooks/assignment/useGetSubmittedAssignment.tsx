//@ts-nocheck
import { useEffect, useState } from "react";
import AssignmentApi from "../../api/AssignmentApi";

const useGetSubmittedAssignment = (
  courseId: string,
  assignmentId: string,
  recallApi?: number
) => {
  const [submittedAssignmentData, setSubmittedAssignmentData] =
    useState<object>({});
  const [submittedAssignmentLoading, setSubmittedAssignmentLoading] =
    useState(false);
  const [error, setError] = useState();
  const [noSubmission, setNoSubmission] = useState(false);

  useEffect(() => {
    getAssignmentById(courseId, assignmentId);
  }, [courseId, assignmentId, recallApi]);

  const getAssignmentById = async (courseId: string, assignmentId: string) => {
    try {
      setSubmittedAssignmentLoading(true);
      const response = await AssignmentApi.getAllSubmittedAssignment(
        courseId,
        assignmentId
      );
      console.log(response?.data?.data);
      setSubmittedAssignmentData(response?.data);
      setSubmittedAssignmentLoading(false);
      setError(null);
    } catch (error: any) {
      setSubmittedAssignmentLoading(false);
      setError(error);
    } finally {
      setSubmittedAssignmentLoading(false);
    }
  };

  return {
    submittedAssignmentData,
    submittedAssignmentLoading,
    error,
    noSubmission,
  };
};

export default useGetSubmittedAssignment;
