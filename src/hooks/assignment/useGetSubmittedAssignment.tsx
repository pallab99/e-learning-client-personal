import { useEffect, useState } from 'react';
import AssignmentApi from '../../api/AssignmentApi';

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
      setSubmittedAssignmentData(response?.data);
      setSubmittedAssignmentLoading(false);
    } catch (error: any) {
      setSubmittedAssignmentLoading(false);
      setError(error);
    } finally {
      setSubmittedAssignmentLoading(false);
    }
  };

  return { submittedAssignmentData, submittedAssignmentLoading, error };
};

export default useGetSubmittedAssignment;
