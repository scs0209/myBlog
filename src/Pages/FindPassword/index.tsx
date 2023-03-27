import axios from "axios";
import { Button, Form, Input, Label, LabelContainer, Message } from "../../Pages/FindId/styles";
import React, { ChangeEvent, FormEvent, useCallback, useState } from "react";
import { FindPasswordContainer, Name } from "./styles";

const FindPassword = () => {
  const [email, setEmail] = useState("");
  const [receiveEmail, setReceiveEmail] = useState("");
  const [message, setMessage] = useState("");

  const onChangeEmail = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  }, []);

  const onChangeReceiveEmail = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setReceiveEmail(e.target.value);
  }, []);

  const onSubmitForm = useCallback((e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    axios
      .post(`/api/users/findPassword`, { email, receiveEmail }, {
        withCredentials: true,
      })
      .then((res) => {
        setMessage(res.data.message);
        setEmail("");
        setReceiveEmail("");
      })
      .catch((err) => {
        setMessage(err.response.data.message);
        setEmail("");
        setReceiveEmail("");
      })
  }, [email, receiveEmail]);

  return (
    <FindPasswordContainer>
      <h2>비밀번호 찾기</h2>
      <Form onSubmit={onSubmitForm}>
        <Label>
          <LabelContainer>
            <Name>Email:</Name>
            <Input type="email" value={email} onChange={onChangeEmail} />
          </LabelContainer>
        </Label>
        <Label>
          <LabelContainer>
            <Name>Receive Email:</Name>
            <Input type="email" value={receiveEmail} onChange={onChangeReceiveEmail} />
          </LabelContainer>
        </Label>
        <Button type="submit">비밀번호 찾기</Button>
      </Form>
      {message && <Message>{message}</Message>}
    </FindPasswordContainer>
  );
}

export default FindPassword;