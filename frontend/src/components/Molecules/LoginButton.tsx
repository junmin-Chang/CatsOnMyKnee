import { modalAtom } from '@src/recoil/atom/modal';
import React from 'react';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';

const LoginButton = () => {
  const [modal, setModal] = useRecoilState(modalAtom);
  return (
    <Button onClick={() => setModal({ ...modal, id: 'login', visible: true, size: { width: 600, height: 440 } })}>
      로그인
    </Button>
  );
};

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
export default LoginButton;
