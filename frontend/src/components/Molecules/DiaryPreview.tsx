import { diaryItemState } from '@src/recoil/atom/diary';
import React from 'react';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import COText from '../Atoms/COText';

interface Props {
  id: string;
}
const DiaryPreview = ({ id }: Props) => {
  const diary = useRecoilValue(diaryItemState(id));
  return (
    <Container>
      <Content>
        <div>
          <COText fontSize={16} fontColor="#18171c">
            {diary?.title}
          </COText>
        </div>
        <div>
          <COText fontSize={14} fontColor="#B1B1B1">
            {diary?.date}
          </COText>
        </div>
        <div>
          <COText fontSize={14} fontColor="#18171c">
            {diary?.feeling}
          </COText>
        </div>
      </Content>
    </Container>
  );
};

export default DiaryPreview;

const Content = styled.div`
  position: absolute;
  top: 0;
  width: 150px;
  background-color: #fff;
  border-radius: 8px;
  padding: 5%;
`;
const Container = styled.div`
  position: relative;
`;
