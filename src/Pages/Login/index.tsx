import axios from "axios";
import React, { useCallback, useState } from "react";
import {Link, Navigate} from 'react-router-dom';
import useSWR from 'swr';
import useInput from "../../utils/useInput";
import fetcher from "../../utils/fetcher";
import { Button, Label, TextInput } from "flowbite-react";
import { backUrl } from "../../config";

const Login = () => {
  const { data, error, mutate } = useSWR(`${backUrl}/api/users`, fetcher);
  const [logInError, setLogInError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [email, onChangeEmail] = useInput('');
  const [password, onChangePassword] = useInput(''); 

  //Login 버튼 클릭 이벤트
  const onSubmitLogin = useCallback((e: any) => {
    e.preventDefault();
    setLogInError(false);
    axios.post(
      `${backUrl}/api/users/login`,
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
    <div className="flex flex-col items-center w-full">
      <h2 className="text-3xl font-bold dark:text-white mb-3">LogIn</h2>
      <form className="flex max-w-md flex-col gap-4" onSubmit={onSubmitLogin}>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="input_email" value="Email: " />
          </div>
          <TextInput
            type="email"
            name="email"
            id="email"
            value={email}
            onChange={onChangeEmail}
          />
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="input_pw" value="Password: " />
          </div>
          <TextInput
            type="password"
            name="password"
            id="password"
            value={password}
            onChange={onChangePassword}
          />
        </div>
        {logInError && <div className="mt-1 text-red-600 text-xs">{errorMsg}</div>}

        <Button
          className="bg-blue-500 hover:bg-blue-700 dark:bg-slate-500 dark:hover:bg-slate-600 mt-3"
          type="submit"
        >
          LogIn
        </Button>
      </form>
      <p className="dark:text-white items-center text-xs mt-3">
        아직 회원이 아니신가요?&nbsp;
        <Link className="text-gray-200 hover:text-blue-500" to="/main/signup">
          회원가입 하러가기
        </Link>
      </p>
      <div className="flex flex-col items-center mt-4">
        <Link
          className="dark:text-white hover:text-blue-500 text-xs mb-2"
          to="/main/find-id"
        >
          email 찾기
        </Link>
        <Link
          className="dark:text-white hover:text-blue-500 text-xs"
          to="/main/find-password"
        >
          비밀번호 찾기
        </Link>
      </div>
    </div>
  );
};

export default Login;