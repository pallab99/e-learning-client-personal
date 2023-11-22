import { Card, Image, Modal, Table } from "antd";
import { useState } from "react";
import { useParams } from "react-router-dom";
import AssignmentApi from "../../../../api/AssignmentApi";
import "./viewAssignment.scss";
const ViewAssignment = ({ data }: any) => {
  const [selectedAssignmentId, setSelectedAssignmentId] = useState(null);
  const [submissions, setSubmissions] = useState([]);

  const submissionColumns = [
    { title: "Title", dataIndex: "title", key: "title" },
    {
      title: "Assignment File URL",
      dataIndex: "assignmentFileURL",
      key: "assignmentFileURL",
    },
    { title: "Student Name", dataIndex: "student.name", key: "student.name" },
    {
      title: "Student DP",
      dataIndex: "student.dp",
      key: "student.dp",
      render: (text, record) => (
        <img src={record.student.dp} alt="Student DP" />
      ),
    },
  ];
  const [openSubmissionModal, setOpnSubmissionModal] = useState(false);

  const assignmentColumns = [
    { title: "Title", dataIndex: "title", key: "title" },
    { title: "Point", dataIndex: "point", key: "point" },
    {
      title: "Assignment File URL",
      dataIndex: "assignmentFileURL",
      key: "assignmentFileURL",
    },
    {
      title: "View Submissions",
      key: "viewSubmissions",
      render: (text, record) => (
        <button
          onClick={() => {
            setSelectedAssignmentId(record._id);
            fetchSubmissions(record._id);
            setOpnSubmissionModal(true);
          }}
        >
          View Submissions
        </button>
      ),
    },
  ];

  const { courseId } = useParams();

  const assignments = data.map((assignment) => ({
    _id: assignment._id,
    title: assignment.title,
    point: assignment.point,
    assignmentFileURL: assignment.assignmentFileURL,
  }));

  const fetchSubmissions = async (assignmentId: string | undefined) => {
    try {
      const response = await AssignmentApi.getAllSubmittedAssignment(
        courseId,
        assignmentId
      );
      //   console.log("submitted assignment", response?.data);

      setSubmissions(response?.data?.data);
    } catch (err) {
      console.error(err);
    }
  };
  console.log("submitted data", submissions);

  return (
    <div className="responsive-table">
      <Table
        columns={assignmentColumns}
        dataSource={assignments}
        scroll={{ x: 200 }}
      />
      {/* {selectedAssignmentId && (
        <Table columns={submissionColumns} dataSource={submissions} />
      )} */}
      <Modal
        open={openSubmissionModal}
        onCancel={() => setOpnSubmissionModal(false)}
      >
        {submissions &&
          submissions?.data?.map((ele: any) => {
            return (
              <div>
                <Card title="All submitted assignment" className="mt-30">
                  <Image
                    height={100}
                    width={100}
                    src={ele?.student?.dp}
                  ></Image>
                </Card>
              </div>
            );
          })}
      </Modal>
    </div>
  );
};
export default ViewAssignment;
