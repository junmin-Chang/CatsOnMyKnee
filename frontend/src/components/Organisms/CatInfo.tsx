import React, { useEffect, useState } from 'react';
import { useParams, Outlet } from 'react-router';
import { Suspense } from 'react';
import styled from 'styled-components';
import { getCatInfo } from '@src/api/Cat/index';
import { Cat } from '@src/typings/Cat';
import InfoContainer from '@src/components/Molecules/InfoContainer';
import DiaryContainer from '../Molecules/DiaryContainer';
const CatInfo = () => {
  const { name } = useParams();
  const [cat, setCat] = useState<Cat>({});
  useEffect(() => {
    const getCat = async () => {
      const res = await getCatInfo(encodeURIComponent(name!));
      setCat(res.data);
    };

    getCat();
  }, [name]);
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Container>
        <InfoContainer cat={cat} />
        <DiaryContainer cat={cat} />
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
`;
