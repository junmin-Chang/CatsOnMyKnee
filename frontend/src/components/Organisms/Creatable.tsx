import React from 'react';
import CreatableSelect from 'react-select/creatable';
import styled from 'styled-components';
interface Props {
  onChange: (value: any) => void;
  name: string;
  value: any;
}
const Creatable = ({ onChange, name, value }: Props) => {
  return <Styled onChange={onChange} isMulti placeholder="입력해주세요" name={name} value={value} />;
};

export default Creatable;

const Styled = styled(CreatableSelect)`
  width: 80%;
`;
