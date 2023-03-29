import React, { ChangeEvent, FormEvent, useCallback, useState } from "react";
import axios from "axios";
import { Button, Email, FindIdContainer, Form, Input, Label, LabelContainer, Message, Name } from "./styles";

const backUrl =
  process.env.NODE_ENV === "development"
    ? "http://localhost:5000"
    : "https://port-0-server-p8xrq2mlfsc6kg2.sel3.cloudtype.app";
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
          `${backUrl}/users/findId`,
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
    <FindIdContainer>
      <h2>이메일</h2>
      <Form onSubmit={onSubmitForm}>
        <Label>
          <LabelContainer>
            <Name>이름: </Name>
            <Input type="text" value={name} onChange={onChangeName} />
          </LabelContainer>
        </Label>
        <Button type="submit">이메일 찾기</Button>
      </Form>
      {message && <Message>{message}</Message>}
      {email && <Email>찾은 이메일: {email}</Email>}
    </FindIdContainer>
  );
}

export default FindId;
