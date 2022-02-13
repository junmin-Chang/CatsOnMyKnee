import React from 'react';
import CreatableSelect from 'react-select/creatable';
import styled from 'styled-components';
interface Props {
  onChange: (value: any) => void;
  name: string;
  value: any;
}
const components = {
  DropdownIndicator: null,
};
const Creatable = ({ onChange, name, value }: Props) => {
  return (
    <Styled
      components={components}
      onChange={onChange}
      isMulti
      placeholder="입력 후 ENTER"
      name={name}
      value={value}
      noOptionsMessage={() => null}
    />
  );
};

export default Creatable;

const Styled = styled(CreatableSelect)`
  width: 80%;
`;
