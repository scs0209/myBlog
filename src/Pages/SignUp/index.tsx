import axios from "axios";
import React, { useCallback, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import fetcher from "../../utils/fetcher";
import useInput from "../../utils/useInput";
import useSWR from 'swr';
import { backUrl } from "../../config";
import HeadInfo from "Components/common/HeadInfo";
import styles from "../../styles/SignUp.module.css"

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
    <>
      <HeadInfo title="Sign Up" />
      <div className={styles.container}>
        <div
          className={`${styles.card} dark:border dark:bg-gray-800 dark:border-gray-700`}
        >
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className={`${styles.title} dark:text-white`}>
              Create and account
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={onSubmit}>
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Your email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className={`${styles.input} dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
                  value={email}
                  onChange={onChangeEmail}
                  placeholder="name@company.com"
                />
              </div>
              <div>
                <label
                  htmlFor="name"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Your name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  className={`${styles.input} dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
                  value={name}
                  onChange={onChangeName}
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  className={`${styles.input} dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
                  value={password}
                  onChange={onChangePassword}
                />
              </div>
              <div>
                <label
                  htmlFor="password-check"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Confirm password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  className={`${styles.input} dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
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
                <div className="mt-1 text-red-600 text-xs">
                  이름을 입력해주세요!
                </div>
              )}
              {signUpError && (
                <div className="mt-1 text-red-600 text-xs">{signUpError}</div>
              )}
              {signUpSuccess && (
                <div className="mt-1 text-blue-600 text-xs">
                  회원가입이 완료됐습니다. 로그인해주세요.
                </div>
              )}
              <button
                type="submit"
                className={`${styles.btn} dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800`}
              >
                Create an account
              </button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Already have an account?{" "}
                <Link
                  to="/main/login"
                  className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Login here
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default SignUp;