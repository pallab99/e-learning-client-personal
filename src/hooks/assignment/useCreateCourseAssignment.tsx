import { message } from "antd";
import { useState } from "react";
import AssignmentApi from "../../api/AssignmentApi";

const useCreateCourseAssignment = () => {
  const [loading, setLoading] = useState(false);
  const createAssignment = async (
    courseId: string | undefined,
    sectionId: string | undefined,
    data: any
  ) => {
    try {
      setLoading(true);
      const response = await AssignmentApi.createAssignment(
        courseId,
        sectionId,
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

  return { loading, createAssignment };
};

export default useCreateCourseAssignment;
