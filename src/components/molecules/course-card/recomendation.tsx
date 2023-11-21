import { Card, Rate } from "antd";
import { FaChartSimple } from "react-icons/fa6";
import ButtonAtom from "../../atoms/button/button.attom";
import "./courseCard.scss";
const courses = [
  {
    title:
      "The Complete Python Bootcamp From Zero to Hero in PythonLearn Python",
    author: "Josh Portilla",
    ratings: "4.6",
    reviews: "(7888)",
    price: "$9.99",
    level: "intermediate",
    imgSrc: "https://img-c.udemycdn.com/course/480x270/5620946_7c11.jpg",
  },
  {
    title:
      "The Complete Python Bootcamp From Zero to Hero in PythonLearn Python",
    author: "Josh Portilla",
    ratings: "4.6",
    reviews: "(7888)",
    price: "$9.99",
    level: "intermediate",
    imgSrc: "https://img-c.udemycdn.com/course/480x270/1350984_2355_6.jpg",
  },
  {
    title:
      "The Complete Python Bootcamp From Zero to Hero in PythonLearn Python",
    author: "Josh Portilla",
    ratings: "4.6",
    reviews: "(7888)",
    price: "$9.99",
    level: "intermediate",
    imgSrc: "https://img-c.udemycdn.com/course/480x270/2843012_313d_5.jpg",
  },
  {
    title:
      "The Complete Python Bootcamp From Zero to Hero in PythonLearn Python",
    author: "Josh Portilla",
    ratings: "4.6",
    reviews: "(7888)",
    price: "$9.99",
    level: "intermediate",
    imgSrc: "https://img-c.udemycdn.com/course/480x270/5478172_ee9e_2.jpg",
  },
];

const CourseRecommendation = () => {
  return (
    <div className="CardContainer cursor-pointer">
      <h2>Recommended for you</h2>
      <div className="CardContent">
        {courses?.map((course, index) => (
          <div className="Cards mt-20">
            <Card key={index}>
              <img
                src={course.imgSrc}
                alt="course"
                width="240"
                height="135"
                loading="lazy"
                style={{ overflow: "hidden", width: "100%", height: "auto" }}
              />
              <div className="lowerCard mb-20">
                <p className="title mt-5">{course.title}</p>
                <p className="author mt-5">{course.author}</p>
                <div className="ratings mt-5 text-18">
                  {course.ratings}
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
    </div>
  );
};

export default CourseRecommendation;
