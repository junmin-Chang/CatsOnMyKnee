import React from 'react';
import styled from 'styled-components';

const COLabel: React.FC = ({ children }) => {
  return <Container>{children}</Container>;
};

export default COLabel;

const Container = styled.div`
  background-color: #ffd078;
  border-radius: 15px;
  padding: 8px 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
`;
