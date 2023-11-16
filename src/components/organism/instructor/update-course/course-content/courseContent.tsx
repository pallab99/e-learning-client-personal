import React, { useState } from 'react';
import ButtonAtom from '../../../../atoms/button/button.attom';
import CourseContentMolecules from '../../../../molecules/course-content/courseContent';
import useGetCourseSection from '../../../../../hooks/course-section/useGetCourseSection';
import { useParams } from 'react-router-dom';
import { message } from 'antd';
import CreateAssignmentMolecules from '../../../../molecules/course-content/create-assignment/createAssignment';
import './courseContent.scss';
const CourseContent = () => {
  const { courseId } = useParams();
  const [openModal, setOpenModal] = React.useState(false);
  const handleOpenModal = () => {
    setOpenModal(true);
  };
  const handleCloseModal = () => {
    setOpenModal(false);
  };
  const [openAssignmentModal, setOpenAssignmentModal] = React.useState(false);
  const handleOpenAssignmentModal = () => {
    setOpenAssignmentModal(true);
  };
  const handleCloseAssignmentModal = () => {
    setOpenAssignmentModal(false);
  };
  const { data, loading } = useGetCourseSection(courseId);
  console.log(data);
  const sectionData = data?.data?.map((ele: any) => {
    return {
      label: ele?.title,
      value: ele?._id,
    };
  });

  return (
    <div className="create-course-wrapper">
      <div className="create-course-form mb-40 mt-40">
        <div className="create-content-btn">
          <ButtonAtom
            text="Create Content"
            type="primary"
            handleButtonClick={handleOpenModal}
          ></ButtonAtom>
          <ButtonAtom
            text="Create Assignment"
            type="primary"
            handleButtonClick={handleOpenAssignmentModal}
          ></ButtonAtom>
        </div>
        <CourseContentMolecules
          open={openModal}
          onClose={handleCloseModal}
          sectionData={sectionData}
        ></CourseContentMolecules>
        <CreateAssignmentMolecules
          open={openAssignmentModal}
          onClose={handleCloseAssignmentModal}
          sectionData={sectionData}
        ></CreateAssignmentMolecules>
      </div>
    </div>
  );
};

export default CourseContent;
