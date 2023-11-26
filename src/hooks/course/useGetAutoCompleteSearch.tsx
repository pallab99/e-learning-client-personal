/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import CourseApi from '../../api/CourseApi';
import { useAppSelector } from '../../redux/store';

const useGetAutoCompleteSearch = (courseSearchTerm: string) => {
  const [data, setData] = useState<Array<any>>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  // const courseSearchTerm = useAppSelector((state) => state.course.searchTerm);
  console.log('search', courseSearchTerm);

  useEffect(() => {
    if (courseSearchTerm) {
      getAllCourse(courseSearchTerm as string);
    }
  }, [courseSearchTerm]);

  const getAllCourse = async (courseSearchTerm: string) => {
    try {
      setLoading(true);
      const response = await CourseApi.autoCompleteSearch(courseSearchTerm);
      console.log(response?.data);
      setData(response?.data?.data?.courses);
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
