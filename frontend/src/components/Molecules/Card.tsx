import React from 'react';
import styled from 'styled-components';
import { BiPlus, BiPlusMedical } from 'react-icons/bi';
export const Card = () => {
  return <CardContent />;
};
export const AddCard = () => {
  return (
    <CardButton>
      <AddIcon />
    </CardButton>
  );
};
const CardContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #ffffff;
  border-radius: 15px;
  width: 130px;
  height: 130px;
  margin-right: 10px;
  cursor: pointer;
`;

const CardButton = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #ffffff44;
  border-radius: 15px;
  width: 130px;
  height: 130px;
  margin-right: 10px;
  cursor: pointer;
`;
const AddIcon = styled(BiPlus)`
  color: #ffffff;
  width: 100px;
  height: 100px;
`;
