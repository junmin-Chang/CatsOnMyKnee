import React, { useCallback } from 'react';
import styled from 'styled-components';
import { BiPlus } from 'react-icons/bi';
import { useSetRecoilState } from 'recoil';
import { modalAtom } from '@src/recoil/atom';
import COText from '../Atoms/COText';
import { Cat } from '@src/typings/Cat';

interface Props {
  cat: Cat;
}

export const Card = ({ cat }: Props) => {
  const setModal = useSetRecoilState(modalAtom);
  const onClickCard = useCallback(() => {
    setModal({ id: 'cat', visible: true, size: { width: 600, height: 400 } });
  }, [setModal]);
  return (
    <CardContent onClick={onClickCard}>
      <COText fontSize={25} fontColor="#000000" fontWeight={700}>
        {cat.name}
      </COText>
      {cat.age}살 🐱
    </CardContent>
  );
};
export const AddCard = () => {
  const setModal = useSetRecoilState(modalAtom);
  return (
    <CardButton onClick={() => setModal({ id: 'enroll', visible: true, size: { width: 500, height: 650 } })}>
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
