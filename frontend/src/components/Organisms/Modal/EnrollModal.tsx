import React from 'react';
import styled from 'styled-components';
import { AiOutlineClose } from 'react-icons/ai';
import EnrollForm from '@src/components/Molecules/EnrollForm';

interface Props {
  onClose: () => void;
}
const EnrollModal = ({ onClose }: Props) => {
  return (
    <Container>
      <Header>
        <CloseIcon onClick={onClose} />
      </Header>
      <Content>
        <EnrollForm />
      </Content>
    </Container>
  );
};

export default EnrollModal;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
  overflow-y: scroll;
`;

const Header = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 80px;
  min-height: 80px;
  align-items: center;
  border-bottom: 1px solid #eeeeee;
`;

const CloseIcon = styled(AiOutlineClose)`
  margin-left: auto;
  width: 30px;
  height: 30px;
  margin-right: 20px;
  cursor: pointer;
`;

const Content = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  padding: 25px;
  @media (max-width: 500px) {
    padding: 3%;
  }
`;
