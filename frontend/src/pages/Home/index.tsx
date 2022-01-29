import HomeBanner from '@src/components/Organisms/Home/HomeBanner';
import HomeContent from '@src/components/Organisms/Home/HomeContent';
import React from 'react';
import { useRecoilValue } from 'recoil';
import { userAtom } from '@src/recoil/atom/user';
import styled from 'styled-components';

const Home = () => {
  const user = useRecoilValue(userAtom);
  console.log(user);
  return (
    <Container>
      <HomeBanner />
      <HomeContent />
    </Container>
  );
};

export default Home;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
`;
