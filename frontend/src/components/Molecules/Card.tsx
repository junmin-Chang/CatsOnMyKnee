import React from 'react';
import styled from 'styled-components';
import { BiPlus } from 'react-icons/bi';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { modalAtom } from '@src/recoil/atom/modal';
import COText from '../Atoms/COText';
import { Cat } from '@src/typings/Cat';
import { Link } from 'react-router-dom';

interface Props {
  cat: Cat;
}

export const Card = ({ cat }: Props) => {
  return (
    <CardContent to={`/cat/${cat.name}`}>
      <COText fontSize={25} fontColor="#000000" fontWeight={700}>
        {cat.name}
      </COText>
      {cat.age}살 🐱
    </CardContent>
  );
};
export const AddCard = () => {
  const [modal, setModal] = useRecoilState(modalAtom);
  return (
    <CardButton onClick={() => setModal({ ...modal, id: 'enroll', visible: true, size: { width: 800, height: 800 } })}>
      <AddIcon />
    </CardButton>
  );
};
const CardContent = styled(Link)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #ffffff;
  border-radius: 15px;
  width: 130px;
  height: 130px;
  margin-right: 10px;
  text-decoration: none;
  color: #18171c;
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
