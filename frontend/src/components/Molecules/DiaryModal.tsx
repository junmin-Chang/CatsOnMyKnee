import React, { useCallback } from 'react';
import styled from 'styled-components';
import { AiOutlineClose } from 'react-icons/ai';
import DiaryForm from './DiaryForm';
import { useNavigate, useParams } from 'react-router';

const DiaryModal = () => {
  const { name } = useParams();
  const navigate = useNavigate();
  const goBack = useCallback(() => {
    navigate(-1);
  }, [navigate]);
  const stopPropagation = useCallback((e) => {
    e.stopPropagation();
  }, []);
  return (
    <CreateModal width={600} height={600} onClick={goBack}>
      <div onClick={stopPropagation}>
        <Header>
          <CloseIcon onClick={goBack} />
        </Header>
        <Content>
          <DiaryForm name={name!} />
        </Content>
      </div>
    </CreateModal>
  );
};

export default DiaryModal;

const CreateModal = styled.div<{ width: number; height: number }>`
  display: flex;
  align-items: center;
  position: fixed;
  text-align: center;
  left: 0;
  bottom: 0;
  top: 0;
  right: 0;
  z-index: 1022;
  background-color: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(3px);
  & > div {
    display: flex;
    flex-direction: column;
    opacity: 1 !important;
    margin: 0 auto;
    width: ${({ width }) => width}px;
    height: ${({ height }) => height}px;
    background: white;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.08);
    background-color: #ffffff;
    border-radius: 5px;
    user-select: none;
    z-index: 1012;
  }
`;

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
  cursor: pointer;
`;

const Content = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  height: 100%;
  padding: 25px;
`;