import { message } from "antd";
import { useState } from "react";
import CourseContentApi from "../../api/CourseContentApi";

const useCreateCourseContent = () => {
  const [loading, setLoading] = useState(false);
  const createCourseContent = async (
    courseId: string | undefined,
    sectionId: string | undefined,
    data: any
  ) => {
    try {
      setLoading(true);
      const response = await CourseContentApi.createCourseContent(
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

  return { loading, createCourseContent };
};

export default useCreateCourseContent;
