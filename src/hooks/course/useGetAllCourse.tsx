import { useEffect, useState } from 'react';
import CourseApi from '../../api/CourseApi';
import { useAppSelector } from '../../redux/store';
import {
  filterByCategory,
  filterByLevel,
  sortByRating,
  sortByStudents,
} from '../../signals/course';

const useGetAllCourse = () => {
  const [data, setData] = useState<object>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const courseSearchTerm = useAppSelector(
    (state) => state.instructor.searchTerm
  );
  const filterOption = filterByLevel.value;
  const sortCourseByStudents = sortByStudents.value;
  const sortCourseByRating = sortByRating.value;
  const filterCourseByCategory = filterByCategory.value;
  useEffect(() => {
    getAllCourse(
      filterOption,
      sortCourseByStudents,
      sortCourseByRating,
      filterCourseByCategory
    );
  }, [
    filterOption,
    sortCourseByStudents,
    sortCourseByRating,
    filterCourseByCategory,
  ]);

  const getAllCourse = async (
    filterOption: string,
    sortCourseByStudents: string,
    sortCourseByRating: string,
    filterCourseByCategory: string[]
  ) => {
    try {
      setLoading(true);
      const response = await CourseApi.getAllCourse(
        filterOption,
        sortCourseByStudents,
        sortCourseByRating,
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
