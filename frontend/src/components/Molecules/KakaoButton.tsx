import React from 'react';
import styled from 'styled-components';
import { RiKakaoTalkFill } from 'react-icons/ri';
import COText from '../Atoms/COText';
interface Props {
  onClick: () => void;
}
const KakaoButton = ({ onClick }: Props) => {
  return (
    <Button onClick={onClick}>
      <Icon size={30} />
      <COText fontColor="#191919" fontSize={20}>
        카카오로 로그인
      </COText>
    </Button>
  );
};

export default KakaoButton;

const Icon = styled(RiKakaoTalkFill)`
  margin-right: 20px;
`;
const Button = styled.button`
  display: inline-flex;
  width: 383px;
  height: 68px;
  background-color: #fee500;
  border-radius: 6px;
  text-decoration: none;
  font-size: 20px;
  margin-top: 44px;
  align-items: center;
  justify-content: center;
  border: none;

  &:hover {
    cursor: pointer;
    opacity: 0.8;
  }
`;
