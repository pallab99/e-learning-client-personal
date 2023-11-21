import { Card, Pagination, Rate, Typography } from 'antd';
import { FaChartSimple } from 'react-icons/fa6';
import useGetAllCourse from '../../../hooks/course/useGetAllCourse';
import ButtonAtom from '../../atoms/button/button.attom';
import SortSelect from '../sort-select/sortSelect';
import './courseCard.scss';
import {
  filterByCategory,
  filterByLevel,
  sortByRating,
  sortByStudents,
  sortValue,
} from '../../../signals/course';
import useGetAllCategory from '../../../hooks/category/useGetAllCategory';
import { levelOption, selectOption } from '../../../constant/courseFilter';
// import { useAppDispatch, useAppSelector } from '../../../redux/store';
// import { filterByLevel } from '../../../redux/slices/courseSlice';
const { Paragraph } = Typography;

const CourseCardMolecules = () => {
  const { data, loading } = useGetAllCourse();
  const { category } = useGetAllCategory();
  console.log(category);

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
      filterByCategory.value = value;
    } else {
      filterByCategory.value = [value];
    }
  };
  const handleFilterLevel = (value: any) => {
    filterByLevel.value = value;
  };
  const handelSortBy = (value: any) => {
    sortValue.value = value;
  };

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
          // handleOnClick={handleGetAllCategory}
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
      <div className="CardContent">
        {data?.data?.courses?.map((course, index) => (
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

                {/* <Paragraph ellipsis={{ rows: 1 }}>{course?.title}</Paragraph> */}
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
                  {/* <HeartOutlined style={{ fontSize: '30px' }}></HeartOutlined> */}
                </p>
              </div>
            </Card>
          </div>
        ))}
      </div>
      <div className="pagination-div">
        <Pagination
          className="mt-40"
          defaultCurrent={1}
          total={50}
        ></Pagination>
      </div>
    </div>
  );
};

export default CourseCardMolecules;
