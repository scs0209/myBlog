import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import fetcher from "../../utils/fetcher";
import useInput from "../../utils/useInput";
import useSWR from 'swr';

const SignUp = () => {
  const { data, error, mutate } = useSWR('/api/users', fetcher);
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
      axios.post('/api/users', {
        email, name, password
      },{
        withCredentials: true,
      })
      .then((response) => {
        console.log(response);
        setSignUpSuccess(true);
      })
      .catch((error)=> {
        console.log(error.response);
        setSignUpError(error.response.data);
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
    <div>
      <form onSubmit={onSubmit}>
        <label htmlFor="email">
          <div>
            <span>Email</span>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={onChangeEmail}
            />
          </div>
        </label>
        <label htmlFor="name">
          <div>
            <span>Name</span>
            <input
              type="text"
              id="name"
              name="name"
              value={name}
              onChange={onChangeName}
            />
          </div>
        </label>
        <label htmlFor="password">
          <div>
            <span>Password</span>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={onChangePassword}
            />
          </div>
        </label>
        <label htmlFor="password-check">
          <span>Password Check</span>
          <div>
            <input
              type="password"
              id="password"
              name="password"
              value={passwordCheck}
              onChange={onChangePasswordCheck}
            />
          </div>
          {mismatchError && <div>비밀번호가 일치하지 않습니다!</div>}
          {!name && <div>이름을 입력해주세요!</div>}
          {signUpError && <div>{signUpError}</div>}
          {signUpSuccess && <div>회원가입이 완료됐습니다. 로그인해주세요.</div>}
        </label>
        <button type="submit">회원가입</button>
      </form>
      <div>
        이미 회원이신가요?&nbsp;
        <Link to="/login">로그인 하러가기</Link>
      </div>
    </div>
  );
}

export default SignUp;