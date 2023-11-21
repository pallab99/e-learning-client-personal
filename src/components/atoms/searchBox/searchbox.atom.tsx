import { Input } from "antd";
import React, { ReactNode } from "react";
import "./searchbox.style.scss";
const { Search } = Input;
interface ISearchBox {
  className?: string;
  size?: "large" | "middle" | "small";
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
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchValue = e.target.value;
    // console.log(searchValue); // This will log the current value of the search box every time it changes

    if (onChange) {
      onChange(e);
    }
  };

  return (
    <Search
      className={className}
      size={size}
      value={value}
      onChange={handleChange}
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
