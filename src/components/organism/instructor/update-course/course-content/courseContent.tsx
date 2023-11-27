//@ts-nocheck
import {
  DeleteOutlined,
  EditOutlined,
  FileOutlined,
  FilePdfOutlined,
} from "@ant-design/icons";
import { Collapse, Dropdown, Empty, MenuProps, Modal, Popconfirm } from "antd";
import React, { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import { Link, useParams } from "react-router-dom";
import useGetCourseSection from "../../../../../hooks/course-section/useGetCourseSection";
import ButtonAtom from "../../../../atoms/button/button.attom";
import CourseContentSkeleton from "../../../../atoms/course-content skeleton/courseContentSkeleton";
import HeadingAtom from "../../../../atoms/heading/heading.atom";
import CourseContentMolecules from "../../../../molecules/course-content/courseContent";
import CreateAssignmentMolecules from "../../../../molecules/course-content/create-assignment/createAssignment";
import CreateQuizModal from "../../../../molecules/course-content/create-quiz/createQuiz";
import UpdateCourseContentMolecules from "../../../../molecules/course-content/update-course-content/updatCourseContentModal";
import UpdateQuizModal from "../../../../molecules/course-content/update-quiz/updateQuiz";
import Quiz from "../../../../molecules/quiz-submision/quizSubmission";
import "./courseContent.scss";
// import {EditOutlined} from "@ant-design/icons"
import { pdfjs } from "react-pdf";
import useDisableAssignment from "../../../../../hooks/assignment/useDisableAssignment";
import useDeleteCourseContent from "../../../../../hooks/course-content/useDeleteContent";
import UpdateAssignmentMolecules from "../../../../molecules/course-content/update assignment/updateAssignment";

const CourseContent = () => {
  const { courseId } = useParams();
  const [recallApi, setRecallApi] = useState(0);
  const { data, loading } = useGetCourseSection(courseId as string, recallApi);

  const items = [
    {
      key: "1",
      label: "Create Content",
    },
    {
      key: "2",
      label: "Create Assignment",
    },
    {
      key: "3",
      label: "Create Quiz",
    },
  ];

  const [videoUrl, setVideoUrl] = React.useState("");
  const [isVideoModalVisible, setIsVideoModalVisible] = React.useState(false);
  const [isPlaying, setIsPlaying] = React.useState(false);
  const handleOpenVideoModal = (url: string) => {
    setVideoUrl(url);
    setIsVideoModalVisible(true);
    setIsPlaying(true);
  };

  const handleCloseVideoModal = () => {
    setIsVideoModalVisible(false);
    setIsPlaying(false);
  };
  const [videoPlayerClassName, setVideoPlayerClassName] = useState("");
  useEffect(() => {
    setVideoPlayerClassName("react-player");
  }, [isVideoModalVisible]);
  const [openAssignmentModal, setOpenAssignmentModal] = React.useState(false);
  const [openQuizModal, setOpenQuizModal] = React.useState(false);
  const [openEditQuizModal, setOpenEditQuizModal] = useState(false);
  const handleOpenAssignmentModal = () => {
    setOpenAssignmentModal(true);
  };
  const handleCloseAssignmentModal = () => {
    setOpenAssignmentModal(false);
  };

  const handleOpenQuizModal = () => {
    setOpenQuizModal(true);
  };
  const [quizData, setQuizData] = useState("");
  const [allQuizData, setAllQuizData] = useState({});
  const handleCloseQuizModal = () => {
    setOpenQuizModal(false);
    setQuizData("");
  };

  // const handleOpenUpdateQuizModal()
  const handleOpenEditQuizModal = () => {
    setOpenEditQuizModal(true);
  };
  const handleCloseEditQuizModal = () => {
    setOpenEditQuizModal(false);
  };
  const [handleOpenEditContentModal, setHandleOpenEditContentModal] =
    useState(false);
  const [contentData, setContentData] = useState({});
  useEffect(() => {
    pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
  }, []);
  const { deleteContentLoading, deleteCourseContent } =
    useDeleteCourseContent();
  const handleDeleteContent = async (contentId: string) => {
    await deleteCourseContent(contentId);
    if (!deleteContentLoading) {
      setRecallApi(Math.random());
    }
  };
  const { disableAssignmentLoader, disableAssignment } = useDisableAssignment();
  const handleDisableAssignment = async (
    sectionId: string,
    assignmentId: string
  ) => {
    await disableAssignment(courseId, sectionId, assignmentId);
    if (!disableAssignmentLoader) {
      setRecallApi(Math.random());
    }
  };
  const [openAssignmentPreview, setOpenAssignmnetPreview] = useState(false);
  const [assignmentFile, setAssignmentFile] = useState("");
  const [handleOpenEditAssignmentModal, setHandleOpenEditAssignmentModal] =
    useState(false);
  const [editAssignmentData, setEditAssignmentData] = useState({});
  const [sectionDtaaForUpdateAssignmnet, setSectionDataForUpdateAssignment] =
    useState({});
  const accordionItems = data?.data?.map((section: any) => {
    return {
      key: section._id,
      label: section.title,
      children: (
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
                    style={{ color: "red" }}
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
                    setEditAssignmentData(section?.assignment);
                    // setSectionDataForUpdateAssignment()
                  }}
                />
                <Popconfirm
                  title="Title"
                  description="Open Popconfirm with Promise"
                  onConfirm={() =>
                    handleDisableAssignment(
                      section?._id,
                      section?.assignment?._id
                    )
                  }
                >
                  <DeleteOutlined
                    className="cursor-pointer"
                    style={{ color: "red" }}
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
      ),
    };
  });

  const [openModal, setOpenModal] = React.useState(false);
  const handleOpenModal = () => {
    setOpenModal(true);
  };
  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const sectionData = data?.data?.map((ele: any) => {
    return {
      label: ele?.title,
      value: ele?._id,
    };
  });

  const onMenuClick: MenuProps["onClick"] = (e) => {
    if (e.key === "1") {
      handleOpenModal();
    } else if (e.key === "2") {
      handleOpenAssignmentModal();
    } else if (e.key === "3") {
      handleOpenQuizModal();
    }
  };
  return (
    <div className="create-course-wrapper">
      <div className="create-course-form mb-40 mt-40">
        <div className="create-content-btn">
          <Dropdown.Button menu={{ items, onClick: onMenuClick }}>
            Actions
          </Dropdown.Button>
        </div>
        {loading ? (
          <CourseContentSkeleton></CourseContentSkeleton>
        ) : data?.data?.length <= 0 ? (
          <Empty />
        ) : (
          <div className="accordion-div mt-20">
            <Collapse
              defaultActiveKey={accordionItems && accordionItems[0]?.key}
              accordion
              items={accordionItems}
            />
          </div>
        )}
        <CourseContentMolecules
          open={openModal}
          onClose={handleCloseModal}
          sectionData={sectionData}
          courseId={courseId}
          setRecallApi={setRecallApi}
        ></CourseContentMolecules>
        <UpdateCourseContentMolecules
          open={handleOpenEditContentModal}
          onClose={() => setHandleOpenEditContentModal(false)}
          sectionData={sectionData}
          contentData={contentData}
          courseId={courseId}
          setRecallApi={setRecallApi}
        ></UpdateCourseContentMolecules>
        <CreateAssignmentMolecules
          open={openAssignmentModal}
          onClose={handleCloseAssignmentModal}
          sectionData={sectionData}
          courseId={courseId}
          recallApi={setRecallApi}
        ></CreateAssignmentMolecules>
        <UpdateAssignmentMolecules
          open={handleOpenEditAssignmentModal}
          onClose={() => setHandleOpenEditAssignmentModal(false)}
          sectionData={sectionData}
          courseId={courseId}
          recallApi={setRecallApi}
          data={editAssignmentData}
        ></UpdateAssignmentMolecules>
        <CreateQuizModal
          open={openQuizModal}
          onClose={handleCloseQuizModal}
          sectionData={sectionData}
          courseId={courseId}
          recallApi={setRecallApi}
          quizData={quizData}
          // allQuizData={allQuizData}
        ></CreateQuizModal>
        <UpdateQuizModal
          open={openEditQuizModal}
          onClose={handleCloseEditQuizModal}
          sectionData={sectionData}
          courseId={courseId}
          recallApi={setRecallApi}
          quizData={quizData}
          allQuizData={allQuizData}
        ></UpdateQuizModal>
        <Modal
          open={isVideoModalVisible}
          onCancel={() => {
            handleCloseVideoModal();
            setIsPlaying(false);
          }}
          footer={null}
        >
          <ReactPlayer
            className={`${videoPlayerClassName} mt-30`}
            url={videoUrl}
            controls={true}
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
            playing={isPlaying}
          />
        </Modal>
      </div>
    </div>
  );
};

export default CourseContent;
