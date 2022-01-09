import React, { useCallback } from 'react';
import styled from 'styled-components';
import Logo from '../Molecules/Logo';
import LoginButton from '../Molecules/LoginButton';
import { useRecoilValue } from 'recoil';
import { userAtom } from '@src/recoil/atom';
import { logout } from '@src/api/api';

const Header = () => {
  const user = useRecoilValue(userAtom);

  return (
    <Container>
      <Logo />
      {!user && <LoginButton />}
      {user && <Button onClick={logout}>로그아웃</Button>}
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
const Button = styled.button`
  display: flex;
  flex-direction: row;
  background-color: #fff;
  border-radius: 8px;
  border: none;
  padding: 12px 10px;
  cursor: pointer;
  margin-left: auto;
  margin-right: 20px;
`;
