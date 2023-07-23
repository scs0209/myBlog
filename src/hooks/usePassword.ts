import { ChangeEvent, useCallback, useState } from 'react';

const usePassword = (initialValue: string) => {
  const [password, setPassword] = useState(initialValue);
  const [passwordCheck, setPasswordCheck] = useState(initialValue);
  const [mismatchError, setMismatchError] = useState(false);

  const onChangePassword = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setPassword(e.target.value);
      setMismatchError(e.target.value !== passwordCheck);
    },
    [passwordCheck],
  );

  const onChangePasswordCheck = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setPasswordCheck(e.target.value);
      setMismatchError(e.target.value !== password);
    },
    [password],
  );

  return {
    password,
    passwordCheck,
    mismatchError,
    onChangePassword,
    onChangePasswordCheck,
  };
};

export default usePassword;
