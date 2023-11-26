import './headerSearchBar.scss';
import { useCallback, useState } from 'react';
import { debounce } from 'lodash';

import { AutoComplete, Image } from 'antd';
import { Link } from 'react-router-dom';
import HeadingAtom from '../../atoms/heading/heading.atom';
import useGetAutoCompleteSearch from '../../../hooks/course/useGetAutoCompleteSearch';
import InstructorCourseListSkeletonAtom from '../../atoms/instructorCourseListSkeleton/instructorCourseListSkeleton';

const HeaderSearchBarMolecules = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSetSearchTerm = useCallback(
    debounce((value: string) => {
      setSearchTerm(value);
    }, 1000),
    []
  );
  const handleSearch = (e: any) => {
    debouncedSetSearchTerm(e);
  };
  const { data, loading } = useGetAutoCompleteSearch(searchTerm);

  return (
    <div className="desktop-header-searchBar-div">
      <AutoComplete
        id="top_search_bar"
        style={{ width: '100%', borderRadius: '20px' }}
        placeholder="Search for anything"
        onSearch={handleSearch}
        listHeight={500}
        allowClear
        className="custom-auto-complete"
        size="large"
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
                          width={60}
                          height={40}
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
