import axios from 'axios';
import HeadInfo from 'Components/common/HeadInfo';
import SocialBtn from 'Components/LogIn/SocialBtn';
import React, { useCallback, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import useSWR from 'swr';

import { backUrl } from '../../config';
import styles from '../../styles/Login.module.css';
import fetcher from '../../utils/fetcher';
import useInput from '../../utils/useInput';

const Login = () => {
  const { data, error, mutate } = useSWR(`${backUrl}/api/users`, fetcher);
  const [logInError, setLogInError] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [email, onChangeEmail] = useInput('');
  const [password, onChangePassword] = useInput('');

  //Login 버튼 클릭 이벤트
  const onSubmitLogin = useCallback(
    (e: any) => {
      e.preventDefault();
      setLogInError(false);
      axios
        .post(
          `${backUrl}/api/users/login`,
          {
            email,
            password,
          },
          {
            withCredentials: true,
          },
        )
        .then((res) => {
          mutate(res.data, false);
        })
        .catch((err) => {
          console.log(err);
          setLogInError(err.response.status === 401);
          setErrorMsg(err.response.data);
        });
    },
    [email, password, mutate],
  );

  if (data === undefined) {
    return <div>로딩중...</div>;
  }

  if (data) {
    return <Navigate to="/main/posts" />;
  }

  return (
    <>
      <HeadInfo title="Login" />
      <div className={styles.container}>
        <div className={`${styles.card} dark:bg-gray-800 dark:border-gray-700`}>
          <div className={styles.cardContent}>
            <h1 className={`${styles.title} dark:text-white`}>Sign in to your account</h1>
            <form className="space-y-4 md:space-y-6" onSubmit={onSubmitLogin}>
              <div>
                <label htmlFor="email" className={`${styles.label} dark:text-white`}>
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
                <label htmlFor="password" className={`${styles.label} dark:text-white`}>
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
              <div className="flex items-center justify-between">
                <div className="flex items-start">
                  <div className="flex items-center h-5"></div>
                  <div className="text-sm">
                    <Link to="/main/find-id" className="text-gray-500 dark:text-gray-300">
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
              {logInError && <div className="mt-1 text-red-600 text-xs">{errorMsg}</div>}
              <button
                type="submit"
                className={`${styles.signInBtn} dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800`}
              >
                Sign in
              </button>
              <SocialBtn />
              <p className={`${styles.smallText} dark:text-gray-400`}>
                Don’t have an account yet?{' '}
                <Link to="/main/signup" className={`${styles.signUpLink} dark:text-primary-500`}>
                  Sign up
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
