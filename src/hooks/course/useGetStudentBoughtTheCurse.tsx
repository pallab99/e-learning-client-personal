import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import CourseApi from "../../api/CourseApi";
import { useAppSelector } from "../../redux/store";

const useGetStudentBoughtTheCourse = (courseId: string, recallApi?: number) => {
  const [studentBoughtTheCourseData, setStudentBoughtTheCourseData] =
    useState<object>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const userLoggedIn = Cookies.get("accessToken");
  const userData = useAppSelector((state) => state.auth.userData);
  useEffect(() => {
    if (userLoggedIn && userData.accessToken) {
      studentBoughtTheCourse(courseId);
    }
  }, [courseId, recallApi, userLoggedIn, userData]);

  const studentBoughtTheCourse = async (courseId: string) => {
    try {
      setLoading(true);
      const response = await CourseApi.studentBoughtTheCourse(courseId);
      setStudentBoughtTheCourseData(response?.data?.data);
      setLoading(false);
    } catch (error: any) {
      setLoading(false);
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  return { studentBoughtTheCourseData, loading, error };
};

export default useGetStudentBoughtTheCourse;
