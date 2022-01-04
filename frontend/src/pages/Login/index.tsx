import React from 'react';
import styled from 'styled-components';
import COText from '@src/components/Atoms/COText';
import COLink from '@src/components/Atoms/COLink';
import LoginForm from '@src/components/Organisms/LoginForm';
import { GoogleLogin } from 'react-google-login';
const Login = () => {
  return (
    <Container>
      <h2>내 무릎 위 고양이에 로그인</h2>
      <LoginForm />

      <COText fontColor="#c2bebe" fontSize={16} fontWeight={400}>
        아직 회원이 아니신가요?
      </COText>
      <COLink size={18} to="/signup" weight={400} color="#F28500">
        회원가입
      </COLink>
    </Container>
  );
};
export default Login;

const Container = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
  align-items: center;
  padding: 15px;
`;
