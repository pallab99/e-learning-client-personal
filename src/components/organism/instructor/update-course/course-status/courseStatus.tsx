import { Skeleton, Steps } from 'antd';
import {
  LoadingOutlined,
  SmileOutlined,
  CheckOutlined,
  CloseOutlined,
} from '@ant-design/icons';
import ButtonAtom from '../../../../atoms/button/button.attom';
import useSubmitCoursePublicationRequest from '../../../../../hooks/course/useSubmitCoursePublicationRequest';
import useGetCourseById from '../../../../../hooks/course/useGetCourseById';
import { useParams } from 'react-router-dom';
import './courseSkeleton.scss';
import { useState } from 'react';
const CourseStatus = () => {
  const { courseId } = useParams();

  const [recallApi, setRecallApi] = useState(0);
  const { data, loading } = useGetCourseById(courseId as string, recallApi);
  const { submitForCoursePublications, coursePublicationRequestLoader } =
    useSubmitCoursePublicationRequest();
  const handleSubmitForCoursePublications = async () => {
    await submitForCoursePublications(courseId as string);
    if (!coursePublicationRequestLoader) {
      setRecallApi(Math.random());
    }
  };
  return (
    <div className="create-course-wrapper">
      <div className="create-course-form mb-40 mt-40">
        <>
          {loading ? (
            <div className="course-status-skeleton">
              <Skeleton.Input active />
              <Skeleton.Input active className="mt-10" />
            </div>
          ) : (
            <>
              <Steps
                items={[
                  {
                    title: 'Created',
                    status: 'finish',
                    icon: <CheckOutlined />,
                  },
                  {
                    title: 'Visible',
                    status: data?.data?.verified ? 'finish' : 'process',
                    icon: data?.data?.verified ? (
                      <CheckOutlined />
                    ) : (
                      <CloseOutlined />
                    ),
                  },
                  {
                    title: 'Published',
                    status: !data?.data?.verified ? 'wait' : 'finish',
                    icon: !data?.data?.verified ? (
                      <LoadingOutlined />
                    ) : (
                      <SmileOutlined />
                    ),
                  },
                ]}
              />
              {!data?.data?.verified && (
                <ButtonAtom
                  text="Apply for publication"
                  style={{ width: '100%' }}
                  type="primary"
                  size="large"
                  className="mt-50"
                  handleButtonClick={handleSubmitForCoursePublications}
                  loading={coursePublicationRequestLoader}
                />
              )}
            </>
          )}
        </>
      </div>
    </div>
  );
};

export default CourseStatus;
