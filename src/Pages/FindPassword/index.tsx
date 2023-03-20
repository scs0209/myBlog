import axios from "axios";
import React, { ChangeEvent, FormEvent, useCallback, useState } from "react";

const FindPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const onChangeEmail = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  }, [])

  const onSubmitForm = useCallback((e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    axios
      .post(`/api/users/findPassword`, { email }, {
        withCredentials: true,
      })
      .then((res) => {
        setMessage(res.data.message);
        setEmail("");
      })
      .catch((err) => {
        setMessage(err.response.data.messages);
        setEmail("");
      })
  }, [email]);

  return (
    <div>
      <h2>비밀번호 찾기</h2>
      <form onSubmit={onSubmitForm}>
        <label>
          이메일:
          <input type="email" value={email} onChange={onChangeEmail} />
        </label>
        <button type="submit">비밀번호 찾기</button>
      </form>
      {message && <div>{message}</div>}
    </div>
  )
}

export default FindPassword;