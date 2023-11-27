//@ts-nocheck
import {
  Card,
  Empty,
  Image,
  InputNumber,
  Modal,
  Space,
  Tooltip,
  message,
} from "antd";
import { useState } from "react";
import { useParams } from "react-router-dom";
import AssignmentApi from "../../../../api/AssignmentApi";
import useGetAllAssignment from "../../../../hooks/assignment/useGetAllAssignment";
import ButtonAtom from "../../../atoms/button/button.attom";
import HeadingAtom from "../../../atoms/heading/heading.atom";
import InstructorCourseListSkeletonAtom from "../../../atoms/instructorCourseListSkeleton/instructorCourseListSkeleton";
import ParagraphAtom from "../../../atoms/paragraph/paragraph.atom";
import InstructorDashboardSideBarOrganism from "../../../organism/instructor/dashboard/sidebar/sidebar.organism";
import "./assignmentTable.scss";
const AssignmentTable = () => {
  const { courseId } = useParams();
  const { loading, assignment, error } = useGetAllAssignment(courseId);
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
  const [getAllAssignmentLoading, setGetAllAssignmentLoading] = useState(false);
  const fetchSubmissions = async (assignmentId: string | undefined) => {
    try {
      setGetAllAssignmentLoading(true);
      const response = await AssignmentApi.getAllSubmittedAssignmentOfASection(
        courseId,
        assignmentId
      );

      setSubmissions(response?.data?.data);
      setGetAllAssignmentLoading(false);
    } catch (err) {
      console.error(err);
      setGetAllAssignmentLoading(false);
    }
  };
  const [grade, setGrade] = useState(0);
  const [assignmentId, setAssignmentId] = useState("");
  const handleGrade = (value: any) => {
    setGrade(value);
  };
  const [handleAssessmentLoading, setHandleAssessmentLoading] = useState(false);
  const handLeGiveAssignmentGrade = async (
    value: any,
    submittedAssignmentId: string
  ) => {
    try {
      setHandleAssessmentLoading(true);
      const res = await AssignmentApi.giveAssessment(
        assignmentId,
        submittedAssignmentId,
        value
      );
      message.success(res?.data?.message);
      setHandleAssessmentLoading(false);
    } catch (error: any) {
      message.error(error?.response?.message);
      setHandleAssessmentLoading(false);
    }
  };
  const [openAssignmentPreview, setOpenAssignmnetPreview] = useState(false);
  const [assignmentFile, setAssignmentFile] = useState("");
  return (
    <div className="instructor-dashboard-div-wrapper">
      <InstructorDashboardSideBarOrganism />
      <div className="instructor-dashboard-div">
        {loading ? (
          [1, 2, 3, 4].map((ele) => {
            return <InstructorCourseListSkeletonAtom key={ele} />;
          })
        ) : error ? (
          <div className="empty-div mt-40" style={{ height: "100dvh" }}>
            <Empty />
          </div>
        ) : (
          assignments.map((ele: any) => {
            return (
              <Card className="mt-40">
                <HeadingAtom level={3} text={ele?.title}></HeadingAtom>
                <HeadingAtom
                  level={4}
                  text={`${ele?.point} Marks`}
                ></HeadingAtom>
                <div className="assignment_bnt_action">
                  {/* <Link to={ele?.assignmentFileURL}>View assignment file</Link> */}
                  <>
                    <ButtonAtom
                      text="Preview"
                      type="text"
                      handleButtonClick={() => {
                        setOpenAssignmnetPreview(true);
                        setAssignmentFile(ele?.assignmentFileURL);
                      }}
                      className="instructor_preview_assignment_btn"
                    ></ButtonAtom>
                    <Modal
                      open={openAssignmentPreview}
                      onCancel={() => setOpenAssignmnetPreview(false)}
                      footer={null}
                      centered
                    >
                      <div className="assignment_iframe_div mt-40">
                        <iframe
                          src={assignmentFile}
                          height={450}
                          width={"100%"}
                        ></iframe>
                      </div>
                    </Modal>
                    <ButtonAtom
                      text="View All Submissions"
                      type="link"
                      style={{ color: "purple" }}
                      handleButtonClick={() => {
                        setAssignmentId(ele?._id);
                        fetchSubmissions(ele?._id);
                        setOpnSubmissionModal(true);
                      }}
                    ></ButtonAtom>
                  </>
                </div>
              </Card>
            );
          })
        )}
        <Modal
          open={openSubmissionModal}
          onCancel={() => setOpnSubmissionModal(false)}
          footer={null}
        >
          {getAllAssignmentLoading ? (
            [1, 2, 3].map((ele: any) => {
              return <InstructorCourseListSkeletonAtom key={ele} />;
            })
          ) : submissions?.data?.length <= 0 ? (
            <Empty />
          ) : (
            submissions &&
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

                          <>
                            <ButtonAtom
                              text="Preview"
                              type="text"
                              handleButtonClick={() => {
                                setOpenAssignmnetPreview(true);
                                setAssignmentFile(ele?.assignmentFileURL);
                              }}
                              className="instructor_preview_assignment_btn"
                            ></ButtonAtom>
                            <Modal
                              open={openAssignmentPreview}
                              onCancel={() => setOpenAssignmnetPreview(false)}
                              footer={null}
                              centered
                            >
                              <div className="assignment_iframe_div mt-40">
                                <iframe
                                  src={assignmentFile}
                                  height={450}
                                  width={"100%"}
                                ></iframe>
                              </div>
                            </Modal>
                          </>
                        </div>
                        <div className="submitted_assignment_card_div_description_right_div">
                          <Space.Compact>
                            <InputNumber
                              min={1}
                              max={ele?.assignment?.point}
                              style={{ width: "40%" }}
                              keyboard={false}
                              onChange={(value) => {
                                if (typeof value != "number") {
                                  message.error("Please enter a valid number");
                                } else {
                                  handleGrade(value);
                                }
                              }}
                              defaultValue={ele?.grade | 0}
                            />
                            <Tooltip
                              title="Total marks for this assignment"
                              placement="top"
                              color="purple"
                            >
                              <InputNumber
                                style={{ width: "30%" }}
                                defaultValue={ele?.assignment?.point}
                                disabled
                              />
                            </Tooltip>
                            <ButtonAtom
                              text="Submit"
                              handleButtonClick={() => {
                                handLeGiveAssignmentGrade(grade, ele?._id);
                              }}
                              loading={handleAssessmentLoading}
                              type="primary"
                            ></ButtonAtom>
                          </Space.Compact>
                        </div>
                      </div>
                    </div>
                  </Card>
                </div>
              );
            })
          )}
        </Modal>
      </div>
    </div>
  );
};

export default AssignmentTable;
