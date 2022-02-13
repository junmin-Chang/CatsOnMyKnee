import React from 'react';
import styled from 'styled-components';

const CardContainer: React.FC = ({ children }) => {
  return <Container>{children}</Container>;
};
export default CardContainer;

const Container = styled.div`
  background-color: #ffd078;
  border-radius: 15px;
  width: 50%;
  height: 700px;
`;
