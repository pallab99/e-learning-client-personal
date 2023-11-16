import { message } from "antd";
import { useState } from "react";
import CourseApi from "../../api/CourseApi";

const useUpdateCourse = () => {
  const [btnLoading, setBtnLoading] = useState(false);
  const updateCourse = async (courseId: string, values: any) => {
    try {
      setBtnLoading(true);
      const response = await CourseApi.updateCourseById(courseId, values);
      setBtnLoading(false);
      message.success(response?.data.message);
    } catch (error: any) {
      setBtnLoading(false);
      message.error(error.response.message);
    } finally {
      setBtnLoading(false);
    }
  };

  return { btnLoading, updateCourse };
};

export default useUpdateCourse;
