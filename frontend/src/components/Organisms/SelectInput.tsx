import React from 'react';
import Select from 'react-select';

interface Props {
  options: any;
  onChange: (v: any) => void;
  value: any;
  placeholder?: string;
}
const SelectInput = ({ options, onChange, value, placeholder }: Props) => {
  return <Select options={options} onChange={onChange} value={value} placeholder={placeholder} />;
};

export default SelectInput;
