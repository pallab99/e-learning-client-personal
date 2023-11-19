import { useParams } from 'react-router-dom';
import ButtonAtom from '../../../../atoms/button/button.attom';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Card, Empty, Slider, Switch, Tooltip, message } from 'antd';
import { useState } from 'react';
import useGetCourseSection from '../../../../../hooks/course-section/useGetCourseSection';
import HeadingAtom from '../../../../atoms/heading/heading.atom';
import InstructorCourseListSkeletonAtom from '../../../../atoms/instructorCourseListSkeleton/instructorCourseListSkeleton';
import ParagraphAtom from '../../../../atoms/paragraph/paragraph.atom';
import CreateSectionModal from '../../../../molecules/create-section/createSection';
import './courseSection.scss';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import CourseSectionApi from '../../../../../api/CourseSectionApi';
const CourseSection = () => {
  const { courseId } = useParams();
  const [recallCourseSectionApi, setRecallCourseSectionApi] = useState(0);
  const { data, loading } = useGetCourseSection(
    courseId as string,
    recallCourseSectionApi
  );

  const [openModal, setOpenModal] = useState(false);
  const handleOpenModal = () => {
    setOpenModal(true);
  };
  const [sectionData, setSectionData] = useState({
    id: '',
    title: '',
  });
  const handleCloseModal = () => {
    setOpenModal(false);
    setSectionData({
      id: '',
      title: '',
    });
  };

  const handleSectionTitle = (id: any, title: any) => {
    setSectionData({ id: id, title: title });
    handleOpenModal();
  };
  const [switchLoading, setSwitchLoading] = useState(false);
  // const[courseSectionId,setCourseSectionId]=useState()
  const handleSectionVisibility = async (
    courseSectionId: string,
    checked: boolean
  ) => {
    console.log(checked);
    try {
      setSwitchLoading(true);
      let type = 'enable';
      if (checked === true) {
        console.log('checked');
        type = 'disable';
      }
      const res = await CourseSectionApi.changeCourseSectionVisibility(
        courseId,
        courseSectionId,
        type
      );
      console.log(res?.data);
      message.success(res?.data?.message);
      setSwitchLoading(false);
      setRecallCourseSectionApi(recallCourseSectionApi + 1);
    } catch (error: any) {
      message.error(error?.response?.message);
      setSwitchLoading(false);
    }
    console.log(checked);
  };
  return (
    <div className="create-course-wrapper">
      <div className="create-course-form mb-40 mt-40">
        <div className="create-section-btn">
          <ButtonAtom
            text="Create Section"
            type="primary"
            handleButtonClick={handleOpenModal}
          />
        </div>
        {loading ? (
          [1, 2, 3, 4, 5].map((ele: any) => {
            return <InstructorCourseListSkeletonAtom key={ele} />;
          })
        ) : data?.data?.length === 0 ? (
          <Empty description="No data" />
        ) : (
          data?.data?.map((ele: any) => {
            return (
              <div className="mt-20 cursor-pointer card-hover" key={ele._id}>
                <Card className="course-card" style={{ width: '100%' }}>
                  <div className="section-card-div">
                    <div className="card-left">
                      <HeadingAtom
                        text={ele.title || 'jjjj'}
                        level={5}
                        ellipsis={true}
                      ></HeadingAtom>
                    </div>
                    <div className="section-card-right">
                      <ParagraphAtom
                        text={`Total ${ele?.totalVideo} videos`}
                        className="full-width"
                      ></ParagraphAtom>
                      <ParagraphAtom
                        text={`Total ${ele?.totalHours} hours`}
                        className="full-width"
                      ></ParagraphAtom>
                    </div>
                    <div className="course-section-icon">
                      <EditOutlined
                        onClick={() => handleSectionTitle(ele?._id, ele?.title)}
                      />
                      <Tooltip title="Change Section visibility">
                        <Switch
                          checkedChildren={<CheckOutlined />}
                          unCheckedChildren={<CloseOutlined />}
                          defaultChecked={!!ele?.isVisible}
                          size="small"
                          onChange={(checked) =>
                            handleSectionVisibility(ele?._id, checked)
                          }
                          loading={switchLoading}
                          key={ele?._id}
                        />
                      </Tooltip>
                    </div>
                  </div>
                </Card>
              </div>
            );
          })
        )}
      </div>
      <CreateSectionModal
        courseId={courseId}
        open={openModal}
        onClose={handleCloseModal}
        data={sectionData}
        recallApi={setRecallCourseSectionApi}
      />
    </div>
  );
};

export default CourseSection;
