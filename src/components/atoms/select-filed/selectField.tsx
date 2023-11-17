import { Select } from "antd";
import React from "react";
const { Option } = Select;

interface ISelectField {
  defaultValue?: string;
  values: { value: string; label: string }[];
  placeholder?: string;
  fieldValues?: any;
  onChange?: any;
  size?: "small" | "default" | "large";
}

export const SelectField: React.FC<ISelectField> = ({
  defaultValue,
  values,
  placeholder,
  fieldValues,
  size,
}) => {
  return (
    <Select
      defaultValue={defaultValue}
      style={{ width: "100%" }}
      placeholder={placeholder}
      {...fieldValues}
      onChange={(value) => {
        fieldValues.onChange(value);
      }}
      size={size}
    >
      {values?.map((value: { value: string; label: string }, index: number) => {
        return (
          <Option value={value.value} key={index}>
            {value.label}
          </Option>
        );
      })}
    </Select>
  );
};
