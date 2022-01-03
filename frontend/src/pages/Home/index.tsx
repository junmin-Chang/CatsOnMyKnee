import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Home = () => {
  return (
    <Container>
      <h2>HOME PAGE</h2>
      <Content>
        <h3>This is home content</h3>
        <p>...</p>
        <Link to="/login">로그인하러 가기</Link>
      </Content>
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

const Content = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100%;
`;
