import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Suspense } from 'react';
import styled from 'styled-components';
import { getCatInfo } from '@src/api/api';

const CatInfo = () => {
  const { name } = useParams();
  const [cat, setCat] = useState({
    name: '',
    age: '',
    breed: '',
    gender: '',
    favorite: '',
    hate: '',
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
          <p>{cat.age}살</p>
          <p>{cat.breed}</p>
        </InfoContainer>

        <DiaryContainer></DiaryContainer>
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
const InfoContainer = styled.span`
  display: flex;
  flex-direction: column;
  background-color: #ffffff;
  border-radius: 15px;
  width: 30%;
  margin-right: 15px;
  height: 100%;
  padding: 10px;
`;

const DiaryContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #ffffff;
  border-radius: 15px;
  width: 70%;
  height: 100%;
`;

const Name = styled.span`
  z-index: 1001;
  position: relative;
  &::before {
    content: '';
    z-index: -1;
    left: -0.5em;
    top: -0.1em;
    border-width: 2px;
    border-style: solid;
    border-color: red;
    position: absolute;
    border-right-color: transparent;
    width: 100%;
    height: 1em;
    transform: rotate(2deg);
    opacity: 0.7;
    border-radius: 50%;
    padding: 0.1em 0.25em;
  }
  &::after {
    content: '';
    z-index: -1;
    left: -0.5em;
    top: 0.1em;
    padding: 0.1em 0.25em;
    border-width: 2px;
    border-style: solid;
    border-color: red;
    border-left-color: transparent;
    border-top-color: transparent;
    position: absolute;
    width: 100%;
    height: 1em;
    transform: rotate(-1deg);
    opacity: 0.7;
    border-radius: 50%;
  }
`;
