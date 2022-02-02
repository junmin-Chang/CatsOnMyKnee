import React from 'react';
import styled from 'styled-components';
import COText from '@src/components/Atoms/COText';
import { Link } from 'react-router-dom';
import Notebook from '@src/assets/notebook.svg';
import { useRecoilState, useRecoilValue } from 'recoil';
import { filteredCat } from '@src/recoil/selector/cat';
import { filteredDiaries } from '@src/recoil/selector/diary';
import SelectInput from '../Organisms/SelectInput';
import { filterOptions } from '@src/data/SelectData';
import { diaryFilterAtom } from '@src/recoil/atom/diary';
const DiaryContainer = () => {
  const cat = useRecoilValue(filteredCat);
  const diaries = useRecoilValue(filteredDiaries);
  const [filter, setFilter] = useRecoilState(diaryFilterAtom);
  return (
    <Container>
      <Header>
        <p>
          <Name>{cat.name}의 다이어리</Name>
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
      <Content>
        {diaries &&
          diaries.map((d, i) => (
            <Link to={`/cat/${cat.name}/diary/${d.id}`} style={{ marginRight: '15px', textDecoration: 'none' }} key={i}>
              <NoteBookIcon />
              <div>
                <COText fontColor="#18171c" fontSize={15}>
                  {d.date}
                </COText>
              </div>
            </Link>
          ))}
      </Content>
    </Container>
  );
};

export default DiaryContainer;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #ffedad;
  border-radius: 15px;
  width: 70%;
  height: 100%;
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
const NoteBookIcon = styled(Notebook)`
  width: 80px;
  height: 80px;
  cursor: pointer;
  &:hover {
    filter: invert(27%) sepia(51%) saturate(2878%) hue-rotate(346deg) brightness(104%) contrast(97%);
  }
`;

const Name = styled.span`
  display: inline;
  box-shadow: inset 0 -30px 0 #eee71b;

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
