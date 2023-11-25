import { useEffect, useState } from 'react';

import AssignmentApi from '../../api/AssignmentApi';

const useGetAllAssignment = (courseId: string | undefined) => {
  const [assignment, setAssignment] = useState<Array<any>>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  useEffect(() => {
    getAllAssignment(courseId);
  }, [courseId]);

  const getAllAssignment = async (courseId: string | undefined) => {
    try {
      setLoading(true);
      const response = await AssignmentApi.getAllAssignmentByCourse(courseId);
      setAssignment(response?.data?.data);
      setLoading(false);
      setError(null);
    } catch (error: any) {
      setLoading(false);
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  return { assignment, loading, error };
};

export default useGetAllAssignment;
