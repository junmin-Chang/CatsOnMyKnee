import React from 'react';
import styled from 'styled-components';

const COLabel: React.FC = ({ children }) => {
  return <Container>{children}</Container>;
};

export default COLabel;

const Container = styled.div`
  background-color: #fff;
  border-radius: 15px;
  padding: 8px 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #000;
  font-size: 20px;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
  margin-right: 10px;
`;
