import React from 'react';
import styled from 'styled-components';

interface Props {
  fontColor: string;
  fontSize: number;
  fontWeight?: number;
}
const COText: React.FC<Props> = ({ fontColor, fontSize, fontWeight = 300, children }) => {
  return (
    <TextArea fontColor={fontColor} fontSize={fontSize} fontWeight={fontWeight}>
      {children}
    </TextArea>
  );
};

export default COText;

const TextArea = styled.span<{ fontColor: string; fontSize: number; fontWeight?: number }>`
  color: ${({ fontColor }) => fontColor};
  font-weight: ${({ fontWeight }) => fontWeight};
  font-size: ${({ fontSize }) => fontSize}px;
`;
