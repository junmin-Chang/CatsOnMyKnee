import React from 'react';
import styled from 'styled-components';
import { AiOutlineClose } from 'react-icons/ai';
const CatModal = () => {
  return (
    <Container>
      <Header>
        <CloseIcon />
      </Header>
    </Container>
  );
};
export default CatModal;

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
