import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router';
import { useNavigate } from 'react-router';
import { Diary } from '@src/typings/Diary';
import { deleteDiary, getDiary } from '@src/api/Diary/index';
import COTextArea from '../../Atoms/COTextArea';
import { CloseIcon, CreateModal, Header } from '@src/components/Organisms/Modal/styles';
import COButton from '@src/components/Atoms/COButton';
import { useRecoilRefresher_UNSTABLE, useRecoilState } from 'recoil';
import { diaryAtom, diaryItemState } from '@src/recoil/atom/diary';
const DiaryReadModal = () => {
  const { name, id } = useParams();
  const [diary, setDiary] = useRecoilState(diaryItemState(id as string));
  const refresh = useRecoilRefresher_UNSTABLE(diaryAtom);
  const navigate = useNavigate();
  const goBack = useCallback(() => {
    navigate(-1);
  }, [navigate]);
  const stopPropagation = useCallback((e) => {
    e.stopPropagation();
  }, []);
  const onDelete = useCallback(async () => {
    try {
      await deleteDiary(name!, id!);
      goBack();
      refresh();
    } catch (err) {
      console.log(err);
    }
  }, [goBack, id, name, refresh]);

  return (
    <CreateModal width={700} height={700} onClick={goBack}>
      <div onClick={stopPropagation}>
        <Header>
          <CloseIcon onClick={goBack} />
        </Header>
        <Content>
          <Title>{diary?.title}</Title>
          <Date>{diary?.date}</Date>
          <Feeling>
            이 날 {name}의 기분 : <mark>{diary?.feeling}</mark>
          </Feeling>
          <COTextArea disabled defaultValue={diary?.description} />
          <COButton onClick={onDelete}>삭제하기</COButton>
        </Content>
      </div>
    </CreateModal>
  );
};

export default DiaryReadModal;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding: 25px;
  text-align: left;
`;

const Title = styled.span`
  font-size: 30px;
  font-weight: normal;
  margin-bottom: 10px;
`;

const Date = styled.p`
  color: #b1b1b1;
  font-size: 15px;
  font-weight: normal;
  margin-bottom: 10px;
`;

const Feeling = styled.p`
  color: #18171c;
  font-size: 16px;
  font-weight: normal;
  margin-bottom: 10px;
`;
