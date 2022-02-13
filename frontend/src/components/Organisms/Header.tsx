import React, { useCallback, useRef, useState } from 'react';
import styled from 'styled-components';
import Logo from '../Molecules/Logo';
import LoginButton from '../Molecules/LoginButton';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { userAtom } from '@src/recoil/atom/user';
import { logout } from '@src/api/User/index';
import { useNavigate } from 'react-router-dom';
import useOutsideClick from '@src/hooks/useOutsideClick';
import { Link } from 'react-router-dom';

const Header = () => {
  const user = useRecoilValue(userAtom);
  const navigate = useNavigate();
  const setUser = useSetRecoilState(userAtom);
  const [active, setActive] = useState<boolean>(false);
  const dropdownRef = useRef(null);
  const onToggle = useCallback(() => {
    setActive((prev) => !prev);
  }, []);
  const onLogout = useCallback(() => {
    logout().then(() => {
      setUser(null);
      navigate('/');
    });
  }, [setUser, navigate]);

  useOutsideClick(dropdownRef, () => setActive(false));
  return (
    <Container>
      <Logo />
      {!user && <LoginButton />}
      {user && (
        <ButtonWrapper>
          <ProfileImage src={user.profileImage} alt="profile_image" onClick={onToggle} />
          {active && (
            <Dropdown ref={dropdownRef}>
              <Ul>
                <Li>
                  <Menu to="/cat" onClick={onToggle}>
                    고양이들
                  </Menu>
                </Li>
                <Li>
                  <Menu to="/profile" onClick={onToggle}>
                    내 정보
                  </Menu>
                </Li>
              </Ul>
            </Dropdown>
          )}
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

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  padding: 20px;
  margin-left: auto;
  margin-right: 20px;
  align-items: center;
`;

const ProfileImage = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50px;
  margin-right: 20px;
`;

const Ul = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const Li = styled.li`
  border-bottom: 1px solid #dddddd;
`;

const Menu = styled(Link)`
  color: #333333;
  text-decoration: none;
  padding: 15px 20px;
  display: block;
  font-size: 20px;
  cursor: pointer;
  user-select: none;
  :hover {
    background-color: #f28500;
    color: '#ffffff';
  }
`;

const Dropdown = styled.div`
  background-color: #ffffff;
  z-index: 100;
  border-radius: 8px;
  position: absolute;
  top: 80px;
  right: 100px;
  width: 200px;
  box-shadow: 0 1px 8px rgba(0, 0, 0, 0.3);
  transform: translateY(-20px);
  transition: opacity 0.4s ease, transform 0.4s ease, visibility 0.4s;
`;
