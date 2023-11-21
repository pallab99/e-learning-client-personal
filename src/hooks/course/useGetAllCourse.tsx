import { useEffect, useState } from 'react';
import CourseApi from '../../api/CourseApi';
import { useAppSelector } from '../../redux/store';

const useGetAllCourse = () => {
  const [data, setData] = useState<object>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  const filterOption = useAppSelector((state) => state.course.level);
  const sortCourseValue = useAppSelector((state) => state.course.sort);
  const filterCourseByCategory = useAppSelector(
    (state) => state.course.category
  );
  const courseSearchTerm = useAppSelector((state) => state.course.searchTerm);
  const courseCurrentPage = useAppSelector((state) => state.course.page);
  const perPageLimit = useAppSelector((state) => state.course.limit);
  useEffect(() => {
    getAllCourse(
      filterOption,
      filterCourseByCategory,
      sortCourseValue,
      courseSearchTerm,
      courseCurrentPage,
      perPageLimit
    );
  }, [
    filterOption,
    sortCourseValue,
    filterCourseByCategory,
    courseSearchTerm,
    courseCurrentPage,
    perPageLimit,
  ]);

  const getAllCourse = async (
    filterOption: string,
    filterCourseByCategory: string[],
    sortValue: string,
    courseSearchTerm: string,
    courseCurrentPage: number,
    perPageLimit: number
  ) => {
    try {
      setLoading(true);
      const response = await CourseApi.getAllCourse(
        filterOption,
        sortValue,
        filterCourseByCategory,
        courseSearchTerm,
        courseCurrentPage,
        perPageLimit
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
