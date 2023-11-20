import { Skeleton } from "antd";

const WhatYouWillLearnSkeleton = () => {
  return (
    <div className="course_details_what_you_will_learn_main_container mt-20 mb-30">
      <div className="course_details_what_you_will_learn_container_two_column_layoutt">
        <div className="course_details_what_you_will_learn_container_column1_content  mt-20 mb-30">
          <div className="course_details_what_you_will_learn_container_column1_content_list">
            <Skeleton active />
          </div>
        </div>
        <div className="course_details_what_you_will_learn_container_column2_content  mt-20 mb-30">
          <div className="course_details_what_you_will_learn_container_column2_content_list">
            <Skeleton active />
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhatYouWillLearnSkeleton;
