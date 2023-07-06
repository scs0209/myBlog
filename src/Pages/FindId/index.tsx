import axios from 'axios';
import HeadInfo from 'Components/common/HeadInfo';
import React, { FormEvent, useCallback, useState } from 'react';

import { backUrl } from '../../config';
import styles from '../../styles/FindId.module.css';
import useInput from '../../utils/useInput';

const FindId = () => {
  const [name, onChangeName] = useInput('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const onSubmitForm = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      axios
        .post(
          `${backUrl}/api/users/findId`,
          { name },
          {
            withCredentials: true,
          },
        )
        .then((res) => {
          const userEmail = res.data.email;
          const hiddenEmail = userEmail.replace(/\d+/g, (match: string) =>
            '*'.repeat(match.length),
          );

          setEmail(hiddenEmail);
          setMessage('');
        })
        .catch((err) => {
          setMessage(err.response.data.message);
          setEmail('');
        });
    },
    [name],
  );

  return (
    <>
      <HeadInfo title="Find Email" />
      <div className={styles.container}>
        <div className={`${styles.card} dark:bg-gray-800 dark:border-gray-700`}>
          <div className={styles.cardContent}>
            <h1 className={`${styles.title} dark:text-white`}>Find Email</h1>
            <form className="space-y-4 md:space-y-6" onSubmit={onSubmitForm}>
              <div>
                <label htmlFor="email" className={`${styles.label} dark:text-white`}>
                  Name
                </label>
                <input
                  type="text"
                  className={`${styles.input} dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
                  value={name}
                  onChange={onChangeName}
                />
              </div>
              <button
                type="submit"
                className={`${styles.submitBtn} dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800`}
              >
                submit
              </button>
            </form>
            {message && <div className="mt-1 text-red-600 items-center">{message}</div>}
            {email && <div className="mt-1 dark:text-white items-center">찾은 이메일: {email}</div>}
          </div>
        </div>
      </div>
    </>
  );
};

export default FindId;
