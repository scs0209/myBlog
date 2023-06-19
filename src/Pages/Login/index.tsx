import axios from "axios";
import React, { useCallback, useState } from "react";
import {Link, Navigate} from 'react-router-dom';
import useSWR from 'swr';
import useInput from "../../utils/useInput";
import fetcher from "../../utils/fetcher";
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
    <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0">
      <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
            Sign in to your account
          </h1>
          <form className="space-y-4 md:space-y-6" onSubmit={onSubmitLogin}>
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
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                value={email}
                onChange={onChangeEmail}
                placeholder="name@company.com"
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
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                value={password}
                onChange={onChangePassword}
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-start">
                <div className="flex items-center h-5"></div>
                <div className="text-sm">
                  <Link
                    to="/main/find-id"
                    className="text-gray-500 dark:text-gray-300"
                  >
                    Find Email
                  </Link>
                </div>
              </div>
              <Link
                to="/main/find-password"
                className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
              >
                Forgot password?
              </Link>
            </div>
            {logInError && (
              <div className="mt-1 text-red-600 text-xs">{errorMsg}</div>
            )}
            <button
              type="submit"
              className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
            >
              Sign in
            </button>
            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
              Don’t have an account yet?{" "}
              <Link
                to="/main/signup"
                className="font-medium text-primary-600 hover:underline dark:text-primary-500"
              >
                Sign up
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;