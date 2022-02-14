import { Cat } from '@src/typings/Cat';
import React, { useState, useCallback, useRef } from 'react';
import styled from 'styled-components';
import DropdownCard from '@src/components/Molecules/DropdownCard';
import { Button } from '../Atoms/COButton';
import { uploadImage } from '@src/api/Cat/index';
import { ChangeEvent } from 'react';
import COImage from '../Atoms/COImage';
import useTimeDiff from '@src/hooks/useTimeDiff';
import { useRecoilValue } from 'recoil';
import COLabel from '../Atoms/COLabel';
import { catItemState } from '@src/recoil/atom/cat';

interface Props {
  catName: string;
}
const InfoContainer = ({ catName }: Props) => {
  const cat = useRecoilValue(catItemState(catName)) as Cat;
  const [image, setImage] = useState<any>({
    file: '',
    previewUrl: '',
  });
  const diff = useTimeDiff(new Date(cat.startDate!));
  const hiddenFileRef = useRef<HTMLInputElement>(null);
  const onChangeFile = (e: ChangeEvent<any>) => {
    let reader = new FileReader();
    let file = e.target.files[0];
    reader.onloadend = () => {
      setImage({
        file,
        previewUrl: reader.result,
      });
    };
    reader.readAsDataURL(file);
  };
  const onSubmit = useCallback(async () => {
    const formData = new FormData();
    formData.append('file', image.file);
    await uploadImage(encodeURIComponent(cat.name!), formData).then(() => {
      window.location.reload();
    });
  }, [image, cat]);

  const onClickImage = useCallback(() => {
    if (hiddenFileRef.current) {
      hiddenFileRef.current.click();
    }
  }, [hiddenFileRef]);
  return (
    <Container>
      <input type="file" onChange={onChangeFile} style={{ display: 'none' }} ref={hiddenFileRef} />

      <Header>
        <DropdownContainer>
          <DropdownCard />
        </DropdownContainer>
      </Header>

      <ImageContainer>
        <COImage src={image.previewUrl || cat.image?.url} onClick={onClickImage} width="200" height="200" />
        {image.file.length !== 0 && <Button onClick={onSubmit}>이미지 변경</Button>}
      </ImageContainer>

      <TextContainer>
        <Content>
          <Label>{cat.name}와 함께한지...</Label>
          <COLabel>+{diff} Day</COLabel>
        </Content>
        <Content>
          <Label>나이 :</Label>
          <COLabel>{cat.age}살</COLabel>
        </Content>
        <Content>
          <Label>종 : </Label>

          <COLabel>{cat.breed}</COLabel>
        </Content>
        <Content>
          <Label>좋아하는 것 : </Label>
          {cat.favorite?.map((v, i) => (
            <COLabel key={i}>{v.value}</COLabel>
          ))}
        </Content>
        <Content>
          <Label>싫어하는 것 : </Label>
          {cat.hate?.map((v, i) => (
            <COLabel key={i}>{v.value}</COLabel>
          ))}
        </Content>
      </TextContainer>
    </Container>
  );
};

export default InfoContainer;

const Container = styled.span`
  display: flex;
  flex-direction: column;
  background-color: #ffedad;
  border-radius: 15px;
  width: 100%;
  margin-right: 15px;
  height: 100%;
  padding: 20px;
  overflow-y: scroll;
  @media (max-width: 1024px) {
    min-height: 700px;
    margin-bottom: 1rem;
  }
  ::-webkit-scrollbar {
    display: none;
  }
`;

const Header = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
`;

const DropdownContainer = styled.div`
  position: relative;
  margin-left: auto;
`;

const ImageContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 200px;
  align-items: center;
  justify-content: center;
`;

const TextContainer = styled.div`
  border-radius: 15px;
  width: 100%;
  height: 300px;
  display: flex;
  flex-direction: column;
  padding: 10px;
  justify-content: space-evenly;
  margin: auto 0;
`;

const Label = styled.label`
  font-size: 16px;
  color: #18171c;
  font-weight: normal;
  width: 40%;
`;

const Content = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  align-items: center;
  padding: 2% 0;
`;
