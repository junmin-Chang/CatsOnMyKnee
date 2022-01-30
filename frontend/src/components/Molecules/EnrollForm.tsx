import React, { useCallback, useState } from 'react';
import styled from 'styled-components';
import COText from '@src/components/Atoms/COText';
import COError from '@src/components/Atoms/COError';
import COButton from '@src/components/Atoms/COButton';
import useInput from '@src/hooks/useInput';
import { Cat, CatGender } from '@src/typings/Cat';
import { BsGenderAmbiguous, BsGenderFemale, BsGenderMale } from 'react-icons/bs';
import { enrollCat } from '@src/api/Cat/index';
import { useRecoilState } from 'recoil';
import { modalAtom } from '@src/recoil/atom/modal';
import { catAtom } from '@src/recoil/atom/cat';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const EnrollForm = () => {
  const [cat, setCat] = useRecoilState(catAtom);
  const [name, onChangeName] = useInput('');
  const [age, onChangeAge] = useInput('');
  const [startDate, setStartDate] = useState<Date | null>(new Date());
  const [breed, onChangeBreed] = useInput('');
  const [favorite, onChangeFavorite] = useInput('');
  const [hate, onChangeHate] = useInput('');
  const [gender, _, setGender] = useInput<CatGender>('NO');
  const [error, setError] = useState<string[] | null>(null);
  const [modal, setModal] = useRecoilState(modalAtom);
  const onSubmit = useCallback(() => {
    const newCat: Cat = {
      name,
      age,
      gender,
      favorite,
      hate,
      breed,
      startDate,
    };
    enrollCat(newCat)
      .then(() => {
        setModal({ ...modal, visible: false });
        setCat([...cat, newCat]);
      })
      .catch((err) => {
        setError(err.response.data.message);
      });
  }, [name, age, gender, breed, favorite, hate, modal, setModal, startDate, cat, setCat]);
  return (
    <Container>
      <LeftContent>
        <COText fontWeight={400} fontColor="#18171c" fontSize={20}>
          정보 입력
        </COText>
        <Content>
          <Label>이름</Label>
          <Input type="text" placeholder="이름" name="name" onChange={onChangeName} value={name} />
        </Content>
        <Content>
          <Label>나이</Label>
          <Input type="number" placeholder="나이" name="age" onChange={onChangeAge} min={1} max={20} value={age} />
        </Content>
        <Content>
          <Label>종</Label>
          <Input placeholder="종" name="breed" onChange={onChangeBreed} value={breed} />
        </Content>
        <Content>
          <Label>처음 만난 날</Label>
          <DatePicker
            selected={startDate}
            onChange={(date) => {
              setStartDate(date);
            }}
            dateFormat="yyyy/MM/dd"
          />
        </Content>
        <Content2>
          <Label>좋아하는 것</Label>
          <Input placeholder="생략 가능" name="favorite" onChange={onChangeFavorite} value={favorite} />
        </Content2>
        <Content2>
          <Label>싫어하는 것</Label>
          <Input placeholder="생략 가능" name="hate" onChange={onChangeHate} value={hate} />
        </Content2>
        {error && error.map((err, i) => <COError key={i}>{err}</COError>)}
        <div style={{ marginTop: 'auto', width: '100%' }}>
          <COButton onClick={onSubmit}>등록하기!</COButton>
        </div>
      </LeftContent>
      <RightContent>
        <COText fontColor="18171c" fontSize={20} fontWeight={400}>
          성별
        </COText>
        <IconWrapper onClick={() => setGender('FEMALE')} selected={gender === 'FEMALE'}>
          <BsGenderFemale size={40} />
        </IconWrapper>
        <IconWrapper onClick={() => setGender('MALE')} selected={gender === 'MALE'}>
          <BsGenderMale size={40} />
        </IconWrapper>
        <IconWrapper onClick={() => setGender('NO')} selected={gender === 'NO'}>
          <BsGenderAmbiguous size={40} />
        </IconWrapper>
      </RightContent>
    </Container>
  );
};

export { EnrollForm };

const Container = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100%;
  align-items: center;
  padding: 15px;
  justify-content: center;
`;

const Content = styled.div`
  width: 100%;
  margin-bottom: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
`;

const Content2 = styled.div`
  width: 100%;
  margin-bottom: 15px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Input = styled.input`
  width: 70%;
  height: 30px;
  background-color: #ffffff;
  border: none;
  border-radius: 8px;
  outline: none;
  padding-left: 15px;
`;

const Label = styled.label`
  width: 30%;
  font-size: 16px;
  font-weight: 600;
  color: #18171c;
  white-space: nowrap;
`;

const LeftContent = styled.div`
  display: flex;
  flex-direction: column;
  width: 70%;
  height: 100%;
  background-color: #ffedad;
  border-radius: 15px;
  margin-right: 10px;
  align-items: center;
  padding: 20px;
`;

const RightContent = styled.div`
  display: flex;
  flex-direction: column;
  width: 30%;
  height: 100%;
  background-color: #ffedad;
  border-radius: 15px;
  align-items: center;
  justify-content: space-evenly;
`;

const IconWrapper = styled.div<{ selected: boolean }>`
  background-color: ${({ selected }) => (selected ? '#f28500' : '#ffffff')};
  color: ${({ selected }) => (selected ? '#ffffff' : '#18171c')};
  border-radius: 15px;
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 70px;
  height: 70px;
  cursor: pointer;
  &:hover {
    background-color: #f28500;
    color: #ffffff;
  }
`;
