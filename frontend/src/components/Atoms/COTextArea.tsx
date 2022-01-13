import React from 'react';
import styled from 'styled-components';

interface Props {
  onChange?: (e: any) => void;
  disabled: boolean;
  name?: string;
  value?: any;
  height?: number;
  defaultValue?: string;
}
const COTextArea = ({ onChange, disabled, name, value, height, defaultValue }: Props) => {
  return (
    <TextArea
      name={name}
      value={value}
      onChange={onChange}
      disabled={disabled}
      height={height}
      defaultValue={defaultValue}
    />
  );
};

export default COTextArea;

const TextArea = styled.textarea<{ height: any }>`
  background: url('http://i.stack.imgur.com/ynxjD.png') repeat-y;
  width: 100%;
  height: ${({ height }) => (height ? height + 'px' : '100%')};
  line-height: 25px;
  padding: 2px 10px;
  border: none;
  resize: none;
  font-family: inherit;
  color: #18171c;
`;
