import Search from 'antd/es/input/Search';
import './headerSearchBar.scss';
// import { searchTerm } from '../../../signals/course';
import { useCallback } from 'react';
import { debounce } from 'lodash';
import { useAppDispatch } from '../../../redux/store';
import { courseSearchTerm } from '../../../redux/slices/courseSlice';

const HeaderSearchBarMolecules = () => {
  const dispatch = useAppDispatch();
  const debouncedSetSearchTerm = useCallback(
    debounce((value: string) => {
      dispatch(courseSearchTerm(value));
    }, 1000),
    [dispatch]
  );
  const handleSearch = (e: any) => {
    debouncedSetSearchTerm(e.target.value);
  };
  return (
    <div className="desktop-header-searchBar-div">
      <Search
        style={{ borderStartEndRadius: '20px' }}
        className="desktop-header-searchBar"
        size="large"
        onChange={(e) => {
          handleSearch(e);
        }}
        allowClear
      ></Search>
    </div>
  );
};

export default HeaderSearchBarMolecules;
