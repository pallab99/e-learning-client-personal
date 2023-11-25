import './headerSearchBar.scss';
import { useCallback } from 'react';
import { debounce } from 'lodash';
import { useAppDispatch, useAppSelector } from '../../../redux/store';
import { courseSearchTerm } from '../../../redux/slices/courseSlice';
import { AutoComplete, Image } from 'antd';
import { Link } from 'react-router-dom';
import HeadingAtom from '../../atoms/heading/heading.atom';
import useGetAutoCompleteSearch from '../../../hooks/course/useGetAutoCompleteSearch';
import InstructorCourseListSkeletonAtom from '../../atoms/instructorCourseListSkeleton/instructorCourseListSkeleton';

const HeaderSearchBarMolecules = () => {
  const dispatch = useAppDispatch();
  const debouncedSetSearchTerm = useCallback(
    debounce((value: string) => {
      dispatch(courseSearchTerm(value));
    }, 1000),
    [dispatch]
  );
  const handleSearch = (e: any) => {
    debouncedSetSearchTerm(e);
  };
  const { data, loading } = useGetAutoCompleteSearch();

  return (
    <div className="desktop-header-searchBar-div">
      <AutoComplete
        style={{ width: '100%' }}
        placeholder="Search here"
        onSearch={handleSearch}
        listHeight={500}
        allowClear
      >
        {data
          ? data?.map((option: any, index: any) => (
              <AutoComplete.Option key={index} value={option.title}>
                {loading ? (
                  [1, 2, 3, 4, 5, 6, 7, 8].map((ele: any) => (
                    <InstructorCourseListSkeletonAtom key={ele} />
                  ))
                ) : (
                  <Link to={`/course/${option?._id}`}>
                    <div className="course-card-div mt-20">
                      <div className="card-left">
                        <Image
                          src={option?.thumbnail}
                          alt="Course thumbnail"
                          width={80}
                          height={50}
                        />
                        <HeadingAtom
                          text={option.title}
                          level={5}
                          ellipsis={true}
                        ></HeadingAtom>
                      </div>
                    </div>
                  </Link>
                )}
              </AutoComplete.Option>
            ))
          : null}
      </AutoComplete>
    </div>
  );
};

export default HeaderSearchBarMolecules;
