//@ts-nocheck
import { Card, Empty, Rate } from "antd";
import { FaChartSimple } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { useScrollToTop } from "../../../../hooks/useScrollToTop";
import useGetMyLearning from "../../../../hooks/user/useGetMyLearning";
import ButtonAtom from "../../../atoms/button/button.attom";
import CourseCardSkeleton from "../../../atoms/courseCardSkeleton/courseCardSkeleton";

const CourseRecommendation = () => {
  const { data, loading } = useGetMyLearning();
  console.log(data?.data?.data?.enrolledCourses);

  useScrollToTop();
  return (
    <div className="CardContainer cursor-pointer">
      <h2>My Learning</h2>
      {loading ? (
        <CourseCardSkeleton />
      ) : data && data?.data?.data?.enrolledCourses?.length <= 0 ? (
        <Empty />
      ) : (
        <div className="CardContent">
          {data?.data?.data?.enrolledCourses?.map((course, index) => (
            <div className="Cards mt-20" key={index}>
              <Card>
                <img
                  src={course.thumbnail}
                  alt="course"
                  width="240"
                  height="135"
                  loading="lazy"
                  style={{
                    overflow: "hidden",
                    width: "100%",
                    height: "auto",
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
                    <FaChartSimple />{" "}
                    <span className="cross">{course.level}</span>
                  </p>
                  <p className="Hover">
                    <ButtonAtom
                      text="Add To Cart"
                      type="primary"
                      style={{ width: "100%" }}
                    ></ButtonAtom>
                  </p>
                </div>
                <Link to={`/course/${course?._id}`}>
                  <div className="start_learning_div">
                    <ButtonAtom type="link" text="Start Learning"></ButtonAtom>
                  </div>
                </Link>
              </Card>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CourseRecommendation;
