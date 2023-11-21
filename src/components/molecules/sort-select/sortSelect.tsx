import { Select } from 'antd';
import React from 'react';

const filterOption = (
  input: string,
  option?: { label: string; value: string }
) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase());

interface ISelectProps {
  options?: any;
  placeholder: string;
  onChange?: any;
  onSearch?: any;
  mode?: any;
  style?: any;
  handleOnClick?: any;
  handleOnDeselect?: any;
}
const SortSelect: React.FC<ISelectProps> = ({
  options,
  placeholder,
  onChange,
  onSearch,
  mode,
  style,
  handleOnClick,
  handleOnDeselect,
}: any) => {
  return (
    <Select
      showSearch
      placeholder={placeholder}
      optionFilterProp="children"
      onChange={onChange}
      onSearch={onSearch}
      filterOption={filterOption}
      size="large"
      options={options}
      mode={mode}
      allowClear
      maxTagCount="responsive"
      style={style}
      onClick={handleOnClick}
      onDeselect={handleOnDeselect}
    />
  );
};

export default SortSelect;
