import { message } from 'antd';
import AssignmentApi from '../../api/AssignmentApi';
import { useState } from 'react';

const useDisableAssignment = () => {
  const [disableAssignmentLoader, setDisableAssignmnetLoader] = useState(false);
  const disableAssignment = async (
    courseId: string,
    sectionId: string,
    assignmentId: string
  ) => {
    try {
      setDisableAssignmnetLoader(true);
      const response = await AssignmentApi.disableAssignment(
        courseId,
        sectionId,
        assignmentId
      );
      message.success(response?.data.message);
      setDisableAssignmnetLoader(false);
    } catch (error: any) {
      message.error(error.response.message);
      setDisableAssignmnetLoader(false);
    }
  };

  return { disableAssignmentLoader, disableAssignment };
};

export default useDisableAssignment;
