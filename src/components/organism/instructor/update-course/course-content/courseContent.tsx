import { Card, Collapse, Dropdown, MenuProps, Modal } from 'antd';
import React, { useEffect, useState } from 'react';
import ReactPlayer from 'react-player';
import { Link, useParams } from 'react-router-dom';
import useGetCourseSection from '../../../../../hooks/course-section/useGetCourseSection';
import ButtonAtom from '../../../../atoms/button/button.attom';
import CourseContentSkeleton from '../../../../atoms/course-content skeleton/courseContentSkeleton';
import HeadingAtom from '../../../../atoms/heading/heading.atom';
import ParagraphAtom from '../../../../atoms/paragraph/paragraph.atom';
import CourseContentMolecules from '../../../../molecules/course-content/courseContent';
import CreateAssignmentMolecules from '../../../../molecules/course-content/create-assignment/createAssignment';
import CreateQuizModal from '../../../../molecules/course-content/create-quiz/createQuiz';
import Quiz from '../../../../molecules/quiz-submision/quizSubmission';
import './courseContent.scss';
import { EditOutlined } from '@ant-design/icons';
import UpdateQuizModal from '../../../../molecules/course-content/update-quiz/updateQuiz';
const CourseContent = () => {
  const { courseId } = useParams();
  const [recallApi, setRecallApi] = useState(0);
  const { data, loading } = useGetCourseSection(courseId as string, recallApi);

  const items = [
    {
      key: '1',
      label: 'Create Content',
    },
    {
      key: '2',
      label: 'Create Assignment',
    },
    {
      key: '3',
      label: 'Create Quiz',
    },
  ];

  const [videoUrl, setVideoUrl] = React.useState('');
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
  const [videoPlayerClassName, setVideoPlayerClassName] = useState('');
  useEffect(() => {
    setVideoPlayerClassName('react-player');
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
  const [quizData, setQuizData] = useState('');
  const [allQuizData, setAllQuizData] = useState({});
  const handleCloseQuizModal = () => {
    setOpenQuizModal(false);
    setQuizData('');
  };

  // const handleOpenUpdateQuizModal()
  const handleOpenEditQuizModal = () => {
    setOpenEditQuizModal(true);
  };
  const handleCloseEditQuizModal = () => {
    setOpenEditQuizModal(false);
  };
  const accordionItems = data?.data?.map((section: any) => {
    return {
      key: section._id,
      label: section.title,
      children: (
        <div>
          <h3>Section Content</h3>
          {section.sectionContent.map((content: any) => (
            <Card className="mt-20" key={content._id}>
              <HeadingAtom level={5} text={content.contentTitle} />
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
              {content?.contentLength > 0 && (
                <ParagraphAtom
                  text={`Length: ${content.contentLength} secs`}
                ></ParagraphAtom>
              )}
            </Card>
          ))}
          {section.assignment && (
            <Card className="mt-20">
              <h3>Assignment</h3>
              <h4>{section.assignment.title}</h4>
              <p>Description: {section.assignment.description}</p>
              <p>Instructions: {section.assignment.instructions}</p>
              <p>File URL: {section.assignment.assignmentFileURL}</p>
            </Card>
          )}
          <div className="mt-20">
            {section?.quiz && (
              <>
                <div className="quiz_card_div_action_btn">
                  <EditOutlined
                    onClick={() => {
                      // openCreateQuizModal();
                      // setQuizData(question);
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

  const onMenuClick: MenuProps['onClick'] = (e) => {
    if (e.key === '1') {
      handleOpenModal();
    } else if (e.key === '2') {
      handleOpenAssignmentModal();
    } else if (e.key === '3') {
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
        ></CourseContentMolecules>
        <CreateAssignmentMolecules
          open={openAssignmentModal}
          onClose={handleCloseAssignmentModal}
          sectionData={sectionData}
          courseId={courseId}
          recallApi={setRecallApi}
        ></CreateAssignmentMolecules>

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
