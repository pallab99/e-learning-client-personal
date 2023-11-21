import { useEffect, useState } from 'react';
import CourseApi from '../../api/CourseApi';
import { useAppSelector } from '../../redux/store';
import {
  filterByCategory,
  filterByLevel,
  sortValue,
} from '../../signals/course';

const useGetAllCourse = () => {
  const [data, setData] = useState<object>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const courseSearchTerm = useAppSelector(
    (state) => state.instructor.searchTerm
  );
  const filterOption = filterByLevel.value;
  const sortCourseValue = sortValue.value;
  const filterCourseByCategory = filterByCategory.value;
  useEffect(() => {
    getAllCourse(filterOption, filterCourseByCategory, sortCourseValue);
  }, [filterOption, sortCourseValue, filterCourseByCategory]);

  const getAllCourse = async (
    filterOption: string,
    filterCourseByCategory: string[],
    sortValue: string
  ) => {
    try {
      setLoading(true);
      const response = await CourseApi.getAllCourse(
        filterOption,
        sortValue,
        filterCourseByCategory
      );
      setData(response?.data);
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

export default useGetAllCourse;
