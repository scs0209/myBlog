import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import {Link, Navigate} from 'react-router-dom';
import useSWR from 'swr';
import useInput from "../../utils/useInput";
import fetcher from "../../utils/fetcher";

const Login = () => {
  const { data, error, mutate } = useSWR('/api/users', fetcher);
  const [logInError, setLogInError] = useState(false);
  const [email, onChangeEmail] = useInput('');
  const [password, onChangePassword] = useInput(''); 

  //Login 버튼 클릭 이벤트
  const onSubmitLogin = useCallback((e: any) => {
    e.preventDefault();
    setLogInError(false);
    axios.post(
      '/api/login',
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
      setLogInError(err.res?.data?.statusCode === 401);
    });
  }, [email, password, mutate]);

  const onLogout = useCallback(() => {
    axios.post('/api/logout', null, {
      withCredentials: true
    })
    .then(() => {
      mutate(false, false);
    });
  }, [mutate])

  if (data === undefined) {
    return <div>로딩중...</div>;
  }

  if(data){
    return <Navigate to="/main" />
  }



  return (
    <div>
      <h2>LogIn</h2>
      <form onSubmit={onSubmitLogin}>
        <label htmlFor="input_email">
          <span>Email: </span>
          <div>
            <input
              type="email"
              name="email"
              value={email}
              onChange={onChangeEmail}
            />
          </div>
        </label>
        <label htmlFor="input_pw">
          <span>PW: </span>
          <div>
            <input
              type="password"
              name="password"
              value={password}
              onChange={onChangePassword}
            />
          </div>
          {logInError && <div>이메일이나 비밀번호를 확인해주세요!</div>}
        </label>
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