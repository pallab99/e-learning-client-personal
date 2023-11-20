import { CheckOutlined } from "@ant-design/icons";
import { Card } from "antd";
import HeadingAtom from "../../../atoms/heading/heading.atom";
import ParagraphAtom from "../../../atoms/paragraph/paragraph.atom";
import "./whatYouWillLearn.scss";

const WhatYouWillLearn = ({ whatWillYouLearnData, loading }: any) => {
  console.log(whatWillYouLearnData);

  return (
    <div className="course_details_what_you_will_learn_main_container mt-20 mb-30">
      <Card>
        <HeadingAtom text="What youll learn" level={2}></HeadingAtom>
        <div className="course_details_what_you_will_learn_container_two_column_layout">
          {whatWillYouLearnData &&
            whatWillYouLearnData.map((ele: any, index: any) => {
              return index % 2 ? (
                <div className="course_details_what_you_will_learn_container_column1">
                  <div className="course_details_what_you_will_learn_container_column1_content">
                    <div className="course_details_what_you_will_learn_container_column1_content_list">
                      <CheckOutlined />
                      <ParagraphAtom text={ele} />
                    </div>
                  </div>
                </div>
              ) : (
                <div className="course_details_what_you_will_learn_container_column2">
                  <div className="course_details_what_you_will_learn_container_column2_content">
                    <div className="course_details_what_you_will_learn_container_column2_content_list">
                      <CheckOutlined />
                      <ParagraphAtom text={ele} />
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </Card>
    </div>
  );
};

export default WhatYouWillLearn;
