import axios from "axios";
import React, { useCallback, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import fetcher from "../../utils/fetcher";
import useInput from "../../utils/useInput";
import useSWR from 'swr';
import { backUrl } from "../../config";
import { Button, Label, TextInput } from "flowbite-react";

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
    <div className="flex flex-col items-center w-full">
      <h2 className="text-3xl font-bold dark:text-white mb-3">회원가입</h2>
      <form className="flex max-w-md flex-col gap-4" onSubmit={onSubmit}>
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
            <Label htmlFor="name" value="Name: " />
          </div>
          <TextInput
            type="text"
            name="name"
            id="name"
            value={name}
            onChange={onChangeName}
          />
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="password" value="Password: " />
          </div>
          <TextInput
            type="password"
            name="password"
            id="password"
            value={password}
            onChange={onChangePassword}
          />
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="password-check" value="PW Check: " />
          </div>
          <TextInput
            type="password"
            name="password"
            id="password"
            value={passwordCheck}
            onChange={onChangePasswordCheck}
          />
        </div>
        {mismatchError && (
          <div className="mt-1 text-red-600 text-xs">
            비밀번호가 일치하지 않습니다!
          </div>
        )}
        {!name && (
          <div className="mt-1 text-red-600 text-xs">이름을 입력해주세요!</div>
        )}
        {signUpError && (
          <div className="mt-1 text-red-600 text-xs">{signUpError}</div>
        )}
        {signUpSuccess && (
          <div className="mt-1 text-blue-600 text-xs">
            회원가입이 완료됐습니다. 로그인해주세요.
          </div>
        )}
        <Button
          className="bg-blue-500 hover:bg-blue-700 dark:bg-slate-500 dark:hover:bg-slate-600 mt-3"
          type="submit"
        >
          회원가입
        </Button>
      </form>
      <div className="mt-4 items-center text-xs dark:text-white">
        이미 회원이신가요?&nbsp;
        <Link
          className="hover:text-blue-500 text-gray-500 dark:text-gray-400 dark:hover:text-blue-500"
          to="/main/login"
        >
          로그인 하러가기
        </Link>
      </div>
    </div>
  );
}

export default SignUp;