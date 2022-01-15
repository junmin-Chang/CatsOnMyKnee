import React from 'react';
import styled from 'styled-components';

interface Props {
  onChange: any;
}

const EnrollForm = ({ onChange }: Props) => {
  return (
    <Container>
      <Content>
        <Label>이름</Label>
        <Input type="text" placeholder="이름" name="name" onChange={onChange} />
      </Content>
      <Content>
        <Label>나이</Label>
        <Input type="number" placeholder="나이" name="age" onChange={onChange} min={1} max={20} />
      </Content>
      <Content>
        <Label>종</Label>
        <Input placeholder="종" name="breed" onChange={onChange} />
      </Content>
      <Content2>
        <Label>좋아하는 것</Label>
        <Input placeholder="생략 가능" name="favorite" onChange={onChange} />
      </Content2>
      <Content2>
        <Label>싫어하는 것</Label>
        <Input placeholder="생략 가능" name="hate" onChange={onChange} />
      </Content2>
    </Container>
  );
};

export { EnrollForm };

const Container = styled.div`
  display: flex;
  flex-direction: column;
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
