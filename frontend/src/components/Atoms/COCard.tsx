import React from 'react';
import styled from 'styled-components';

interface Props {
  width: string;
  height: string;
  color?: string;
}
const COCard: React.FC<Props> = ({ children, width, height, color = '#ffffff' }) => {
  return (
    <Container width={width} height={height} color={color}>
      {children}
    </Container>
  );
};

export default COCard;

const Container = styled.div<{ width: string; height: string; color: string }>`
  display: flex;
  flex-direction: column;
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  background-color: ${({ color }) => color};
  border-radius: 20px;
  align-items: center;
  justify-content: center;
  text-align: center;
  transition: transform 250ms;
  &:hover {
    transform: translateY(-10px);
  }
`;
