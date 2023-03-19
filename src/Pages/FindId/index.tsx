import React, { ChangeEvent, FormEvent, useCallback, useState } from "react";
import axios from "axios";

const FindId = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const onChangeName = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  }, [])

  const onSubmitForm = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      axios
        .post(
          "/api/users/findId",
          { name },
          {
            withCredentials: true,
          }
        )
        .then((res) => {
          const userEmail = res.data.email;
          const hiddenEmail = userEmail.replace(/\d+/g, (match: string) =>
            "*".repeat(match.length)
          );
          setEmail(hiddenEmail);
          setMessage("");
        })
        .catch((err) => {
          setMessage(err.response.data.message);
          setEmail("");
        });
    },
    [name]
  );

  return (
    <div>
      <h2>이메일</h2>
      <form onSubmit={onSubmitForm}>
        <label>
          이름:
          <input type="text" value={name} onChange={onChangeName} />
        </label>
        <button type="submit">이메일 찾기</button>
      </form>
      {message && <div>{message}</div>}
      {email && <div>찾은 이메일: {email}</div>}
    </div>
  );
}

export default FindId;
