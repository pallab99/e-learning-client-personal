import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import CourseApi from '../../api/CourseApi';
import { useAppSelector } from '../../redux/store';

const useGetStudentBoughtTheCourse = (courseId: string, recallApi?: number) => {
  const [studentBoughtTheCourseData, setStudentBoughtTheCourseData] =
    useState<object>({});
  const [userBoughtTheCourseLoader, setUserBoughtTheCourseLoader] =
    useState(false);
  const [error, setError] = useState();
  const userLoggedIn = Cookies.get('accessToken');
  const userData = useAppSelector((state) => state.auth.userData);
  useEffect(() => {
    if (userLoggedIn && userData.accessToken) {
      studentBoughtTheCourse(courseId);
    }
  }, [courseId, recallApi, userLoggedIn, userData]);
  const studentBoughtTheCourse = async (courseId: string) => {
    try {
      setUserBoughtTheCourseLoader(true);
      const response = await CourseApi.studentBoughtTheCourse(courseId);
      setStudentBoughtTheCourseData(response?.data?.data);
      setUserBoughtTheCourseLoader(false);
    } catch (error: any) {
      setError(error);
    } finally {
      setUserBoughtTheCourseLoader(false);
    }
  };

  return { studentBoughtTheCourseData, userBoughtTheCourseLoader, error };
};

export default useGetStudentBoughtTheCourse;
