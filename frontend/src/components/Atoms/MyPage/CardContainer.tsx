import React from 'react';
import styled from 'styled-components';

const CardContainer: React.FC = ({ children }) => {
  return <Container>{children}</Container>;
};
export default CardContainer;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #fff;
  border-radius: 15px;
  width: 50%;
  box-shadow: rgba(136, 165, 191, 0.48) 6px 2px 16px 0px, rgba(255, 255, 255, 0.8) -6px -2px 16px 0px;
`;
