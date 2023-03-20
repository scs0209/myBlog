import axios from "axios";
import React, { ChangeEvent, FormEvent, useCallback, useState } from "react";

const ChangePassword = () => {
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");

  const onChangePassword = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  }, []);

  const onChangeNewPassword = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setNewPassword(e.target.value);
  }, []);

  const onSubmitForm = useCallback((e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    axios
      .put(`/api/users/password`, { currentPassword: password, newPassword }, {
        withCredentials: true,
      })
      .then((res) => {
        setMessage(res.data.message);
        setPassword("");
        setNewPassword("");
      })
      .catch((err) => {
        setMessage(err.response.data.message);
        setPassword("");
        setNewPassword("");
      })
  }, [password, newPassword])

  return(
    <div>
      <h2>비밀번호 변경</h2>
      <form onSubmit={onSubmitForm}>
        <label>
          현재 비밀번호:
          <input type="password" value={password} onChange={onChangePassword} />
        </label>
        <label>
          새비밀번호:
          <input type="password" value={newPassword} onChange={onChangeNewPassword} />
        </label>
        <button type="submit">비밀번호 변경</button>
      </form>
      {message && <div>{message}</div>}
    </div>
  )
}

export default ChangePassword