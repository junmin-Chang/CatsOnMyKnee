import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const COFloating = () => {
  return <Container to="/cat">🐈</Container>;
};

export default COFloating;

const Container = styled(Link)`
  display: flex;
  position: fixed;
  width: 60px;
  height: 60px;
  bottom: 40px;
  right: 40px;
  background-color: #ffd078;
  border-radius: 50px;
  justify-content: center;
  text-decoration: none;
  box-shadow: 2px 2px 3px #999;
  align-items: center;
`;
