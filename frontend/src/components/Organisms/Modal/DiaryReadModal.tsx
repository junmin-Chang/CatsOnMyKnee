import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router';
import { useNavigate } from 'react-router';
import { Diary } from '@src/typings/Diary';
import { getDiary } from '@src/api/api';
import COTextArea from '../../Atoms/COTextArea';
import { CloseIcon, CreateModal, Header } from '@src/components/Organisms/Modal/styles';
const DiaryReadModal = () => {
  const { name, id } = useParams();
  const [diary, setDiary] = useState<Diary>({
    title: '',
    description: '',
    feeling: '기분 좋음',
    date: '',
  });
  const navigate = useNavigate();
  const goBack = useCallback(() => {
    navigate(-1);
  }, [navigate]);
  const stopPropagation = useCallback((e) => {
    e.stopPropagation();
  }, []);

  useEffect(() => {
    const get = async () => {
      const result = await getDiary(encodeURIComponent(name!), id!);
      setDiary(result);
    };

    get();
  }, [name, id]);
  return (
    <CreateModal width={700} height={700} onClick={goBack}>
      <div onClick={stopPropagation}>
        <Header>
          <CloseIcon onClick={goBack} />
        </Header>
        <Content>
          <Title>{diary.title}</Title>
          <Date>{diary.date}</Date>
          <Feeling>
            이 날 {name}의 기분 : <mark>{diary.feeling}</mark>
          </Feeling>
          <COTextArea disabled defaultValue={diary.description} />
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
