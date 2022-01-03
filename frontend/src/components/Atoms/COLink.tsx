import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
interface Props {
  color?: string;
  to: string;
  size: number;
  weight: number;
}
const COLink: React.FC<Props> = ({ children, color, to, size, weight }) => {
  return (
    <Button backgroundColor={color} to={to} fontSize={size} fontWeight={weight}>
      {children}
    </Button>
  );
};

export default COLink;

const Button = styled(Link)<{
  backgroundColor?: string;
  fontSize: number;
  fontWeight: number;
}>`
  background-color: ${({ backgroundColor }) => backgroundColor};
  padding: 8px 12px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  text-decoration: none;
  color: #18171c;
  font-size: ${({ fontSize }) => fontSize}px;
  font-weight: ${({ fontWeight }) => fontWeight};
`;
