import React from 'react';
import styled from 'styled-components';

const COError: React.FC = ({ children }) => {
  return <Error>{children}</Error>;
};

export default COError;

const Error = styled.span`
  font-size: 15px;
  color: red;
  margin: 10px 0;
`;
