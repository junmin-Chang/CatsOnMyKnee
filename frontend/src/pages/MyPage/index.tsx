import Profile from '@src/components/Organisms/MyPage/Profile';
import React from 'react';
import styled from 'styled-components';
const MyPage = () => {
  return (
    <Container>
      <Profile />
    </Container>
  );
};

export default MyPage;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
  padding-top: 30px;
`;
