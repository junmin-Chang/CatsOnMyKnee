import React from 'react';
import styled from 'styled-components';

interface Props {
  placeHolder?: string;
  inputWidth: number;
  inputHeight: number;
  borderColor?: string;
  name: string;
  type: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const COInput = ({ placeHolder, inputWidth, inputHeight, borderColor, name, onChange, type }: Props) => {
  return (
    <InputArea
      name={name}
      type={type}
      placeholder={placeHolder}
      inputWidth={inputWidth}
      inputHeight={inputHeight}
      borderColor={borderColor}
      onChange={onChange}
    />
  );
};

export default COInput;

const InputArea = styled.input<{ inputWidth: number; inputHeight: number; borderColor?: string }>`
  width: ${({ inputWidth }) => inputWidth}px;
  height: ${({ inputHeight }) => inputHeight}px;
  border: none;
  border-radius: 5px;
  outline: none;
  padding: 0 20px;
  border-color: ${({ borderColor }) => borderColor};
  &:focus {
    box-shadow: 0px 0px 4px #f28500;
    background: #ffffff;
    border: 1px solid #f28500;
  }
`;
