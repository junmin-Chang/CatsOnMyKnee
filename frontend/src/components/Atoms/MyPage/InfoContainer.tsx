import React from 'react';
import styled from 'styled-components';

const InfoContainer: React.FC = ({ children }) => {
  return <Container>{children}</Container>;
};

export default InfoContainer;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  border-radius: 15px;
  margin-top: auto;
  padding: 15px;
`;
