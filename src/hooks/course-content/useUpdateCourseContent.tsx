import { message } from "antd";
import { useState } from "react";
import CourseContentApi from "../../api/CourseContentApi";

const useUpdateCourseContent = () => {
  const [loading, setLoading] = useState(false);
  const editCourseContent = async (
    contentId: string | undefined,
    data: any
  ) => {
    try {
      console.log("hook content id", contentId);

      setLoading(true);
      const response = await CourseContentApi.updateCourseContent(
        contentId,
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

  return { loading, editCourseContent };
};

export default useUpdateCourseContent;
