import React, { useCallback, useState } from 'react';
import styled from 'styled-components';
import COText from '@src/components/Atoms/COText';
import COError from '@src/components/Atoms/COError';
import COButton from '@src/components/Atoms/COButton';
import useInput from '@src/hooks/useInput';
import { Cat, CatGender } from '@src/typings/Cat';
import { BsGenderAmbiguous, BsGenderFemale, BsGenderMale } from 'react-icons/bs';
import { enrollCat, updateCat } from '@src/api/Cat/index';
import { useRecoilRefresher_UNSTABLE, useRecoilState, useRecoilValue } from 'recoil';
import { modalAtom } from '@src/recoil/atom/modal';
import { catAtom, catItemState, catNameAtom } from '@src/recoil/atom/cat';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useNavigate } from 'react-router';

const EnrollForm = () => {
  const [modal, setModal] = useRecoilState(modalAtom);

  const catName = useRecoilValue(catNameAtom);
  const cat = useRecoilValue(catItemState(catName!)) as Cat;
  const refresh = useRecoilRefresher_UNSTABLE(catAtom);
  const [name, onChangeName] = useInput(modal.edit ? cat?.name : '');
  const [age, onChangeAge] = useInput(modal.edit ? cat?.age : '');
  const [startDate, setStartDate] = useState<Date | null>(new Date());
  const [breed, onChangeBreed] = useInput(modal.edit ? cat?.breed : '');
  const [favorite, onChangeFavorite] = useInput(modal.edit ? cat?.favorite : '');
  const [hate, onChangeHate] = useInput(modal.edit ? cat?.hate : '');
  const [gender, _, setGender] = useInput<CatGender>(modal.edit ? cat.gender : 'NO');
  const [error, setError] = useState<string[] | null>(null);
  const navigate = useNavigate();
  const onSubmit = useCallback(async () => {
    const updated = {
      name: cat.name === name ? undefined : name,
      age,
      breed,
      hate,
      favorite,
      startDate,
      gender,
    };
    if (modal.edit) {
      try {
        await updateCat(encodeURIComponent(cat.name!), updated);
        setModal({ ...modal, visible: false, edit: false });
        navigate('/cat');
        refresh();
      } catch (err) {
        console.log(err);
      }
    } else {
      try {
        const newCat: Cat = {
          name,
          age,
          gender,
          favorite,
          hate,
          breed,
          startDate,
        };
        await enrollCat(newCat);
        setModal({ ...modal, visible: false });
        refresh();
      } catch (err) {
        console.log(err);
      }
    }
  }, [name, age, gender, breed, favorite, hate, modal, setModal, startDate, refresh]);
  return (
    <Container>
      <LeftContent>
        <COText fontWeight={400} fontColor="#18171c" fontSize={20}>
          정보 입력
        </COText>
        <Content>
          <Label>이름</Label>
          <Input type="text" placeholder="이름" name="name" onChange={onChangeName} defaultValue={name} />
        </Content>
        <Content>
          <Label>나이</Label>
          <Input
            type="number"
            placeholder="나이"
            name="age"
            onChange={onChangeAge}
            min={1}
            max={20}
            defaultValue={age}
          />
        </Content>
        <Content>
          <Label>종</Label>
          <Input placeholder="종" name="breed" onChange={onChangeBreed} defaultValue={breed} />
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
          <Input placeholder="생략 가능" name="favorite" onChange={onChangeFavorite} defaultValue={favorite} />
        </Content2>
        <Content2>
          <Label>싫어하는 것</Label>
          <Input placeholder="생략 가능" name="hate" onChange={onChangeHate} defaultValue={hate} />
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
