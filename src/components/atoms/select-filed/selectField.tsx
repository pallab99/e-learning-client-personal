import { Select } from 'antd';
import React from 'react';
const { Option } = Select;
interface ISelectField {
  defaultValue?: string;
  values: string[];
  placeholder?: string;
  fieldValues?: any;
}
export const SelectField: React.FC<ISelectField> = ({
  defaultValue,
  values,
  placeholder,
  fieldValues,
}) => {
  return (
    <Select
      defaultValue={defaultValue}
      style={{ width: '100%' }}
      placeholder={placeholder}
      {...fieldValues}
    >
      {values?.map((value, index) => {
        return (
          <Option value={value} key={index}>
            {value}
          </Option>
        );
      })}
    </Select>
  );
};
