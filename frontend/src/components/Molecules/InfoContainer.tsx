import { Cat } from '@src/typings/Cat';
import React, { useState, useCallback, useRef } from 'react';
import styled from 'styled-components';
import COText from '../Atoms/COText';
import DropdownCard from '@src/components/Molecules/DropdownCard';
import COButton from '../Atoms/COButton';
import useInput from '@src/hooks/useInput';
import { deleteImage, updateCat, uploadImage } from '@src/api/Cat/index';
import { useNavigate } from 'react-router';
import COError from '../Atoms/COError';
import { ChangeEvent } from 'react';
import COImage from '../Atoms/COImage';

interface Props {
  cat: Cat;
}
const InfoContainer = ({ cat }: Props) => {
  const [edit, setEdit] = useState<boolean>(false);
  const [name, onChangeName] = useInput('');
  const [age, onChangeAge] = useInput('');
  const [breed, onChangeBreed] = useInput('');
  const [favorite, onChangeFavorite] = useInput('');
  const [hate, onChangeHate] = useInput('');
  const [image, setImage] = useState<any>({
    file: '',
    previewUrl: '',
  });
  const [error, setError] = useState<string[] | null>(null);

  const hiddenFileRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
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
    if (edit && hiddenFileRef.current) {
      hiddenFileRef.current.click();
    }
  }, [edit, hiddenFileRef]);
  return (
    <Container>
      <Input type="file" onChange={onChangeFile} style={{ display: 'none' }} ref={hiddenFileRef} />

      <Header>
        {edit ? <Input placeholder={String(cat.name)} onChange={onChangeName} /> : <Name>{cat.name}</Name>}
        <DropdownContainer>
          <DropdownCard handleEdit={setEdit} />
        </DropdownContainer>
      </Header>

      <ImageContainer>
        <COImage src={image.previewUrl || cat.image?.url} onClick={onClickImage} />
      </ImageContainer>

      <TextContainer>
        {edit && (
          <EditContainer>
            {image.file && <button onClick={onSubmit}>변경하기</button>}
            <button
              onClick={() => {
                deleteImage(encodeURIComponent(cat.name!)).then(() => {
                  window.location.reload();
                });
              }}
            >
              사진 삭제
            </button>
            <Label style={{ marginBottom: '15px', color: 'red', whiteSpace: 'nowrap' }}>
              수정할 영역만 수정해주세요
            </Label>
            {error && error.map((err, i) => <COError key={i}>{err}</COError>)}

            <Label>나이</Label>
            <Input type="number" placeholder={cat.age} onChange={onChangeAge} />
            <Label>종</Label>
            <Input placeholder={cat.breed} onChange={onChangeBreed} />
            <Label>좋아하는 것</Label>
            <Input placeholder={cat.favorite} onChange={onChangeFavorite} />
            <Label>싫어하는 것</Label>
            <Input placeholder={cat.hate} onChange={onChangeHate} />
            <COButton
              onClick={() => {
                console.log(typeof age);
                updateCat(encodeURIComponent(cat?.name!), {
                  name: name.trim().length !== 0 ? name : undefined,
                  age: age.trim().length !== 0 ? age : undefined,
                  breed: breed.trim().length !== 0 ? breed : undefined,
                  hate: hate.trim().length !== 0 ? hate : undefined,
                  favorite: favorite.trim().length !== 0 ? favorite : undefined,
                })
                  .then(() => {
                    if (name !== undefined) {
                      navigate(`/cat/${name}`);
                      window.location.reload();
                    } else {
                      navigate(`/cat/${cat.name}`);
                      window.location.reload();
                    }
                  })
                  .catch((err) => {
                    setError(err.response.data.message);
                  });
              }}
            >
              수정하기
            </COButton>
            <COButton onClick={() => setEdit(false)}>취소</COButton>
          </EditContainer>
        )}
        {!edit && (
          <>
            <Content>
              <Label>나이 :</Label>
              <COText fontSize={15} fontColor="#18171c">
                {cat.age}살
              </COText>
            </Content>
            <Content>
              <Label>종 : </Label>

              <COText fontSize={15} fontColor="#18171c">
                {cat.breed}
              </COText>
            </Content>
            <Content>
              <Label>좋아하는 것 : </Label>

              <COText fontSize={15} fontColor="#18171c">
                {cat.favorite}
              </COText>
            </Content>

            <Content>
              <Label>싫어하는 것 : </Label>

              <COText fontSize={15} fontColor="#18171c">
                {cat.hate}
              </COText>
            </Content>
          </>
        )}
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
`;
