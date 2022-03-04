import React from 'react';
import Select from 'react-select';

interface Props {
  options: any;
  onChange: (v: any) => void;
  value: any;
  placeholder?: string;
}
const SelectInput = ({ options, onChange, value, placeholder }: Props) => {
  return (
    <Select
      options={options}
      onChange={onChange}
      value={value}
      placeholder={placeholder}
      isSearchable={false}
      styles={{
        input: (base) => ({
          ...base,
          height: 28,
          width: 200,
        }),
        control: (base) => ({
          ...base,
          fontSize: 16,
        }),
        menu: (base) => ({
          ...base,
          fontSize: 16,
        }),
      }}
    />
  );
};

export default SelectInput;
