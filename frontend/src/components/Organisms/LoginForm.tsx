import React, { useCallback, useState } from 'react';
import styled from 'styled-components';
import COInput from '../Atoms/COInput';
import { GoogleLogin } from 'react-google-login';
const LoginForm = () => {
  const onSuccess = (res: any) => {
    console.log(res.accessToken);
  };
  const onFailure = (err: any) => {
    console.log(err);
  };
  const [form, setForm] = useState({
    userId: '',
    password: '',
  });
  const onChangeInput = useCallback(
    (e) => {
      const { name, value } = e.target;
      setForm({
        ...form,
        [name]: value,
      });
    },
    [form],
  );

  const onClickLogin = useCallback(() => {
    // TODO : POST LOGIN API
  }, []);
  return (
    <Container>
      <InputWrapper>
        <Label>아이디</Label>
        <COInput type="text" name="userId" onChange={onChangeInput} inputHeight={40} inputWidth={400} />
      </InputWrapper>

      <InputWrapper>
        <Label>비밀번호</Label>
        <COInput type="password" name="password" onChange={onChangeInput} inputHeight={40} inputWidth={400} />
      </InputWrapper>
      <button onClick={onClickLogin}>로그인</button>

      <a href="http://localhost:8000/auth/google">구글로 로그인하기</a>
    </Container>
  );
};
export default LoginForm;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
`;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 20px 0;
`;

const Label = styled.label`
  color: '#18171c';
  font-size: 16px;
  font-weight: 500;
`;
