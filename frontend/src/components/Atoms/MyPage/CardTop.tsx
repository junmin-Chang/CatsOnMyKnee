import React from 'react';
import styled from 'styled-components';

const CardTop: React.FC = ({ children }) => {
  return <Container>{children}</Container>;
};

export default CardTop;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #ffd078;
  width: 100%;
  height: 150px;
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
  align-items: center;

  & > img {
    transform: translateY(55px);
  }
`;
