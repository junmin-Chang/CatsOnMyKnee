import React, { useCallback, useState } from 'react';
import styled from 'styled-components';
import { AiOutlineClose } from 'react-icons/ai';
import { EnrollForm } from '@src/components/Molecules/EnrollForm';
import { BsGenderFemale, BsGenderMale, BsGenderAmbiguous } from 'react-icons/bs';
import COText from '@src/components/Atoms/COText';

import { enrollCat } from '@src/api/api';

interface Props {
  onClose: () => void;
}
const EnrollModal = ({ onClose }: Props) => {
  const [info, setInfo] = useState({
    name: '',
    gender: '',
    breed: '',
    age: '',
    favorite: '',
    hate: '',
  });
  const onChange = useCallback(
    (e) => {
      const { name, value } = e.target;
      setInfo({
        ...info,
        [name]: value,
      });
      console.log(info);
    },
    [info],
  );
  const onSubmit = useCallback(() => {
    enrollCat(info);
  }, [info]);
  return (
    <Container>
      <Header>
        <CloseIcon onClick={onClose} />
      </Header>
      <Content>
        <LeftContent>
          <COText fontWeight={400} fontColor="#18171c" fontSize={20}>
            정보 입력
          </COText>
          <EnrollForm onChange={onChange} />
          <Button onClick={onSubmit}>등록하기!</Button>
        </LeftContent>
        <RightContent>
          <COText fontColor="18171c" fontSize={20} fontWeight={400}>
            성별
          </COText>
          <IconWrapper onClick={() => setInfo({ ...info, gender: 'FEMALE' })}>
            <BsGenderFemale />
          </IconWrapper>
          <IconWrapper onClick={() => setInfo({ ...info, gender: 'MALE' })}>
            <BsGenderMale />
          </IconWrapper>
          <IconWrapper onClick={() => setInfo({ ...info, gender: 'NO' })}>
            <BsGenderAmbiguous />
          </IconWrapper>
        </RightContent>
      </Content>
    </Container>
  );
};

export default EnrollModal;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const Header = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 80px;
  align-items: center;
  border-bottom: 1px solid #eeeeee;
`;

const CloseIcon = styled(AiOutlineClose)`
  margin-left: auto;
  width: 30px;
  height: 30px;
  margin-right: 20px;
  cursor: pointer;
`;

const Content = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  height: 100%;
  padding: 25px;
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

const IconWrapper = styled.div`
  background-color: #ffffff;
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
  }
`;

const Button = styled.button`
  background-color: #f28500;
  width: 150px;
  height: 60px;
  border: none;
  border-radius: 15px;
  cursor: pointer;
  color: #ffffff;
`;
