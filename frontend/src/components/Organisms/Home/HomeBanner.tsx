import React from 'react';
import styled from 'styled-components';
import Banner from '@src/assets/banner.svg';
import COText from '@src/components/Atoms/COText';
import COLabel from '@src/components/Atoms/COLabel';
const HomeBanner = () => {
  return (
    <Container>
      <Content>
        <COText fontColor="#000" fontSize={25} fontWeight={500}>
          '고양이' 와의 소중한 기억을 담는 곳
        </COText>

        <COLabel>내 무릎 위 고양이 입니다.</COLabel>
        <COText fontColor="#000" fontSize={20} fontWeight={300}>
          '내 무릎 위 고양이' 는 우리와 함께 살아가고 있는 아이들의 하루하루를 담는 집사들의 일기장 서비스 입니다.
        </COText>
      </Content>
      <BannerIcon />
    </Container>
  );
};

export default HomeBanner;

const Container = styled.div`
  display: flex;
  flex-direction: row;
  background-color: #f3b184;
  width: 100%;
  height: 650px;
  padding: 3%;
  box-shadow: rgba(0, 0, 0, 0.35) 0px -50px 36px -28px inset;
  @media (max-width: 500px) {
    flex-direction: column;
  }
`;

const BannerIcon = styled(Banner)`
  width: 500px;
  height: 600px;
  margin-left: auto;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  width: 50%;
  height: 100%;
  @media (max-width: 500px) {
    width: 100%;
  }

  & > * {
    user-select: none;
    margin-bottom: 15px;
    text-align: left;
  }
`;
