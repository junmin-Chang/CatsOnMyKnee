import React, { useCallback } from 'react';
import styled from 'styled-components';
import { AiOutlineClose } from 'react-icons/ai';
import GoogleButton from '@src/components/Molecules/GoogleButton';
import KakaoButton from '@src/components/Molecules/KakaoButton';
interface Props {
  onClose: () => void;
}
const LoginModal = ({ onClose }: Props) => {
  const onClickKakao = useCallback(() => {
    window.open('http://localhost:8000/auth/kakao', '_self');
  }, []);
  const onClickGoogle = useCallback(() => {
    window.open('http://localhost:8000/auth/google', '_self');
  }, []);
  return (
    <Container>
      <Header>
        <CloseIcon onClick={onClose} />
      </Header>
      <Content>
        <Title>소셜로 간편하게 로그인하세요!</Title>
        <ButtonWrapper>
          <GoogleButton onClick={onClickGoogle} />
          <KakaoButton onClick={onClickKakao} />
        </ButtonWrapper>
      </Content>
    </Container>
  );
};

export default LoginModal;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const Header = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 80px;
  align-items: center;
  border-bottom: 1px solid #eeeeee;
`;

const CloseIcon = styled(AiOutlineClose)`
  margin-left: auto;
  width: 30px;
  height: 30px;
  margin-right: 20px;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
  padding: 25px;
`;

const Title = styled.span`
  font-size: 30px;
  font-weight: 600;
  color: #18171c;
`;

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 70%;
`;
