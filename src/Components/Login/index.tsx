import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import useSWR from 'swr';
import useInput from "../../utils/useInput";
import fetcher from "../../utils/fetcher";

const Login = () => {
  const [inputId, handleInputId] = useInput('');
  const [inputPw, handleInputPw] = useInput(''); 

  const onSubmitLogin = useCallback((e: any) => {

  }, [])

  //Login 버튼 클릭 이벤트
  const onClickLogin = useCallback(() => {
    console.log('click login')
    axios.post(
      '/api/users/login',
      { 
        "userId": inputId,
        "userPw": inputPw
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
          <label htmlFor="input_id">ID: </label>
          <input
            type="text"
            name="input_id"
            value={inputId}
            onChange={handleInputId}
          />
        </div>
        <div>
          <label htmlFor="input_pw">PW: </label>
          <input
            type="password"
            name="input_pw"
            value={inputPw}
            onChange={handleInputPw}
          />
        </div>
        <div>
          <button type="button" onClick={onClickLogin}>
            LogIn
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;