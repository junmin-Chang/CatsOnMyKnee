import React from 'react';
import styled from 'styled-components';
import { FcGoogle } from 'react-icons/fc';
import COText from '../Atoms/COText';

interface Props {
  onClick: () => void;
}
const GoogleButton = ({ onClick }: Props) => {
  return (
    <Button onClick={onClick}>
      <Logo size={30} />
      <COText fontColor="#18171c" fontSize={20}>
        Google로 로그인
      </COText>
    </Button>
  );
};

export default GoogleButton;

const Logo = styled(FcGoogle)`
  margin-right: 20px;
`;

const Button = styled.button`
  display: inline-flex;
  width: 383px;
  height: 68px;
  background-color: #ffffff;
  border-radius: 6px;
  text-decoration: none;
  font-size: 20px;
  margin-top: 44px;
  align-items: center;
  justify-content: center;
  border: 1px solid #eeeeee;

  &:hover {
    cursor: pointer;
    opacity: 0.8;
  }
`;
