import { Card, Pagination, Rate, Typography } from "antd";
import { FaChartSimple } from "react-icons/fa6";
import useGetAllCourse from "../../../hooks/course/useGetAllCourse";
import ButtonAtom from "../../atoms/button/button.attom";
import SortSelect from "../sort-select/sortSelect";
import "./courseCard.scss";
const { Paragraph } = Typography;

const CourseCardMolecules = () => {
  const { data, loading } = useGetAllCourse();
  console.log(data);
  const selectOption = [
    {
      value: "rating_asc",
      label: "Rating(ASC)",
    },
    {
      value: "rating_desc",
      label: "Rating(DESC)",
    },
    {
      value: "students_asc",
      label: "No Of Student(ASC)",
    },
    {
      value: "students_desc",
      label: "No Of Student(DESC)",
    },
  ];
  const categoryOption = [
    {
      value: "web development",
      label: "Web Development",
    },
    {
      value: "softskill",
      label: "softskill",
    },
    {
      value: "mobile devlopment",
      label: "mobile devlopment",
    },
    {
      value: "reactjs",
      label: "reactjs",
    },
  ];
  const levelOption = [
    {
      value: "begineer",
      label: "Begineer",
    },
    {
      value: "intermediate",
      label: "intermediate",
    },
    {
      value: "advance",
      label: "advance",
    },
  ];
  return (
    <div className="CardContainer cursor-pointer">
      <h2>All Courses</h2>
      <div className="select-field-course">
        <SortSelect options={categoryOption} placeholder="Select Category" />
        <SortSelect options={levelOption} placeholder="Select the level" />
        <SortSelect options={selectOption} placeholder="Sort the course" />
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
                  overflow: "hidden",
                  width: "90%",
                  height: "300px",
                  objectFit: "cover",
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
                  <FaChartSimple />{" "}
                  <span className="cross">{course.level}</span>
                </p>
                <p className="Hover">
                  <ButtonAtom
                    text="Add To Cart"
                    type="primary"
                    style={{ width: "100%" }}
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
