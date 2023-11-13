import React from 'react';
import HeadingAtom from '../../../../atoms/heading/heading.atom';
import FlexAtom from '../../../../atoms/flex/flex.atom';
import ButtonAtom from '../../../../atoms/button/button.attom';
import SearchBoxAtom from '../../../../atoms/searchBox/searchbox.atom';
import './createCourseHeader.style.scss';
import { Link } from 'react-router-dom';
const CreateCourseHeader = () => {
  // const onClick=()=>{
  //   router
  // }
  return (
    <>
      <HeadingAtom text="Courses" level={2}></HeadingAtom>
      <FlexAtom justify="space-between">
        <div className="course-search-div">
          <SearchBoxAtom
            placeholder="Search for courses"
            size="large"
            allowClear={true}
            className="course-search-box"
          ></SearchBoxAtom>
        </div>
        <Link to="/instructor/course/create">
          <ButtonAtom text="New Course" type="primary" size="large" />
        </Link>
      </FlexAtom>
    </>
  );
};

export default CreateCourseHeader;
