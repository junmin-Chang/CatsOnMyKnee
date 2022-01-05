import React from 'react';
import styled from 'styled-components';
import Logo from '../Molecules/Logo';
import LoginButton from '../Molecules/LoginButton';
import { useSetRecoilState } from 'recoil';
import { modalAtom } from '@src/recoil/atom';
const Header = () => {
  return (
    <Container>
      <Logo />
      <LoginButton />
    </Container>
  );
};
export default Header;

const Container = styled.div`
  display: flex;
  width: 100%;
  height: 80px;
  background-color: #f28500;
  align-items: center;
`;
