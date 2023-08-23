import { useFindPassword } from 'apis/password';
import HeadInfo from 'Components/common/HeadInfo';
import React, { FormEvent } from 'react';

import styles from '../../styles/FindPassword.module.css';
import useInput from '../../utils/useInput';

const FindPassword = () => {
  const [email, onChangeEmail, setEmail] = useInput('');
  const [receiveEmail, onChangeReceiveEmail, setReceiveEmail] = useInput('');
  const { mutateAsync: findPassword } = useFindPassword();

  const onSubmitForm = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await findPassword({ email, receiveEmail });

    setEmail('');
    setReceiveEmail('');
  };

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
          </div>
        </div>
      </div>
    </>
  );
};

export default FindPassword;
