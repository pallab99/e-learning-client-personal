//@ts-nocheck
import {
  FileOutlined,
  FilePdfOutlined,
  FileUnknownOutlined,
} from '@ant-design/icons';
import { Checkbox, Collapse, Modal, Skeleton } from 'antd';
import React, { useState } from 'react';
import ReactPlayer from 'react-player';
import { Link, useParams } from 'react-router-dom';
import useGetCourseSection from '../../../../hooks/course-section/useGetCourseSection';
import useAddToUserProgress from '../../../../hooks/user-progress/useAddToUserProgress';
import useGetUserProgress from '../../../../hooks/user-progress/useGetUserProgress';
import ButtonAtom from '../../../atoms/button/button.attom';
import HeadingAtom from '../../../atoms/heading/heading.atom';
import ParagraphAtom from '../../../atoms/paragraph/paragraph.atom';
import './courseContent.scss';

const CourseContent = () => {
  const { courseId } = useParams();
  const { data, loading } = useGetCourseSection(courseId as string);
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
  const [recallApi, setRecallApi] = useState(0);
  const { addToUserProgress, userProgressLoading } = useAddToUserProgress();
  const { userProgressData } = useGetUserProgress(courseId, recallApi);

  const handleUserProgress = async (e: any, contendId: string) => {
    await addToUserProgress(courseId as string, contendId);
    if (!userProgressLoading) {
      setRecallApi(Math.random());
    }
  };

  const accordionItems = data?.data?.map((section: any) => {
    return {
      key: section._id,
      label: section.title,
      children: (
        <div>
          {section?.sectionContent?.map((content: any) => (
            <div className="course_content_div mt-20" key={content._id}>
              <div className="course_content_div_left_side">
                <FileOutlined />
                <ParagraphAtom text={content?.contentTitle} />
              </div>
              <div className="course_content_div_right_side">
                {content?.contentLength > 0 ? (
                  <ButtonAtom
                    handleButtonClick={() =>
                      handleOpenVideoModal(content?.contentUrl)
                    }
                    type="link"
                    text="Preview"
                    style={{
                      color: 'purple',
                      fontWeight: '500',
                    }}
                    disabled={content?.contentUrl ? false : true}
                    className={`${!content?.contentUrl && 'color-gray'}`}
                  />
                ) : (
                  <>
                    {content?.contentUrl ? (
                      <Link
                        style={{ color: 'purple', fontWeight: '500' }}
                        to={content.contentUrl}
                      >
                        Preview
                      </Link>
                    ) : null}
                  </>
                )}
                {content?.contentUrl && (
                  <Checkbox
                    checked={userProgressData?.data?.completedLessons?.includes(
                      content?._id
                    )}
                    onChange={(e) => handleUserProgress(e, content?._id)}
                  ></Checkbox>
                )}
              </div>
            </div>
          ))}
          {section?.assignment && (
            <div className="course_content_div mt-20">
              <div className="course_content_div_left_side">
                <FilePdfOutlined />
                <ParagraphAtom text={section?.assignment?.title} />
              </div>
              <div className="course_content_div_right_side">
                {section?.assignment?.assignmentFileURL ? (
                  <Link
                    style={{ color: 'purple', fontWeight: '500' }}
                    to={`/assignment/${courseId}/${section?._id}/${section?.assignment?._id}`}
                  >
                    Preview
                  </Link>
                ) : null}
                {section?.assignment?.assignmentFileURL && (
                  <Checkbox
                    checked={userProgressData?.data?.completedLessons?.includes(
                      section?.assignment?._id
                    )}
                    onChange={(e) =>
                      handleUserProgress(e, section?.assignment?._id)
                    }
                  ></Checkbox>
                )}
              </div>
            </div>
          )}
          {section?.quiz && (
            <div className="course_content_div mt-20">
              <div className="course_content_div_left_side">
                <FileUnknownOutlined />
                <ParagraphAtom text={section?.quiz?.title}></ParagraphAtom>
              </div>
              <div className="course_content_div_right_side">
                {section?.quiz && (
                  <>
                    {section?.quiz?.questions?.length ? (
                      <Link
                        style={{ color: 'purple', fontWeight: '500' }}
                        to={`/quiz/${section._id}/${section?.quiz?._id}`}
                      >
                        Preview
                      </Link>
                    ) : null}
                    {section?.quiz?.questions?.length ? (
                      <Checkbox
                        checked={userProgressData?.data?.completedLessons?.includes(
                          section?.quiz?._id
                        )}
                        onChange={(e) =>
                          handleUserProgress(e, section?.quiz?._id)
                        }
                      ></Checkbox>
                    ) : null}
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      ),
    };
  });

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
        [1, 2, 3, 4, 5, 6, 7].map((ele: any) => {
          <Skeleton active key={ele} className="mt-20 mb-30" />;
        })
      ) : (
        <div className="course-curriculum">
          <div className="course-curriculum_header">
            <HeadingAtom text="Course Content" level={3} />
          </div>

          <div className="course-curriculum_content mt-20">
            <Collapse
              defaultActiveKey={['1']}
              items={accordionItems}
              activeKey={activeKeys}
              onChange={setActiveKeys}
              style={{ backgroundColor: '#f6f9fa' }}
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
              config={{ file: { attributes: { controlsList: 'nodownload' } } }}
              onContextMenu={(e) => e.preventDefault()}
            />
          </Modal>
        </div>
      )}
    </>
  );
};

export default CourseContent;
