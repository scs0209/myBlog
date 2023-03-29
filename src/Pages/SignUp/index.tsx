import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import fetcher from "../../utils/fetcher";
import useInput from "../../utils/useInput";
import useSWR from 'swr';
import { Button, Error, Input, Label, LabelDiv, LinkWrapper, Name, SignUpForm, SignUpWrapper, Success } from "./styles";

const backUrl =
  process.env.NODE_ENV === "development"
    ? "http://localhost:5000"
    : "https://port-0-server-p8xrq2mlfsc6kg2.sel3.cloudtype.app";
const SignUp = () => {
  const { data, error, mutate } = useSWR(`${backUrl}/api/users`, fetcher);
  const [email, onChangeEmail] = useInput('');
  const [name, onChangeName] = useInput('');
  const [password, setPassword] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');
  const [mismatchError, setMismatchError] = useState(false);
  const [signUpError, setSignUpError] = useState('');
  const [signUpSuccess, setSignUpSuccess] = useState(false);

  const onChangePassword = useCallback((e: any) => {
    setPassword(e.target.value);
    setMismatchError(e.target.value !== passwordCheck);
  }, [passwordCheck]);

  const onChangePasswordCheck = useCallback((e: any) => {
    setPasswordCheck(e.target.value);
    setMismatchError(e.target.value !== password);
  }, [password]);

  const onSubmit = useCallback((e: any) => {
    e.preventDefault();
    if(!mismatchError && name){
      setSignUpError('');
      setSignUpSuccess(false);
      axios.post(`${backUrl}/api/users`, {
        email, name, password
      },{
        withCredentials: true,
      })
      .then((response) => {
        console.log(response);
        setSignUpSuccess(true);
      })
      .catch((error)=> {
        if(error.response.status === 409){
          alert(error.response.data.message);
          console.log(error);
        } else {
          setSignUpError(error.response.data);
          console.log(error.response);
        }
      })
      .finally(() => {});
    }
  }, [email, password, name, passwordCheck, mismatchError]);

    if (data === undefined) {
      return <div>로딩중...</div>;
    }

  if (data) {
    return <Navigate to="/main/posts" />
  }

  return (
    <SignUpWrapper>
      <SignUpForm onSubmit={onSubmit}>
      <h2>회원가입</h2>
        <Label htmlFor="email">
          <LabelDiv>
            <Name>Email</Name>
            <Input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={onChangeEmail}
            />
          </LabelDiv>
        </Label>
        <Label htmlFor="name">
          <LabelDiv>
            <Name>Name</Name>
            <Input
              type="text"
              id="name"
              name="name"
              value={name}
              onChange={onChangeName}
            />
          </LabelDiv>
        </Label>
        <Label htmlFor="password">
          <LabelDiv>
            <Name>PW</Name>
            <Input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={onChangePassword}
            />
          </LabelDiv>
        </Label>
        <Label htmlFor="password-check">
          <LabelDiv>
          <Name>PW Check</Name>
            <Input
              type="password"
              id="password"
              name="password"
              value={passwordCheck}
              onChange={onChangePasswordCheck}
            />
          </LabelDiv>
          {mismatchError && <Error>비밀번호가 일치하지 않습니다!</Error>}
          {!name && <Error>이름을 입력해주세요!</Error>}
          {signUpError && <Error>{signUpError}</Error>}
          {signUpSuccess && <Success>회원가입이 완료됐습니다. 로그인해주세요.</Success>}
        </Label>
        <Button type="submit">회원가입</Button>
      </SignUpForm>
      <LinkWrapper>
        이미 회원이신가요?&nbsp;
        <Link to="/main/login">로그인 하러가기</Link>
      </LinkWrapper>
    </SignUpWrapper>
  );
}

export default SignUp;