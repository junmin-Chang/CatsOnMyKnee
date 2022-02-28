import React from 'react';
import styled from 'styled-components';
import { Card, AddCard } from '@src/components/Molecules/Card';
import COText from '@src/components/Atoms/COText';
import { useRecoilValue } from 'recoil';
import { catAtom } from '@src/recoil/atom/cat';
import { userAtom } from '@src/recoil/atom/user';
import { Outlet } from 'react-router-dom';
import EmptyCat from '@src/components/Organisms/Animation/EmptyCat';
const Cat = () => {
  const user = useRecoilValue(userAtom);
  const cats = useRecoilValue(catAtom);
  return (
    <Container>
      <COText fontColor="#18171c" fontSize={25} fontWeight={600}>
        {user?.name}님의 아이들
      </COText>
      <CardContainer>
        {cats && cats.map((c, i) => <Card key={i} cat={c} />)}
        <AddCard />
      </CardContainer>
      {cats.length === 0 && <EmptyCat />}
      <Outlet />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  align-items: center;
  padding-top: 30px;
`;

const CardContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 90%;
  min-height: 150px;
  border-radius: 15px;
  background-color: #ffd078;
  border: none;
  align-items: center;
  padding: 0 10px;
  margin: 20px 0;
  overflow-x: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
`;

export default Cat;
