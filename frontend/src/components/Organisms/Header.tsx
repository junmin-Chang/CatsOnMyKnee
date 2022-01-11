import React, { useCallback } from 'react';
import styled from 'styled-components';
import Logo from '../Molecules/Logo';
import LoginButton from '../Molecules/LoginButton';
import { useRecoilValue, useResetRecoilState } from 'recoil';
import { userAtom } from '@src/recoil/atom';
import { logout } from '@src/api/api';
import { Link, useNavigate } from 'react-router-dom';
const Header = () => {
  const user = useRecoilValue(userAtom);
  const navigate = useNavigate();
  const resetUser = useResetRecoilState(userAtom);
  const onLogout = useCallback(() => {
    logout().then(() => {
      resetUser();
      navigate('/');
    });
  }, [resetUser, navigate]);
  return (
    <Container>
      <Logo />
      {!user && <LoginButton />}
      {user && (
        <ButtonWrapper>
          <ProfileLink to="/cat">프로필</ProfileLink>
          <Button onClick={onLogout}>로그아웃</Button>
        </ButtonWrapper>
      )}
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
  font-size: 16px;
`;

const ProfileLink = styled(Link)`
  display: flex;
  flex-direction: row;
  background-color: #fff;
  border-radius: 8px;
  border: none;
  padding: 12px 10px;
  cursor: pointer;
  margin-left: auto;
  margin-right: 20px;
  text-decoration: none;
  font-size: 16px;
  color: #18171c;
`;
const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  padding: 20px;
  margin-left: auto;
  margin-right: 20px;
  align-items: center;
`;
