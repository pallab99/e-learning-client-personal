import { Card, Image, Popconfirm, Popover, Tag } from 'antd';
import { Link } from 'react-router-dom';
import FlexAtom from '../../../../atoms/flex/flex.atom';
import HeadingAtom from '../../../../atoms/heading/heading.atom';
import './courseCard.style.scss';
import {
  DashOutlined,
  SyncOutlined,
  CheckCircleOutlined,
} from '@ant-design/icons';
import ButtonAtom from '../../../../atoms/button/button.attom';
import useSubmitCoursePublicationRequest from '../../../../../hooks/course/useSubmitCoursePublicationRequest';
const CourseCardOrganism = ({ data }: any) => {
  const { submitForCoursePublications, coursePublicationRequestLoader } =
    useSubmitCoursePublicationRequest();
  const handleSubmitForCoursePublications = async (courseId: string) => {
    await submitForCoursePublications(courseId);
  };
  return (
    <>
      {data?.map((ele: any) => (
        <FlexAtom
          justify="space-evenly"
          gap="large"
          class="mt-20 cursor-pointer card-hover"
          key={ele._id}
        >
          <Card className="course-card" style={{ width: '100%' }}>
            <div className="course-card-div">
              <div className="card-left">
                <Image
                  src={ele?.thumbnail}
                  alt="Course thumbnail"
                  width={120}
                  height={80}
                />
                <Link to={`/instructor/course/update/${ele?._id}`}>
                  <HeadingAtom
                    text={ele.title}
                    level={5}
                    ellipsis={true}
                  ></HeadingAtom>
                  {ele?.verified ? (
                    <Tag icon={<CheckCircleOutlined />} color="success">
                      Published
                    </Tag>
                  ) : (
                    <Tag icon={<SyncOutlined spin />} color="processing">
                      Pending
                    </Tag>
                  )}
                </Link>
              </div>
              {!ele?.verified && (
                <Popover
                  content={
                    <ButtonAtom
                      text="Submit for Review"
                      handleButtonClick={() =>
                        handleSubmitForCoursePublications(ele?._id)
                      }
                      loading={coursePublicationRequestLoader}
                    ></ButtonAtom>
                  }
                  trigger="click"
                >
                  <DashOutlined
                    style={{ fontSize: '24px', paddingRight: '2%' }}
                  />
                </Popover>
              )}
            </div>
          </Card>
        </FlexAtom>
      ))}
    </>
  );
};

export default CourseCardOrganism;
