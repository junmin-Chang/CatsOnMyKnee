import { userAtom } from '@src/recoil/atom';
import React from 'react';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';

const Home = () => {
  const user = useRecoilValue(userAtom);
  console.log(user);
  return (
    <Container>
      <h2>안녕하세요 {user?.name}님</h2>
    </Container>
  );
};

export default Home;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;
