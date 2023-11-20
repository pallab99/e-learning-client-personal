import type { CollapseProps } from "antd";
import { Card, Collapse, Modal, Skeleton } from "antd";
import React, { useState } from "react";
import ReactPlayer from "react-player";
import { Link, useParams } from "react-router-dom";
import useGetCourseSection from "../../../../hooks/course-section/useGetCourseSection";
import ButtonAtom from "../../../atoms/button/button.attom";
import HeadingAtom from "../../../atoms/heading/heading.atom";
import ParagraphAtom from "../../../atoms/paragraph/paragraph.atom";
import Quiz from "../../quiz-submision/quizSubmission";
import "./courseContent.scss";

const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;

const items: CollapseProps["items"] = [
  {
    key: "1",
    label: (
      <div className="accordion_panel_title">
        <HeadingAtom text="Front-End Web Development" level={5}></HeadingAtom>
        <ParagraphAtom text="7 lectures 30 mins"></ParagraphAtom>
      </div>
    ),
    children: <p>{text}</p>,
  },
  {
    key: "2",
    label: (
      <div className="accordion_panel_title">
        <HeadingAtom text="Backend Web Development" level={5}></HeadingAtom>
        <ParagraphAtom text="7 lectures 30 mins"></ParagraphAtom>
      </div>
    ),
    children: <p>{text}</p>,
  },
  {
    key: "3",
    label: (
      <div className="accordion_panel_title">
        <HeadingAtom text="Full-Stack Web Development" level={5}></HeadingAtom>
        <ParagraphAtom text="7 lectures 30 mins"></ParagraphAtom>
      </div>
    ),
    children: <p>{text}</p>,
  },
  {
    key: "4",
    label: (
      <div className="accordion_panel_title">
        <HeadingAtom text="Front-End Web Development" level={5}></HeadingAtom>
        <ParagraphAtom text="7 lectures 30 mins"></ParagraphAtom>
      </div>
    ),
    children: <p>{text}</p>,
  },
];

const CourseContent = () => {
  const { courseId } = useParams();
  const { data, loading } = useGetCourseSection(courseId as string);
  console.log("course content", data);

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
  const accordionItems = data?.data?.map((section: any) => {
    return {
      key: section._id,
      label: section.title,
      children: (
        <div>
          <h3>Section Content</h3>
          {section?.sectionContent?.map((content: any) => (
            <Card className="mt-20" key={content._id}>
              {/* {console.log(content)} */}
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
              <Quiz instructor={false} quizData={section?.quiz}></Quiz>
            )}
          </div>
        </div>
      ),
    };
  });
  console.log("accordion", accordionItems);

  const [activeKeys, setActiveKeys] = React.useState([]);
  const controlCollapse = () => {
    if (activeKeys.length === items.length) {
      setActiveKeys([]);
    } else {
      setActiveKeys(items?.map((item: any) => item.key));
    }
  };
  return (
    <>
      {loading ? (
        [1, 2, 3, 4, 5].map((ele: any) => {
          <Skeleton active key={ele} className="mt-20 mb-30" />;
        })
      ) : (
        <div className="course-curriculum">
          <div className="course-curriculum_header">
            <HeadingAtom text="Course Content" level={3} />
          </div>
          <div className="course-curriculum_sub_header">
            <ParagraphAtom text="44 sections  •  380 lectures  •  62h 49m total length" />
            <ButtonAtom
              text={
                activeKeys.length === items.length
                  ? "Collapse All Section"
                  : "Expand All Section"
              }
              type="link"
              size="large"
              style={{ color: "#5624d0" }}
              handleButtonClick={controlCollapse}
            />
          </div>
          <div className="course-curriculum_content mt-20">
            <Collapse
              defaultActiveKey={["1"]}
              items={accordionItems}
              activeKey={activeKeys}
              onChange={setActiveKeys}
              style={{ backgroundColor: "#f6f9fa" }}
            />
          </div>
          <Modal
            open={isVideoModalVisible}
            onCancel={() => {
              handleCloseVideoModal();
              setIsPlaying(false);
            }}
            footer={null}
          >
            <ReactPlayer
              className={`react-player mt-30`}
              url={videoUrl}
              controls={true}
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
              playing={isPlaying}
              config={{ file: { attributes: { controlsList: "nodownload" } } }}
              onContextMenu={(e) => e.preventDefault()}
            />
          </Modal>
        </div>
      )}
    </>
  );
};

export default CourseContent;
