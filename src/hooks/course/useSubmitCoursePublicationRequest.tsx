import { useEffect, useState } from 'react';
import CourseApi from '../../api/CourseApi';
import { message } from 'antd';

const useSubmitCoursePublicationRequest = () => {
  const [coursePublicationRequestLoader, setCoursePublicationRequestLoader] =
    useState(false);

  const submitForCoursePublications = async (courseId: string) => {
    try {
      setCoursePublicationRequestLoader(true);
      const response = await CourseApi.submitForCoursePublications(courseId);
      message.success(response?.data?.message);
      setCoursePublicationRequestLoader(false);
    } catch (error: any) {
      setCoursePublicationRequestLoader(false);
      message.success(error?.response?.message);
    } finally {
      setCoursePublicationRequestLoader(false);
    }
  };

  return { coursePublicationRequestLoader, submitForCoursePublications };
};

export default useSubmitCoursePublicationRequest;
