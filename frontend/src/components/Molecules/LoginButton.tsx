import React from 'react';
import styled from 'styled-components';
import COLink from '../Atoms/COLink';

const LoginButton = () => {
  return (
    <Container>
      <COLink color="#FFEDAD" to="/login" size={16} weight={500}>
        로그인 하러가기
      </COLink>
    </Container>
  );
};
const Container = styled.div`
  margin-left: auto;
  padding: 0 10px;
`;

export default LoginButton;
