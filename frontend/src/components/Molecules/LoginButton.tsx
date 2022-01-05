import { modalAtom } from '@src/recoil/atom';
import React from 'react';
import { useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import COText from '../Atoms/COText';

const LoginButton = () => {
  const setModal = useSetRecoilState(modalAtom);
  return (
    <Container onClick={() => setModal({ id: 'login', visible: true })}>
      <COText fontColor="#18171c" fontSize={20}>
        로그인
      </COText>
    </Container>
  );
};
const Container = styled.div`
  margin-left: auto;
  padding: 8px 22px;
  background-color: #ffffff;
  border-radius: 8px;
  cursor: pointer;
  margin-right: 20px;
`;

export default LoginButton;
