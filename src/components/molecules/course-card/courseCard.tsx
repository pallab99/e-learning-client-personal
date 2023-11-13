import { Card, Rate, Tag } from 'antd';
import React from 'react';
const { Meta } = Card;
import './courseCard.scss';
export interface ICourseCardMolecules {
  courseTitle: string;
  img: string;
  tag: string;
  instructorName: string;
  rating: number;
}
const CourseCardMolecules: React.FC<ICourseCardMolecules> = ({
  courseTitle,
  img,
  tag,
  instructorName,
  rating,
}) => {
  return (
    <div className="course-card">
      <Card
        bordered={false}
        cover={<img src={img} alt="" />}
        style={{ boxShadow: 'none' }}
      >
        <div className="card-content">
          <Meta
            title={courseTitle}
            description={instructorName}
            className="mb-20 mt-20"
          />
          <div className="course-card-bottom">
            <div className="tag-div mb-20">
              <Tag color="magenta">{tag} </Tag>
            </div>
            <div className="rating-div mb-20">
              <Rate disabled defaultValue={rating} />
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default CourseCardMolecules;
