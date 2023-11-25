import { useEffect, useState } from 'react';
import CourseApi from '../../api/CourseApi';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { handleGetCourseData } from '../../redux/slices/courseSlice';

const useGetAllCourse = () => {
  const [data, setData] = useState<object>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const filterOption = useAppSelector((state) => state.course.level);
  const sortCourseValue = useAppSelector((state) => state.course.sort);
  const filterCourseByCategory = useAppSelector(
    (state) => state.course.category
  );
  const courseCurrentPage = useAppSelector((state) => state.course.page);
  const perPageLimit = useAppSelector((state) => state.course.limit);

  useEffect(() => {
    getAllCourse(
      filterOption,
      filterCourseByCategory,
      sortCourseValue,
      courseCurrentPage,
      perPageLimit
    );
  }, [
    filterOption,
    sortCourseValue,
    filterCourseByCategory,
    courseCurrentPage,
    perPageLimit,
  ]);

  const getAllCourse = async (
    filterOption: string,
    filterCourseByCategory: string[],
    sortValue: string,
    courseCurrentPage: number,
    perPageLimit: number
  ) => {
    try {
      setLoading(true);
      const response = await CourseApi.getAllCourse(
        filterOption,
        sortValue,
        filterCourseByCategory,
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
