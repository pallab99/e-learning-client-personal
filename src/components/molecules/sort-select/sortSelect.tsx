import { Select } from 'antd';
import React from 'react';

const onChange = (value: string) => {
  console.log(`selected ${value}`);
};

const onSearch = (value: string) => {
  console.log('search:', value);
};

// Filter `option.label` match the user type `input`
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
}
const SortSelect: React.FC<ISelectProps> = ({
  options,
  placeholder,
  onChange,
  onSearch,
  mode,
  style,
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
    />
  );
};

export default SortSelect;
