import { Card, Image } from "antd";
import { useMediaQuery } from "react-responsive";
import { Link } from "react-router-dom";
import FlexAtom from "../../../../atoms/flex/flex.atom";
import HeadingAtom from "../../../../atoms/heading/heading.atom";
import "./courseCard.style.scss";

const CourseCardOrganismAssignment = ({ data }: any) => {
  const isMobile = useMediaQuery({ query: "(max-width: 668px)" });
  return (
    <>
      {data?.map((ele: any) => (
        <FlexAtom
          justify="space-evenly"
          gap="large"
          class="mt-20 cursor-pointer card-hover"
          key={ele._id}
        >
          <Card className="course-card" style={{ width: "100%" }}>
            <div className="course-card-div">
              <div className="card-left">
                <Image
                  src={ele?.thumbnail}
                  alt="Course thumbnail"
                  width={120}
                  height={80}
                />
                <Link to={`/instructor/assignments/${ele?._id}`}>
                  <HeadingAtom
                    text={ele.title}
                    level={5}
                    ellipsis={true}
                  ></HeadingAtom>
                </Link>
              </div>
            </div>
          </Card>
        </FlexAtom>
      ))}
    </>
  );
};

export default CourseCardOrganismAssignment;
