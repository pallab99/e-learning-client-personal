import { Card, Image, Progress } from "antd";
import FlexAtom from "../../../../atoms/flex/flex.atom";
import HeadingAtom from "../../../../atoms/heading/heading.atom";
import "./courseCard.style.scss";

const CourseCardOrganism = ({ data }: any) => {
  // console.log(data[3].thumbnail);

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
            <FlexAtom gap="large" align="center">
              <div className="card-left">
                <Image
                  src={ele?.thumbnail}
                  alt="Course thumbnail"
                  width={120}
                  height={80}
                />
                <HeadingAtom
                  text={ele.title}
                  level={5}
                  ellipsis={true}
                ></HeadingAtom>
              </div>
              <div className="card-right">
                <HeadingAtom
                  text="Finish your course"
                  level={5}
                  className="full-width"
                ></HeadingAtom>
                <Progress
                  percent={40}
                  showInfo={false}
                  strokeColor="#8710d8"
                ></Progress>
              </div>
            </FlexAtom>
          </Card>
        </FlexAtom>
      ))}
    </>
  );
};

export default CourseCardOrganism;
