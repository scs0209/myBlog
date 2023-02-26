import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import {Link} from 'react-router-dom';
import useSWR from 'swr';
import useInput from "../../utils/useInput";
import fetcher from "../../utils/fetcher";

const Login = () => {
  const [email, onChangeEmail] = useInput('');
  const [password, onChangePassword] = useInput(''); 



  //Login 버튼 클릭 이벤트
  const onSubmitLogin = useCallback((e: any) => {
    e.preventDefault();
    console.log('click login')
    axios.post(
      '/api/users/login',
      { 
        email, password
      } 
    )
    .then((res) => {
      console.log(res.data);
    })
    .catch();
  }, [])

  //페이지 렌더링 후 가장 처음 호출되는 함수
  useEffect(() => {
    axios.get('/api/users/login')
    .then(res => console.log(res))
    .catch()
    // 페이지 호출 후 처음 한번만 호출 될 수 있도록 [] 추가
  }, []);

  return (
    <div>
      <h2>LogIn</h2>
      <form onSubmit={onSubmitLogin}>
        <div>
          <label htmlFor="input_email">Email: </label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={onChangeEmail}
          />
        </div>
        <div>
          <label htmlFor="input_pw">PW: </label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={onChangePassword}
          />
        </div>
        <div>
          <button type="submit">LogIn</button>
        </div>
      </form>
      <p>
        아직 회원이 아니신가요?&nbsp;
        <Link to="/signup">회원가입 하러가기</Link>
      </p>
    </div>
  );
};

export default Login;