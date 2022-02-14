import React from 'react';
import styled from 'styled-components';

const CODivider = ({ color = '#eee' }) => {
  return <Line color={color} />;
};

export default CODivider;

const Line = styled.hr<{ color: string }>`
  width: 80%;
  border: 1px solid ${({ color }) => color};
`;
