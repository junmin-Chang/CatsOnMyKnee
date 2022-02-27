import React from 'react';
import styled from 'styled-components';

const InfoContainer: React.FC = ({ children }) => {
  return <Container>{children}</Container>;
};

export default InfoContainer;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: #fff;
  border-bottom-left-radius: 15px;
  border-bottom-right-radius: 15px;
  padding-top: 15%;
  padding-bottom: 5%;
  @media (max-width: 768px) {
    padding-top: 25%;
  }
`;
