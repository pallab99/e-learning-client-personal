import { message } from 'antd';
import { useState } from 'react';
import CourseContentApi from '../../api/CourseContentApi';

const useDeleteCourseContent = () => {
  const [deleteContentLoading, setDeleteContentLoading] = useState(false);
  const deleteCourseContent = async (contentId: string | undefined) => {
    try {
      setDeleteContentLoading(true);
      const response = await CourseContentApi.deleteContent(
        contentId as string
      );
      setDeleteContentLoading(false);
      message.success(response?.data.message);
    } catch (error: any) {
      setDeleteContentLoading(false);
      message.error(error.response.message);
    } finally {
      setDeleteContentLoading(false);
    }
  };

  return { deleteContentLoading, deleteCourseContent };
};

export default useDeleteCourseContent;
