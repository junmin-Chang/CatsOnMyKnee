import React from 'react';
import styled from 'styled-components';
import COText from '@src/components/Atoms/COText';
import { Link } from 'react-router-dom';
import { useRecoilState, useRecoilValue } from 'recoil';
import { filteredDiaries } from '@src/recoil/selector/diary';
import SelectInput from '../Organisms/SelectInput';
import { filterOptions } from '@src/data/SelectData';
import { diaryFilterAtom } from '@src/recoil/atom/diary';
import { Diary } from '@src/typings/Diary';
import { catItemState } from '@src/recoil/atom/cat';
import { Cat } from '@src/typings/Cat';
import DiaryContent from './DiaryContent';

interface Props {
  catName: string;
}
const DiaryContainer = ({ catName }: Props) => {
  const cat = useRecoilValue(catItemState(catName)) as Cat;
  const diaries = useRecoilValue(filteredDiaries) as Diary[];
  const [filter, setFilter] = useRecoilState(diaryFilterAtom);

  return (
    <Container>
      <Header>
        <p>
          <Name>{cat.name}의 일기장</Name>
        </p>
        <div>
          <SelectInput
            options={filterOptions}
            onChange={({ value }) => setFilter(value)}
            value={{
              value: filter,
              label: filter,
            }}
            placeholder="정렬"
          />
          <Button to={`/cat/${cat.name}/diary`}>글 작성</Button>
        </div>
      </Header>
      <COText fontColor="#18171c" fontSize={20}>
        총 {diaries?.length}개 있네요!
      </COText>
      <Content>{diaries && diaries.map((d, i) => <DiaryContent diary={d} key={i} />)}</Content>
    </Container>
  );
};

export default DiaryContainer;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #ffedad;
  border-radius: 15px;
  width: 100%;
  padding: 20px;
`;

const Button = styled(Link)`
  padding: 0 10px;
  background-color: #ffffff;
  border-radius: 8px;
  border: 1px solid #a8a545;
  border: none;
  margin-left: auto;
  cursor: pointer;
  text-decoration: none;
  padding: 10px 12px;
  color: #000000;
  font-size: 15px;
`;

const Content = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  padding: 20px;
`;

const Name = styled.span`
  display: inline;
  box-shadow: inset 0 -30px 0 #eee71b;
  font-size: 1.5rem;

  &::after {
    display: inline;
    box-shadow: inset 0 -30px 0 #eee71b;
  }
`;

const Header = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  align-items: center;

  & > div {
    display: flex;
    flex-direction: row;
    margin-left: auto;
    & > * {
      margin-left: 1.5em;
    }
  }
`;
