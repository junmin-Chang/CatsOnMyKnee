import React, { useEffect } from 'react';
import { useParams, Outlet } from 'react-router';
import { Suspense } from 'react';
import styled from 'styled-components';
import InfoContainer from '@src/components/Molecules/InfoContainer';
import DiaryContainer from '../Molecules/DiaryContainer';
import { useSetRecoilState } from 'recoil';
import { catNameAtom } from '@src/recoil/atom/cat';
const CatInfo = () => {
  const { name } = useParams();
  const setCatName = useSetRecoilState(catNameAtom);
  useEffect(() => {
    setCatName(name);
  }, [setCatName, name]);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Container>
        <InfoContainer />
        <DiaryContainer />
        <Outlet />
      </Container>
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
  @media (max-width: 1024px) {
    flex-direction: column;
    & > * {
      width: 100%;
      margin-bottom: 1rem;
    }
  }
`;
