import { useForm } from 'react-hook-form';
// import './createCourse.scss';
import { useNavigate, useParams } from 'react-router-dom';
import ButtonAtom from '../../../../atoms/button/button.attom';
// import useGetCourseById from "../../../../hooks/course/useGetCourseById";
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Card } from 'antd';
import { useEffect, useState } from 'react';
import useGetCourseSection from '../../../../../hooks/course-section/useGetCourseSection';
import HeadingAtom from '../../../../atoms/heading/heading.atom';
import InstructorCourseListSkeletonAtom from '../../../../atoms/instructorCourseListSkeleton/instructorCourseListSkeleton';
import ParagraphAtom from '../../../../atoms/paragraph/paragraph.atom';
import CreateSectionModal from '../../../../molecules/create-section/createSection';
import './courseSection.scss';
const CourseSection = () => {
  const { courseId } = useParams();
  const { data, loading } = useGetCourseSection(courseId as string);

  const [openModal, setOpenModal] = useState(false);
  const handleOpenModal = () => {
    setOpenModal(true);
  };
  const [sectionData, setSectionData] = useState({
    id: '',
    title: '',
  });
  const handleCloseModal = (event: any) => {
    event.stopPropagation();
    setOpenModal(false);
    setSectionData({
      id: '',
      title: '',
    });
  };

  const navigate = useNavigate();

  const handleSectionTitle = (id: any, title: any) => {
    setSectionData({ id: id, title: title });
    handleOpenModal();
  };

  return (
    <div className="create-course-wrapper">
      <div className="create-course-form mb-40 mt-40">
        <div className="create-section-btn">
          <ButtonAtom
            text="Create Section"
            type="primary"
            handleButtonClick={handleOpenModal}
          ></ButtonAtom>
        </div>
        {loading
          ? [1, 2, 3, 4, 5].map((ele: any) => {
              return <InstructorCourseListSkeletonAtom key={ele} />;
            })
          : data?.data?.map((ele: any) => {
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
                          onClick={() =>
                            handleSectionTitle(ele?._id, ele?.title)
                          }
                        />
                        <DeleteOutlined />
                      </div>
                    </div>
                  </Card>
                </div>
              );
            })}
      </div>
      <CreateSectionModal
        courseId={courseId}
        open={openModal}
        onClose={handleCloseModal}
        data={sectionData}
      ></CreateSectionModal>
    </div>
  );
};

export default CourseSection;
