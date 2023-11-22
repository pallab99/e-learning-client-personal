import { Card, Descriptions } from "antd";
// import styles from "./AssignmentCard.module.css";
import "./assignmentCard.scss";
const AssignmentCard = ({ assignment }: any) => {
  return (
    <Card title={assignment.title} className="assignment_card_div">
      <Descriptions
        bordered
        column={{ xs: 1, sm: 2, md: 3, lg: 3, xl: 4, xxl: 4 }}
      >
        <Descriptions.Item
          label="Description"
          className="assignment_card_description"
        >
          {assignment.description}
        </Descriptions.Item>
        <Descriptions.Item label="Instructions">
          {assignment.instructions}
        </Descriptions.Item>
        <Descriptions.Item label="Assignment File URL">
          <a
            href={assignment.assignmentFileURL}
            target="_blank"
            rel="noopener noreferrer"
          >
            {assignment.assignmentFileURL}
          </a>
        </Descriptions.Item>
        <Descriptions.Item label="Points">{assignment.point}</Descriptions.Item>
      </Descriptions>
    </Card>
  );
};

export default AssignmentCard;
