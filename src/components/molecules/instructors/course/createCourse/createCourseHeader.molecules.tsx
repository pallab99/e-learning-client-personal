import { Link } from "react-router-dom";
import ButtonAtom from "../../../../atoms/button/button.attom";
import FlexAtom from "../../../../atoms/flex/flex.atom";
import HeadingAtom from "../../../../atoms/heading/heading.atom";
// import type { SearchProps } from "../Search";
import { Input } from "antd";
import { SearchProps } from "antd/es/input";
import { debounce } from "lodash";
import { useCallback } from "react";
import { instructorCourseSearchTerm } from "../../../../../redux/slices/instructorSearch";
import { useAppDispatch, useAppSelector } from "../../../../../redux/store";
import "./createCourseHeader.style.scss";
const { Search } = Input;
const CreateCourseHeader = () => {
  const dispatch = useAppDispatch();
  const courseSearchTerm = useAppSelector(
    (state) => state.instructor.searchTerm
  );

  const debouncedSetSearchTerm = useCallback(
    debounce(
      (value: string) => dispatch(instructorCourseSearchTerm(value)),
      1000
    ),
    [dispatch]
  );

  const onSearch: SearchProps["onSearch"] = (value) => {
    debouncedSetSearchTerm(value.target.value);
  };

  console.log("search", courseSearchTerm);

  return (
    <>
      <HeadingAtom text="Courses" level={2}></HeadingAtom>
      <FlexAtom justify="space-between">
        <div className="course-search-div">
          <Search
            className="course-search-box"
            onChange={onSearch}
            size="large"
            allowClear
            placeholder="Search Your course"
          />
        </div>
        <Link to="/instructor/course/create">
          <ButtonAtom text="New Course" type="primary" size="large" />
        </Link>
      </FlexAtom>
    </>
  );
};

export default CreateCourseHeader;
