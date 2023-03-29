import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import {Link, Navigate} from 'react-router-dom';
import useSWR from 'swr';
import useInput from "../../utils/useInput";
import fetcher from "../../utils/fetcher";
import { Button, Error, Form, Input, InputContainer, Label, Links, LoginContainer, Name, Paragraph } from "./styles";

const backUrl =
  process.env.NODE_ENV === "development"
    ? "http://localhost:5000"
    : "https://port-0-server-p8xrq2mlfsc6kg2.sel3.cloudtype.app";
const Login = () => {
  const { data, error, mutate } = useSWR(`${backUrl}/users`, fetcher);
  const [logInError, setLogInError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [email, onChangeEmail] = useInput('');
  const [password, onChangePassword] = useInput(''); 

  //Login 버튼 클릭 이벤트
  const onSubmitLogin = useCallback((e: any) => {
    e.preventDefault();
    setLogInError(false);
    axios.post(
      `${backUrl}/login`,
      { 
        email, password
      },
      {
        withCredentials: true,
      }
    )
    .then((res) => {
      console.log(res.data);
      mutate(res.data, false);
    })
    .catch((err) => {
      console.log(err);
      setLogInError(err.response.status === 401);
      setErrorMsg(err.response.data)
    });
  }, [email, password, mutate]);
  

  if (data === undefined) {
    return <div>로딩중...</div>;
  }

  if(data){
    return <Navigate to="/main/posts" />
  }

  return (
    <LoginContainer>
      <h2>LogIn</h2>
      <Form onSubmit={onSubmitLogin}>
        <Label htmlFor="input_email">
          <Name>Email: </Name>
          <InputContainer>
            <Input
              type="email"
              name="email"
              value={email}
              onChange={onChangeEmail}
            />
          </InputContainer>
        </Label>
        <Label htmlFor="input_pw">
          <Name>PW: </Name>
          <InputContainer>
            <Input
              type="password"
              name="password"
              value={password}
              onChange={onChangePassword}
            />
          {logInError && <Error>{errorMsg}</Error>}
          </InputContainer>
        </Label>
        <div>
          <Button type="submit">LogIn</Button>
        </div>
      </Form>
      <Paragraph>
        아직 회원이 아니신가요?&nbsp;
        <Link to="/main/signup">회원가입 하러가기</Link>
      </Paragraph>
      <Links>
        <Link to="/main/find-id">email 찾기</Link>
        <Link to="/main/find-password">비밀번호 찾기</Link>
      </Links>
    </LoginContainer>
  );
};

export default Login;