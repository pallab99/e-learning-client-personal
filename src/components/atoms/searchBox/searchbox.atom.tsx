import { Input } from 'antd';
import React, { ReactNode } from 'react';
const { Search } = Input;
import './searchbox.style.scss';
interface ISearchBox {
  className?: string;
  size?: 'large' | 'middle' | 'small';
  value?: string;
  onChange?: () => void;
  onPressEnter?: () => void;
  loading?: boolean;
  enterButton?: boolean | ReactNode;
  onSearch?: () => void;
  allowClear?: boolean;
  placeholder: string;
}
const SearchBoxAtom: React.FC<ISearchBox> = ({
  className,
  size,
  value,
  onChange,
  onPressEnter,
  onSearch,
  loading,
  enterButton,
  allowClear,
  placeholder,
}) => {
  return (
    <Search
      className={className}
      size={size}
      value={value}
      onChange={onChange}
      onPressEnter={onPressEnter}
      onSearch={onSearch}
      loading={loading}
      enterButton={enterButton}
      allowClear={allowClear}
      placeholder={placeholder}
    />
  );
};

export default SearchBoxAtom;
