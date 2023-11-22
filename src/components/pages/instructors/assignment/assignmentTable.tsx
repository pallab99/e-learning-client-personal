import { Link, useParams } from 'react-router-dom';
import useGetAllAssignment from '../../../../hooks/assignment/useGetAllAssignment';
import InstructorDashboardSideBarOrganism from '../../../organism/instructor/dashboard/sidebar/sidebar.organism';
import ViewAssignment from '../../../organism/instructor/viewAssignment/viewAssignment';
import './assignmentTable.scss';
import {
  Card,
  Image,
  Input,
  InputNumber,
  Modal,
  Space,
  Tooltip,
  message,
} from 'antd';
import ParagraphAtom from '../../../atoms/paragraph/paragraph.atom';
import ButtonAtom from '../../../atoms/button/button.attom';
import HeadingAtom from '../../../atoms/heading/heading.atom';
import AssignmentApi from '../../../../api/AssignmentApi';
import { useState } from 'react';
const AssignmentTable = () => {
  const { courseId } = useParams();
  const { loading, assignment } = useGetAllAssignment(courseId);
  //   console.log(assignment);
  const assignments = assignment?.map((assignment) => ({
    _id: assignment._id,
    title: assignment.title,
    point: assignment.point,
    assignmentFileURL: assignment.assignmentFileURL,
  }));
  console.log(assignments);
  const [submissions, setSubmissions] = useState([]);
  const [openSubmissionModal, setOpnSubmissionModal] = useState(false);

  const fetchSubmissions = async (assignmentId: string | undefined) => {
    try {
      const response = await AssignmentApi.getAllSubmittedAssignment(
        courseId,
        assignmentId
      );

      setSubmissions(response?.data?.data);
    } catch (err) {
      console.error(err);
    }
  };
  const [grade, setGrade] = useState(0);
  const handLeGiveAssignmentGrade = async (value: any) => {
    setGrade(value);
  };
  return (
    <div className="instructor-dashboard-div-wrapper">
      <InstructorDashboardSideBarOrganism />
      <div className="instructor-dashboard-div">
        {assignments.map((ele: any) => {
          return (
            <Card className="mt-40">
              <HeadingAtom level={3} text={ele?.title}></HeadingAtom>
              <HeadingAtom level={4} text={`${ele?.point} Marks`}></HeadingAtom>
              <div className="assignment_bnt_action">
                <Link to={ele?.assignmentFileURL}>View assignment file</Link>
                <ButtonAtom
                  text="View All Submissions"
                  type="link"
                  style={{ color: 'purple' }}
                  handleButtonClick={() => {
                    fetchSubmissions(ele?._id);
                    setOpnSubmissionModal(true);
                  }}
                ></ButtonAtom>
              </div>
            </Card>
          );
        })}
        <Modal
          open={openSubmissionModal}
          onCancel={() => setOpnSubmissionModal(false)}
          footer={null}
        >
          {submissions &&
            submissions?.data?.map((ele: any) => {
              return (
                <div>
                  <Card title="All submitted assignment" className="mt-30">
                    <div className="submitted_assignment_card_div">
                      <Image height={100} width={100} src={ele?.student?.dp} />
                      <div className="submitted_assignment_card_div_description">
                        <div className="submitted_assignment_card_div_description_left_div">
                          <ParagraphAtom
                            text={ele?.student?.name}
                          ></ParagraphAtom>
                          <Link to={ele?.assignmentFileURL}>
                            Submitted File
                          </Link>
                        </div>
                        <div className="submitted_assignment_card_div_description_right_div">
                          <Space.Compact>
                            <InputNumber
                              min={1}
                              max={ele?.assignment?.point}
                              style={{ width: '40%' }}
                              keyboard={false}
                              onChange={(value) => {
                                if (typeof value != 'number') {
                                  message.error('Please enter a valid number');
                                } else {
                                  handLeGiveAssignmentGrade(value);
                                }
                              }}
                            />
                            <Tooltip
                              title="Total marks for this assignment"
                              placement="top"
                              color="purple"
                            >
                              <InputNumber
                                style={{ width: '30%' }}
                                defaultValue={ele?.assignment?.point}
                                disabled
                              />
                            </Tooltip>
                            <ButtonAtom text="Submit"></ButtonAtom>
                          </Space.Compact>
                        </div>
                      </div>
                    </div>
                  </Card>
                </div>
              );
            })}
        </Modal>
      </div>
    </div>
  );
};

export default AssignmentTable;
