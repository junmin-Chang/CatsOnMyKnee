import { createDiary } from '@src/api/api';
import useInput from '@src/hooks/useInput';
import React, { useCallback } from 'react';
import { useNavigate } from 'react-router';
import styled from 'styled-components';
import COButton from '@src/components/Atoms/COButton';
interface Props {
  name: string;
}
const DiaryForm = ({ name }: Props) => {
  const [title, onChangeTitle] = useInput('');
  const [description, onChangeDescription] = useInput('');
  const [feeling, onChangeFeeling] = useInput('');
  const [date, onChangeDate] = useInput('');

  const navigate = useNavigate();
  const onSubmit = useCallback(async () => {
    await createDiary(encodeURIComponent(name), {
      title,
      description,
      date,
      feeling,
    }).then((res: any) => {
      if (res) {
        alert('등록 완료!');
        navigate(`/cat/${name}`);
      }
    });
  }, [name, navigate, date, title, description, feeling]);
  return (
    <Container>
      <h2>오늘 {name}의 하루는 어땠나요?</h2>
      <Form>
        <Label>
          <span>제목</span>
          <Input type="text" name="title" value={title} onChange={onChangeTitle} />
        </Label>
        <Label>
          <span>날짜</span>
          <Input type="date" name="date" value={date} onChange={onChangeDate} />
        </Label>
        <Label>
          <span>{name}의 기분은 어땠나요?</span>
          <Input type="text" name="feeling" value={feeling} onChange={onChangeFeeling} />
        </Label>
        <Label>
          <span>일기장</span>
          <Input type="text" name="description" value={description} onChange={onChangeDescription} />
        </Label>
      </Form>
      <COButton onClick={onSubmit}>등록!</COButton>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

const Label = styled.label`
  margin-bottom: 15px;

  & > span {
    display: block;
    text-align: left;
    padding-bottom: 8px;
    font-size: 15px;
    cursor: pointer;
    line-height: 1.46666667;
    font-weight: 700;
  }
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
  height: 44px;
  padding-top: 11px;
  padding-bottom: 13px;
  font-size: 18px;
  line-height: 1.33333333;

  &:focus {
    --saf-0: rgba(var(--sk_highlight, 18, 100, 163), 1);
    box-shadow: 0 0 0 1px var(--saf-0), 0 0 0 5px rgba(29, 155, 209, 0.3);
  }
`;

export default DiaryForm;
