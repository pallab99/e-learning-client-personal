//@ts-nocheck
import { UploadOutlined } from "@ant-design/icons";
import type { DescriptionsProps } from "antd";
import { Badge, Button, Descriptions, Upload, message } from "antd";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import AssignmentApi from "../../../../api/AssignmentApi";
import useGetAssignmentById from "../../../../hooks/assignment/useGetAssignmentById";
import useGetSubmittedAssignment from "../../../../hooks/assignment/useGetSubmittedAssignment";
import ButtonAtom from "../../../atoms/button/button.attom";
import HeadingAtom from "../../../atoms/heading/heading.atom";
import ParagraphAtom from "../../../atoms/paragraph/paragraph.atom";
import QuizSubmissionSkeleton from "../../../atoms/quiz-submission-skeleton/quizSubmissionSkeleton";
import "./assignmentSubmission.scss";
const AssignmentSubmission = () => {
  const { courseId, sectionId, assignmentId } = useParams();
  const [recallApi, setRecallApi] = useState(0);
  const { submittedAssignmentData, noSubmission, error } =
    useGetSubmittedAssignment(courseId, assignmentId, recallApi);
  console.log(error);

  console.log("submitted assignment", submittedAssignmentData);

  const { assignmentData, assignmentLoading } = useGetAssignmentById(
    courseId as string,
    sectionId as string,
    assignmentId as string,
    submittedAssignmentData
  );
  console.log(assignmentData);

  const items: DescriptionsProps["items"] = [
    {
      key: "1",
      label: "Submission Status",
      children: (
        <Badge
          status={error && error && !error?.success ? "error" : "success"}
          text={error && !error?.success ? "Not Attempted" : "Submitted"}
        />
      ),
    },
    {
      key: "2",
      label: "Grading Status",
      children: (
        <Badge
          status={error && !error?.success ? "error" : "success"}
          text={
            error && !error?.success
              ? "Not Graded"
              : submittedAssignmentData?.data?.grade
          }
        />
      ),
    },
    {
      key: "3",
      label: "Assignment File",
      children: (
        <Link to={assignmentData?.data?.assignmentFileURL}>Preview</Link>
      ),
    },
    {
      key: "4",
      label: "Total Points",
      children: <ParagraphAtom text={assignmentData?.data?.point} />,
    },
    {
      key: "5",
      label: "Your Submitted File",
      children: (
        <>
          {error && !error?.success ? (
            <ParagraphAtom text="Not Yet Submitted" />
          ) : (
            <div className="iframe_container">
              <iframe
                width={"100%"}
                height={"700px"}
                className='class="responsive-iframe"'
                src={
                  submittedAssignmentData &&
                  submittedAssignmentData?.data?.assignmentFileURL
                }
              ></iframe>
            </div>
          )}
        </>
      ),
    },
  ];
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState<File>();
  const handleSubmitAssignment = async () => {
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("file_to_upload", file);
      const response = await AssignmentApi.submitAssignment(
        courseId,
        sectionId,
        assignmentId,
        formData
      );
      message.success(response?.data?.message);
      setLoading(false);
      if (!loading) {
        setFile(null);
      }
      setRecallApi(Math.random());
    } catch (error) {
      message.error(error?.response?.message);
      setLoading(false);
    }
  };
  const validateFile = (file: File) => {
    const isPdf = file.type === "application/pdf";
    const isLt100M = file.size <= 104857600;

    if (!isPdf) {
      message.error("You can only upload PDF file!");
    }
    if (!isLt100M) {
      message.error("File must smaller than 100MB!");
    }
    setFile(file);

    return false;
  };

  return (
    <div className="submit_assignment_container">
      {assignmentLoading ? (
        <QuizSubmissionSkeleton />
      ) : (
        <>
          <HeadingAtom
            text={assignmentData?.data?.title}
            level={3}
            style={{ color: "purple" }}
          />
          <ParagraphAtom
            text={assignmentData?.data?.description}
            className="text-24 mt-20"
          />
          <ParagraphAtom
            text={assignmentData?.data?.instructions}
            className="text-24 mt-20"
          />

          <Descriptions
            title={
              <HeadingAtom
                text="Submission Status"
                level={4}
                style={{ color: "purple" }}
              ></HeadingAtom>
            }
            layout="vertical"
            bordered
            items={items}
            column={2}
          />
          <div className="assignment_upload_div">
            <Upload listType="picture" maxCount={1} beforeUpload={validateFile}>
              <Button style={{ width: "100%" }} icon={<UploadOutlined />}>
                Upload (Max: 1)
              </Button>
            </Upload>
            <ButtonAtom
              disabled={!file}
              text="Submit"
              type="primary"
              className="mt-20"
              handleButtonClick={handleSubmitAssignment}
              loading={loading}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default AssignmentSubmission;
