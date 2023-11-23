import { useEffect, useState } from 'react';
import CourseApi from '../../api/CourseApi';
import AssignmentApi from '../../api/AssignmentApi';

const useGetAssignmentById = (
  courseId: string,
  sectionId: string,
  assignmentId: string,
  submittedAssignmentData: any,
  recallApi?: number
) => {
  const [assignmentData, setAssignmentData] = useState<object>({});
  const [assignmentLoading, setAssignmentLoading] = useState(false);
  const [error, setError] = useState();
  console.log('lll', sectionId);

  useEffect(() => {
    getAssignmentById(courseId, sectionId, assignmentId);
  }, [courseId, sectionId, assignmentId, submittedAssignmentData, recallApi]);

  const getAssignmentById = async (
    courseId: string,
    sectionId: string,
    assignmentId: string
  ) => {
    try {
      setAssignmentLoading(true);
      const response = await AssignmentApi.getAssignmentBySectionId(
        courseId,
        sectionId,
        assignmentId
      );
      setAssignmentData(response?.data);
      setAssignmentLoading(false);
    } catch (error: any) {
      setAssignmentLoading(false);
      setError(error);
    } finally {
      setAssignmentLoading(false);
    }
  };

  return { assignmentData, assignmentLoading, error };
};

export default useGetAssignmentById;
