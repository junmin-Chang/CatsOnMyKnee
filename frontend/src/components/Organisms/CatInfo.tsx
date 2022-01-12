import React, { useEffect, useState } from 'react';
import { useParams, Outlet } from 'react-router';
import { Suspense } from 'react';
import styled from 'styled-components';
import { getCatInfo } from '@src/api/api';
import COText from '../Atoms/COText';
import { Link } from 'react-router-dom';
import { Cat } from '@src/typings/Cat';
import Notebook from '@src/assets/notebook.svg';
const CatInfo = () => {
  const { name } = useParams();
  const [cat, setCat] = useState<Cat>({
    name: '',
    age: '',
    breed: '',
    gender: 'NO',
    favorite: '',
    hate: '',
    diary: null,
  });
  useEffect(() => {
    const getCat = async () => {
      const cat = await getCatInfo(encodeURIComponent(name!));
      setCat(cat);
    };

    getCat();
  }, [name]);
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Container>
        <InfoContainer>
          <p>
            <Name>{cat.name}</Name>
          </p>
          <COText fontSize={20} fontColor="#18171c">
            {cat.age}살
          </COText>
          <COText fontSize={20} fontColor="#18171c">
            {cat.breed}
          </COText>
        </InfoContainer>

        <DiaryContainer>
          <Header>
            <p>
              <Name>{cat.name}의 다이어리</Name>
            </p>
            <Button to={`/cat/${cat.name}/diary`}>글 작성</Button>
          </Header>
          <COText fontColor="#18171c" fontSize={20}>
            총 {cat.diary?.length}개 있네요!
          </COText>
          <Content>
            {cat.diary?.map((d, i) => (
              <Link to={`/cat/${cat.name}/diary/${d.id}`} style={{ marginRight: '15px', textDecoration: 'none' }}>
                <NoteBookIcon />
                <div>
                  <COText fontColor="#18171c" fontSize={15}>
                    {d.date}
                  </COText>
                </div>
              </Link>
            ))}
          </Content>
        </DiaryContainer>
      </Container>
      <Outlet />
    </Suspense>
  );
};

export default CatInfo;

const Container = styled.h1`
  display: flex;
  flex-direction: row;
  padding: 10px;
  width: 80%;
  height: 100%;
  background-color: #ffd078;
  border-radius: 15px;
`;
const InfoContainer = styled.span`
  display: flex;
  flex-direction: column;
  background-color: #ffedad;
  border-radius: 15px;
  width: 30%;
  margin-right: 15px;
  height: 100%;
  padding: 20px;
`;

const DiaryContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #ffedad;
  border-radius: 15px;
  width: 70%;
  height: 100%;
  padding: 20px;
`;

const Name = styled.span`
  display: inline;
  box-shadow: inset 0 -30px 0 #eee71b;
  /*-10px은 highlight의 두께*/

  &::after {
    display: inline;
    box-shadow: inset 0 -30px 0 #eee71b;
    /*-10px은 highlight의 두께*/
  }
`;

const Header = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
`;

const Button = styled(Link)`
  display: flex;
  justify-content: center;
  padding: 0 10px;
  align-items: center;
  background-color: #ffffff;
  border-radius: 8px;
  border: 1px solid #a8a545;
  border: none;
  margin-left: auto;
  cursor: pointer;
  text-decoration: none;
  color: #000000;
  font-size: 15px;
`;

const Content = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100%;
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
