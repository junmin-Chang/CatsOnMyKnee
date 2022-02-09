import { Cat } from '@src/typings/Cat';
import React, { useState, useCallback, useRef } from 'react';
import styled from 'styled-components';
import DropdownCard from '@src/components/Molecules/DropdownCard';
import COButton from '../Atoms/COButton';
import useInput from '@src/hooks/useInput';
import { deleteImage, updateCat, uploadImage } from '@src/api/Cat/index';
import { useNavigate } from 'react-router';
import COError from '../Atoms/COError';
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
      <Input type="file" onChange={onChangeFile} style={{ display: 'none' }} ref={hiddenFileRef} />

      <Header>
        <DropdownContainer>
          <DropdownCard />
        </DropdownContainer>
      </Header>

      <ImageContainer>
        <COImage src={image.previewUrl || cat.image?.url} onClick={onClickImage} />
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

          <COLabel>{cat.favorite}</COLabel>
        </Content>
        <Content>
          <Label>싫어하는 것 : </Label>

          <COLabel>{cat.hate}</COLabel>
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
  width: 40%;
  margin-right: 15px;
  height: 100%;
  padding: 20px;
  overflow-y: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
`;

const Name = styled.span`
  display: inline;
  box-shadow: inset 0 -30px 0 #eee71b;
  /*-10px은 highlight의 두께*/

  &::after {
    display: inline;
    box-shadow: inset 0 -30px 0 #eee71b;
    /*-10px은 highlight의 두께*/
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
`;

const Input = styled.input`
  border-radius: 4px;
  --saf-0: rgba(var(--sk_foreground_high_solid, 134, 134, 134), 1);
  border: 1px solid var(--saf-0);
  transition: border 80ms ease-out, box-shadow 80ms ease-out;
  box-sizing: border-box;
  margin: 0 0 20px;
  width: 100%;
  color: rgba(var(--sk_primary_foreground, 29, 28, 29), 1);
  background-color: rgba(var(--sk_primary_background, 255, 255, 255), 1);
  padding: 12px;
  height: 30px;
  padding-top: 11px;
  padding-bottom: 13px;
  font-size: 18px;
  line-height: 1.33333333;

  &:focus {
    --saf-0: rgba(var(--sk_highlight, 18, 100, 163), 1);
    box-shadow: 0 0 0 1px var(--saf-0), 0 0 0 5px rgba(29, 155, 209, 0.3);
  }
`;

const EditContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
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
