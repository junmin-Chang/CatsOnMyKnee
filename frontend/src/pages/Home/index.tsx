import axios from 'axios';
import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Home = () => {
  return (
    <Container>
      <h2>안녕하세요</h2>
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
