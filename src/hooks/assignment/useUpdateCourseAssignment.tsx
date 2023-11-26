import { message } from 'antd';
import { useState } from 'react';
import AssignmentApi from '../../api/AssignmentApi';

const useUpdateCourseAssignment = () => {
  const [loading, setLoading] = useState(false);
  const updateAssignment = async (
    courseId: string | undefined,
    sectionId: string | undefined,
    assignmentId: string,
    data: any
  ) => {
    try {
      setLoading(true);
      const response = await AssignmentApi.updateAssignment(
        courseId,
        sectionId,
        assignmentId,
        data
      );
      setLoading(false);
      message.success(response?.data.message);
    } catch (error: any) {
      setLoading(false);
      message.error(error.response.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, updateAssignment };
};

export default useUpdateCourseAssignment;
