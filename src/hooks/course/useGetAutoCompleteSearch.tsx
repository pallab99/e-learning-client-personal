/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import CourseApi from '../../api/CourseApi';
import { useAppSelector } from '../../redux/store';

const useGetAutoCompleteSearch = () => {
  const [data, setData] = useState<Array<any>>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  const courseSearchTerm = useAppSelector((state) => state.course.searchTerm);
  const courseCurrentPage = useAppSelector((state) => state.course.page);
  const perPageLimit = useAppSelector((state) => state.course.limit);
  useEffect(() => {
    if (courseSearchTerm) {
      getAllCourse(
        courseSearchTerm as string,
        courseCurrentPage as number,
        perPageLimit as number
      );
    }
  }, [courseSearchTerm, courseCurrentPage, perPageLimit]);

  const getAllCourse = async (
    courseSearchTerm: string,
    courseCurrentPage: number,
    perPageLimit: number
  ) => {
    try {
      setLoading(true);
      const response = await CourseApi.autoCompleteSearch(
        courseSearchTerm,
        courseCurrentPage,
        perPageLimit
      );
      console.log(response?.data);

      setData(response?.data?.data?.courses);

      // dispatch(handleGetCourseData(response?.data?.data?.courses));

      setLoading(false);
    } catch (error: any) {
      setLoading(false);
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error };
};

export default useGetAutoCompleteSearch;
