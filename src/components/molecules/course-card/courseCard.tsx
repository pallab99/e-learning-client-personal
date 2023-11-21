import { Card, Empty, Pagination, Rate, Typography } from 'antd';
import { FaChartSimple } from 'react-icons/fa6';
import useGetAllCourse from '../../../hooks/course/useGetAllCourse';
import ButtonAtom from '../../atoms/button/button.attom';
import SortSelect from '../sort-select/sortSelect';
import './courseCard.scss';

import useGetAllCategory from '../../../hooks/category/useGetAllCategory';
import { levelOption, selectOption } from '../../../constant/courseFilter';
import CourseCardSkeleton from '../../atoms/courseCardSkeleton/courseCardSkeleton';
import { useAppDispatch, useAppSelector } from '../../../redux/store';
import {
  courseSortProperty,
  filterByLevel,
  handleCourseFilterByCategory,
  handleCoursePagination,
} from '../../../redux/slices/courseSlice';

const CourseCardMolecules = () => {
  const { data, loading } = useGetAllCourse();
  const { category } = useGetAllCategory();

  const categoryOption =
    category &&
    category.map((item: any) => {
      return {
        value: item?.title,
        label: item?.title,
      };
    });

  const handleFilterByCategory = (value: any) => {
    if (Array.isArray(value)) {
      dispatch(handleCourseFilterByCategory(value));
    } else {
      dispatch(handleCourseFilterByCategory([value]));
    }
  };

  const dispatch = useAppDispatch();
  const handleFilterLevel = (value: any) => {
    dispatch(filterByLevel(value));
  };
  const handelSortBy = (value: any) => {
    dispatch(courseSortProperty(value));
  };

  const handlePagination = (page: number, pageSize: number) => {
    const payload = {
      page,
      pageSize,
    };
    dispatch(handleCoursePagination(payload));
  };
  const perPageLimit = useAppSelector((state) => state.course.limit);

  return (
    <div className="CardContainer cursor-pointer">
      <h2>All Courses</h2>
      <div className="select-field-course">
        <SortSelect
          options={categoryOption}
          placeholder="Select Category"
          mode="multiple"
          style={{ width: '300px' }}
          onChange={handleFilterByCategory}
        />
        <SortSelect
          options={levelOption}
          placeholder="Select the level"
          onChange={handleFilterLevel}
        />
        <SortSelect
          options={selectOption}
          placeholder="Sort the course"
          onChange={handelSortBy}
        />
      </div>
      {loading ? (
        <CourseCardSkeleton />
      ) : (
        <>
          {!data?.data?.courses?.length ? (
            <Empty />
          ) : (
            <div className="CardContent">
              {data &&
                data?.data?.courses?.map((course, index) => (
                  <div className="Cards mt-20">
                    <Card key={index}>
                      <img
                        src={course.thumbnail}
                        alt="course"
                        width="240"
                        height="135"
                        loading="lazy"
                        style={{
                          overflow: 'hidden',
                          width: '90%',
                          height: '300px',
                          objectFit: 'cover',
                        }}
                      />
                      <div className="lowerCard mb-20">
                        <p className="title mt-5">{course.title}</p>
                        <p className="author mt-5">{course.author}</p>
                        <div className="ratings mt-5 text-18">
                          {course.ratings | 4}
                          <Rate disabled defaultValue={4} />
                          <span className="reviews">{`(123,00)`}</span>
                        </div>
                        <p className="Price mt-5 text-18">
                          <FaChartSimple />{' '}
                          <span className="cross">{course.level}</span>
                        </p>
                        <p className="Hover">
                          <ButtonAtom
                            text="Add To Cart"
                            type="primary"
                            style={{ width: '100%' }}
                          ></ButtonAtom>
                        </p>
                      </div>
                    </Card>
                  </div>
                ))}
            </div>
          )}
        </>
      )}
      <div className="pagination-div">
        <Pagination
          className="mt-40"
          defaultCurrent={1}
          total={data && data?.data?.totalCourses}
          onChange={handlePagination}
          defaultPageSize={perPageLimit}
        ></Pagination>
      </div>
    </div>
  );
};

export default CourseCardMolecules;
