import React, { useCallback, useState } from 'react';
import styled from 'styled-components';
import { AiOutlineClose } from 'react-icons/ai';
import { EnrollForm } from '@src/components/Molecules/EnrollForm';
import COText from '@src/components/Atoms/COText';
import COButton from '@src/components/Atoms/COButton';
import { enrollCat } from '@src/api/api';
import { Cat } from '@src/typings/Cat';
import { BsGenderFemale, BsGenderMale, BsGenderAmbiguous } from 'react-icons/bs';
import { useRecoilState } from 'recoil';
import { modalAtom, userAtom } from '@src/recoil/atom';

interface Props {
  onClose: () => void;
}
const EnrollModal = ({ onClose }: Props) => {
  const [cat, setCat] = useState<Cat>({
    name: '',
    gender: 'NO',
    breed: '',
    age: '',
    favorite: '',
    hate: '',
  });
  const [user, setUser] = useRecoilState(userAtom);
  const [modal, setModal] = useRecoilState(modalAtom);
  const onChange = useCallback(
    (e) => {
      const { name, value } = e.target;
      setCat({
        ...cat,
        [name]: value,
      });
    },
    [cat],
  );
  const onSubmit = useCallback(() => {
    setUser({
      ...user!,
      cat: [...user?.cat!, cat],
    });
    enrollCat(cat).then(() => {
      setModal({ ...modal, visible: false });
    });
  }, [cat, setUser, user, setModal, modal]);
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
          <COButton onClick={onSubmit}>등록하기!</COButton>
        </LeftContent>
        <RightContent>
          <COText fontColor="18171c" fontSize={20} fontWeight={400}>
            성별
          </COText>
          <IconWrapper onClick={() => setCat({ ...cat, gender: 'FEMALE' })} selected={cat.gender === 'FEMALE'}>
            <BsGenderFemale size={40} />
          </IconWrapper>
          <IconWrapper onClick={() => setCat({ ...cat, gender: 'MALE' })} selected={cat.gender === 'MALE'}>
            <BsGenderMale size={40} />
          </IconWrapper>
          <IconWrapper onClick={() => setCat({ ...cat, gender: 'NO' })} selected={cat.gender === 'NO'}>
            <BsGenderAmbiguous size={40} />
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
