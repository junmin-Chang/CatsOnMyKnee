import React, { useCallback, useState } from 'react';
import styled from 'styled-components';
import COText from '@src/components/Atoms/COText';
import COError from '@src/components/Atoms/COError';
import COButton from '@src/components/Atoms/COButton';
import useInput from '@src/hooks/useInput';
import { BsGenderAmbiguous, BsGenderFemale, BsGenderMale } from 'react-icons/bs';
import { enrollCat, updateCat } from '@src/api/Cat/index';
import { useRecoilRefresher_UNSTABLE, useRecoilState, useRecoilValue } from 'recoil';
import { modalAtom } from '@src/recoil/atom/modal';
import { catAtom, catItemState, catNameAtom } from '@src/recoil/atom/cat';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useNavigate } from 'react-router';
import Creatable from '../Organisms/Creatable';

const EnrollForm = () => {
  const [modal, setModal] = useRecoilState(modalAtom);

  const catName = useRecoilValue(catNameAtom);
  const cat = useRecoilValue(catItemState(catName));
  const refresh = useRecoilRefresher_UNSTABLE(catAtom);
  const [name, onChangeName] = useInput(modal.edit && cat ? cat.name : '');
  const [age, onChangeAge] = useInput(modal.edit && cat ? cat.age : '');
  const [startDate, setStartDate] = useState<Date>(modal.edit && cat ? new Date(cat.startDate!) : new Date());
  const [breed, onChangeBreed] = useInput(modal.edit && cat ? cat.breed : '');
  const [hate, setHate] = useState(modal.edit && cat ? cat.hate : []);
  const [favorite, setFavorite] = useState(modal.edit && cat ? cat.favorite : []);
  const [gender, _, setGender] = useInput(modal.edit && cat ? cat.gender : 'NO');
  const [error, setError] = useState<string[] | null>(null);
  const navigate = useNavigate();
  const onSubmit = useCallback(async () => {
    const updated = {
      name: cat?.name === name ? undefined : name,
      age,
      breed,
      favorite: favorite?.map((f) => f.value),
      hate: hate?.map((h) => h.value),
      startDate,
      gender,
    };
    if (modal.edit) {
      try {
        await updateCat(encodeURIComponent(cat?.name!), updated);
        setModal({ ...modal, visible: false, edit: false });
        navigate('/cat');
        refresh();
      } catch (err) {
        console.log(err);
      }
    } else {
      try {
        const newCat = {
          name,
          age,
          gender,
          favorite: favorite?.map((f) => f.value),
          hate: hate?.map((h) => h.value),
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
  }, [name, age, gender, breed, modal, setModal, favorite, hate, startDate, refresh, cat?.name, navigate]);

  return (
    <Container>
      <Row>
        <LeftContent>
          <COText
            fontWeight={400}
            fontColor="#18171c"
            fontSize={20}
            style={{
              marginBottom: '10px',
            }}
          >
            ?????? ??????
          </COText>
          <Content>
            <Label>??????</Label>
            <Input type="text" placeholder="??????" name="name" onChange={onChangeName} defaultValue={name} />
          </Content>
          <Content>
            <Label>??????</Label>
            <Input
              type="number"
              placeholder="??????"
              name="age"
              onChange={onChangeAge}
              min={1}
              max={20}
              defaultValue={age}
            />
          </Content>
          <Content>
            <Label>???</Label>
            <Input placeholder="???" name="breed" onChange={onChangeBreed} defaultValue={breed} />
          </Content>
          <Content>
            <Label>?????? ?????? ???</Label>
            <DatePick
              selected={startDate}
              onChange={(date: Date) => {
                setStartDate(date);
              }}
              dateFormat="yyyy/MM/dd"
            />
          </Content>
          <Content>
            <Label>???????????? ???</Label>
            <Creatable
              onChange={(value) => {
                setFavorite(value);
                console.log(favorite);
              }}
              name="favorite"
              value={favorite}
            />
          </Content>
          <Content>
            <Label>???????????? ???</Label>
            <Creatable
              onChange={(value) => {
                setHate(value);
                console.log(hate);
              }}
              name="hate"
              value={hate}
            />
          </Content>
          {error && error.map((err, i) => <COError key={i}>{err}</COError>)}
        </LeftContent>
        <RightContent>
          <COText fontColor="18171c" fontSize={20} fontWeight={400}>
            ??????
          </COText>
          <IconWrapper onClick={() => setGender('FEMALE')} selected={gender === 'FEMALE'}>
            <BsGenderFemale size={30} />
          </IconWrapper>
          <IconWrapper onClick={() => setGender('MALE')} selected={gender === 'MALE'}>
            <BsGenderMale size={30} />
          </IconWrapper>
          <IconWrapper onClick={() => setGender('NO')} selected={gender === 'NO'}>
            <BsGenderAmbiguous size={30} />
          </IconWrapper>
        </RightContent>
      </Row>
      <div style={{ marginTop: '10px' }}>
        <COButton onClick={onSubmit}>????????????</COButton>
      </div>
    </Container>
  );
};

export default EnrollForm;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding: 15px;
  @media (max-width: 500px) {
    padding: 0;
  }
`;

const Content = styled.div`
  width: 100%;
  margin-bottom: 15px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Input = styled.input`
  width: 70%;
  height: 50px;
  background-color: #ffffff;
  border: none;
  border-radius: 8px;
  outline: none;
  padding-left: 15px;
  @media (max-width: 500px) {
    width: 90%;
  }
`;

const Label = styled.label`
  width: 30%;
  font-size: 16px;
  font-weight: 600;
  color: #18171c;
  white-space: nowrap;
  margin-bottom: 10px;
`;

const LeftContent = styled.div`
  display: flex;
  flex-direction: column;
  width: 70%;
  background-color: #ffedad;
  border-radius: 15px;
  margin-right: 10px;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
  @media (max-width: 500px) {
    width: 100%;
    padding: 0;
    padding-top: 10px;
    margin-bottom: 15px;
  }
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
  @media (max-width: 500px) {
    flex-direction: row;
    width: 100%;
    padding: 5% 0;
  }
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
  @media (max-width: 500px) {
    width: 50px;
    height: 50px;
  }
`;

const DatePick = styled(DatePicker)`
  height: 50px;
  width: 80%;
  font-size: 20px;
  text-align: center;
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100%;
  padding: 15px;
  @media (max-width: 500px) {
    flex-direction: column;
    padding: 0;
  }
`;
