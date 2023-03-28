import axios from "axios";
import { FindPasswordContainer, Name } from "../../Pages/FindPassword/styles";
import React, { ChangeEvent, FormEvent, useCallback, useState } from "react";
import { Button, Form, Input, Label, LabelContainer, Message } from "Pages/FindId/styles";

const ChangePassword = () => {
  const backUrl = "https://port-0-server-p8xrq2mlfsc6kg2.sel3.cloudtype.app";
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
      .put(`${backUrl}/users/password`, { currentPassword: password, newPassword }, {
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

  return (
    <FindPasswordContainer>
      <h2>비밀번호 변경</h2>
      <Form onSubmit={onSubmitForm}>
        <Label>
          <LabelContainer>
            <Name>현재 PW:</Name>
            <Input
              type="password"
              value={password}
              onChange={onChangePassword}
            />
          </LabelContainer>
        </Label>
        <Label>
          <LabelContainer>
            <Name>새 PW:</Name>
            <Input
              type="password"
              value={newPassword}
              onChange={onChangeNewPassword}
            />
          </LabelContainer>
        </Label>
        <Button type="submit">비밀번호 변경</Button>
      </Form>
      {message && <Message>{message}</Message>}
    </FindPasswordContainer>
  );
}

export default ChangePassword