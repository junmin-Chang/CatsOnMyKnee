import React, { useCallback, useEffect } from 'react';
import styled from 'styled-components';
import DiaryForm from '@src/components/Molecules/DiaryForm';
import { useNavigate, useParams } from 'react-router';
import { CloseIcon, CreateModal, Header } from '@src/components/Organisms/Modal/styles';
import { useLocation } from 'react-router';
import { useDisableBodyScroll } from '@src/hooks/useDisableBodyScroll';

const DiaryModal = () => {
  const { name } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const goBack = useCallback(() => {
    navigate(-1);
  }, [navigate]);
  const stopPropagation = useCallback((e) => {
    e.stopPropagation();
  }, []);

  useDisableBodyScroll(location.pathname.split('/')[3] === 'diary');

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

const Content = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  height: 100%;
  padding: 25px;
`;
