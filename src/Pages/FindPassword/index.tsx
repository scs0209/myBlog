import axios from 'axios';
import HeadInfo from 'Components/common/HeadInfo';
import React, { FormEvent, useCallback, useState } from 'react';

import { backUrl } from '../../config';
import styles from '../../styles/FindPassword.module.css';
import useInput from '../../utils/useInput';

const FindPassword = () => {
  const [email, onChangeEmail, setEmail] = useInput('');
  const [receiveEmail, onChangeReceiveEmail, setReceiveEmail] = useInput('');
  const [message, setMessage] = useState('');

  const onSubmitForm = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      axios
        .post(
          `${backUrl}/api/users/findPassword`,
          { email, receiveEmail },
          {
            withCredentials: true,
          },
        )
        .then((res) => {
          setMessage(res.data.message);
          setEmail('');
          setReceiveEmail('');
        })
        .catch((err) => {
          setMessage(err.response.data.message);
          setEmail('');
          setReceiveEmail('');
        });
    },
    [email, receiveEmail],
  );

  return (
    <>
      <HeadInfo title="Find Password" />
      <div className={styles.container}>
        <div className={`${styles.card} dark:bg-gray-800 dark:border-gray-700`}>
          <div className={styles.cardContent}>
            <h1 className={`${styles.title} dark:text-white`}>Find Password</h1>
            <form className="space-y-4 md:space-y-6" onSubmit={onSubmitForm}>
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Email
                </label>
                <input
                  type="email"
                  className={`${styles.input} dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
                  value={email}
                  onChange={onChangeEmail}
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Receive email
                </label>
                <input
                  type="email"
                  className={`${styles.input} dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
                  value={receiveEmail}
                  onChange={onChangeReceiveEmail}
                />
              </div>
              <button
                type="submit"
                className={`${styles.submitBtn} dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800`}
                value={receiveEmail}
              >
                submit
              </button>
            </form>
            {message && <div className={styles.message}>{message}</div>}
          </div>
        </div>
      </div>
    </>
  );
};

export default FindPassword;
