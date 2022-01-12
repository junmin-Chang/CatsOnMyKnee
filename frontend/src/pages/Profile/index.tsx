import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Card, AddCard } from '@src/components/Molecules/Card';
import COText from '@src/components/Atoms/COText';
import { useRecoilValue } from 'recoil';
import { userAtom } from '@src/recoil/atom';
import { Outlet } from 'react-router-dom';
const Profile = () => {
  const user = useRecoilValue(userAtom);

  return (
    <Container>
      <COText fontColor="#18171c" fontSize={25} fontWeight={600}>
        {user?.name}님의 아이들
      </COText>
      <CardContainer>
        {user && user.cat?.map((c, i) => <Card key={i} cat={c} />)}
        <AddCard />
      </CardContainer>
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
  padding: 30px;
`;

const CardContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 80%;
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

export default Profile;
