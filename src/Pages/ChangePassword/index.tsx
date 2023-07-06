import axios from 'axios';
import HeadInfo from 'Components/common/HeadInfo';
import { backUrl } from 'config';
import React, { FormEvent, useCallback, useState } from 'react';

import styles from '../../styles/ChangePassword.module.css';
import useInput from '../../utils/useInput';

const ChangePassword = () => {
  const [password, onChangePassword, setPassword] = useInput('');
  const [newPassword, onChangeNewPassword, setNewPassword] = useInput('');
  const [message, setMessage] = useState('');

  const onSubmitForm = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      axios
        .put(
          `${backUrl}/api/users/password`,
          { currentPassword: password, newPassword },
          {
            withCredentials: true,
          },
        )
        .then((res) => {
          setMessage(res.data.message);
          setPassword('');
          setNewPassword('');
        })
        .catch((err) => {
          setMessage(err.response.data.message);
          setPassword('');
          setNewPassword('');
        });
    },
    [password, newPassword],
  );

  return (
    <>
      <HeadInfo title="Change Password" />
      <div className={styles.container}>
        <div className={`${styles.card} dark:bg-gray-800 dark:border-gray-700`}>
          <div className={styles.inner}>
            <h1 className={`${styles.title} dark:text-white`}>Change Password</h1>
            <form className="space-y-4 md:space-y-6" onSubmit={onSubmitForm}>
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Current Password
                </label>
                <input
                  type="password"
                  className={`${styles.formItem} dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
                  value={password}
                  onChange={onChangePassword}
                />
              </div>
              <div>
                <label
                  htmlFor="new-password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  New Password
                </label>
                <input
                  type="password"
                  className={`${styles.formItem} dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
                  value={newPassword}
                  onChange={onChangeNewPassword}
                />
              </div>
              <button
                type="submit"
                className={`${styles.submitBtn} dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800`}
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

export default ChangePassword;
