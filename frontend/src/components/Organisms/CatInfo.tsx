import React, { useEffect, useRef } from 'react';
import { useParams, Outlet } from 'react-router';
import { Suspense } from 'react';
import styled from 'styled-components';
import InfoContainer from '@src/components/Molecules/InfoContainer';
import DiaryContainer from '../Molecules/DiaryContainer';
import { useSetRecoilState } from 'recoil';
import { catNameAtom } from '@src/recoil/atom/cat';
import Loading from './Animation/Loading';
const CatInfo = () => {
  const { name } = useParams();

  const setCatName = useSetRecoilState(catNameAtom);
  useEffect(() => {
    setCatName(name!);
  }, [setCatName, name]);

  return (
    <Suspense fallback={<Loading />}>
      <Container>
        <InfoContainer catName={name as string} />
        <DiaryContainer catName={name as string} />
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
  width: 90%;
  height: 100%;
  background-color: #ffd078;
  border-radius: 15px;
  @media (max-width: 1024px) {
    flex-direction: column;
    width: 95%;
  }
`;
