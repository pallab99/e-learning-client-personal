//@ts-nocheck
import {
  DeleteOutlined,
  EditOutlined,
  FileOutlined,
  FilePdfOutlined,
} from "@ant-design/icons";
import { Modal, Popconfirm } from "antd";
import { Link } from "react-router-dom";
import ButtonAtom from "../../atoms/button/button.attom";
import HeadingAtom from "../../atoms/heading/heading.atom";
import Quiz from "../quiz-submision/quizSubmission";
export default function InstructorCourseContentAccordionItems({
  content,
  handleOpenVideoModal,
  setHandleOpenEditContentModal,
  setContentData,
  handleDeleteContent,
  _id,
  section,
  assignment,
  title,
  point,
  setOpenAssignmnetPreview,
  setAssignmentFile,
  assignmentFileURL,
  openAssignmentPreview,
  assignmentFile,
  setHandleOpenEditAssignmentModal,
  setEditAssignmentData,
  handleDisableAssignment,
  quiz,
  handleOpenEditQuizModal,
  setAllQuizData,
  handleOpenQuizModal,
  setQuizData,
}) {
  return (
    <div>
      <h3>Section Content</h3>
      {section.sectionContent.map((content: any) => (
        <div
          className="instructor_section_content_flex mt-30"
          key={content._id}
        >
          <div className="instructor_section_content_flex_left">
            <FileOutlined />
            <HeadingAtom level={5} text={content.contentTitle} />
          </div>
          <div className="instructor_section_content_flex_right">
            {content.contentLength > 0 ? (
              <ButtonAtom
                handleButtonClick={() =>
                  handleOpenVideoModal(content.contentUrl)
                }
                type="link"
                text="Preview"
              />
            ) : (
              <Link to={content.contentUrl}>Preview</Link>
            )}
            <EditOutlined
              className="cursor-pointer"
              onClick={() => {
                setHandleOpenEditContentModal(true);
                setContentData(content);
              }}
            />
            <Popconfirm
              title="Title"
              description="Open Popconfirm with Promise"
              onConfirm={() => handleDeleteContent(content?._id)}
              onOpenChange={() => console.log("open change")}
            >
              <DeleteOutlined
                className="cursor-pointer"
                style={{
                  color: "red",
                }}
              />
            </Popconfirm>
          </div>
        </div>
      ))}
      {section?.assignment && (
        <div className="mt-20 instructor_section_content_flex">
          <div className="instructor_section_content_flex_left">
            <FilePdfOutlined />
            <HeadingAtom
              level={5}
              text={section?.assignment?.title}
            ></HeadingAtom>
            <HeadingAtom
              level={5}
              text={`Point: ${section?.assignment?.point}`}
            ></HeadingAtom>
          </div>
          <div className="instructor_section_content_flex_right">
            <ButtonAtom
              text="Preview"
              type="text"
              handleButtonClick={() => {
                setOpenAssignmnetPreview(true);
                setAssignmentFile(section?.assignment?.assignmentFileURL);
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
                  height={600}
                  width={"100%"}
                ></iframe>
              </div>
            </Modal>
            <EditOutlined
              className="cursor-pointer"
              onClick={() => {
                setHandleOpenEditAssignmentModal(true);
                setEditAssignmentData(section?.assignment); // setSectionDataForUpdateAssignment()
              }}
            />
            <Popconfirm
              title="Title"
              description="Open Popconfirm with Promise"
              onConfirm={() =>
                handleDisableAssignment(section?._id, section?.assignment?._id)
              }
            >
              <DeleteOutlined
                className="cursor-pointer"
                style={{
                  color: "red",
                }}
              />
            </Popconfirm>
          </div>
        </div>
      )}
      <div className="mt-20">
        {section?.quiz && (
          <>
            <div className="quiz_card_div_action_btn">
              <EditOutlined
                onClick={() => {
                  handleOpenEditQuizModal();
                  setAllQuizData(section?.quiz);
                }}
              ></EditOutlined>
              {/* <Switch></Switch> */}
            </div>

            <div className="course_content_quiz_divv">
              <Quiz
                instructor={true}
                quizData={section?.quiz}
                openCreateQuizModal={handleOpenQuizModal}
                setQuizData={setQuizData}
                setAllQuizData={setAllQuizData}
              ></Quiz>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
