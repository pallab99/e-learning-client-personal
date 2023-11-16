import { Skeleton } from "antd";
import "./courseFormSkeleton.scss";
const CourseFormSkeleTon = () => {
  return (
    <div className="course-form-skeleton">
      <Skeleton.Button style={{ width: "50%" }} active></Skeleton.Button>
      <Skeleton.Input style={{ width: "100%" }} active></Skeleton.Input>
      <Skeleton.Input style={{ width: "100%" }} active></Skeleton.Input>
      <Skeleton.Input style={{ width: "100%" }} active></Skeleton.Input>

      <Skeleton.Input style={{ width: "100%" }} active></Skeleton.Input>
      <Skeleton.Input style={{ width: "100%" }} active></Skeleton.Input>
      <Skeleton.Input style={{ width: "100%" }} active></Skeleton.Input>

      <div className="select-skeleton">
        <div>
          <Skeleton.Input
            className="mt-20"
            style={{ width: "100%" }}
            active
          ></Skeleton.Input>
          <Skeleton.Input
            className="mt-20"
            style={{ width: "100%" }}
            active
          ></Skeleton.Input>
          <Skeleton.Input
            className="mt-20"
            style={{ width: "100%" }}
            active
          ></Skeleton.Input>
        </div>

        <div>
          <Skeleton.Input
            className="mt-20"
            style={{ width: "100%" }}
            active
          ></Skeleton.Input>
          <Skeleton.Input
            className="mt-20"
            style={{ width: "100%" }}
            active
          ></Skeleton.Input>
          <Skeleton.Input
            className="mt-20"
            style={{ width: "100%" }}
            active
          ></Skeleton.Input>
        </div>

        <div>
          <Skeleton.Input
            className="mt-20"
            style={{ width: "100%" }}
            active
          ></Skeleton.Input>
          <Skeleton.Input
            className="mt-20"
            style={{ width: "100%" }}
            active
          ></Skeleton.Input>
          <Skeleton.Input
            className="mt-20"
            style={{ width: "100%" }}
            active
          ></Skeleton.Input>
        </div>
      </div>
      <Skeleton.Input style={{ width: "100%" }} active></Skeleton.Input>
      <Skeleton.Input style={{ width: "100%" }} active></Skeleton.Input>
      <Skeleton.Button style={{ width: "100%" }} active></Skeleton.Button>

      <Skeleton.Input style={{ width: "100%" }} active></Skeleton.Input>
      <Skeleton.Input style={{ width: "100%" }} active></Skeleton.Input>
      <Skeleton.Input style={{ width: "100%" }} active></Skeleton.Input>
    </div>
  );
};

export default CourseFormSkeleTon;
