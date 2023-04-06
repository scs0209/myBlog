import autosize from "autosize";
import React, { FormEvent, memo, useCallback, useEffect, useRef, useState, VFC } from "react";
import { Button, Form, Textarea } from "./styles";
import useInput from "../../utils/useInput";

interface Props {
  onSubmit: (content: string) => void;
  error: string;
}

const CommentForm: VFC<Props> = ({ onSubmit, error }) => {
  const [content, onChangeContent, setContent] = useInput("");
  const textareaRef = useRef(null);

  const handleSubmit = useCallback((e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(content);
    setContent("");
  }, [content, onSubmit]);

  useEffect(() => {
    if(textareaRef.current){
      autosize(textareaRef.current);
    }
  });

  if(content === undefined) return <div>로딩중...</div>

  return (
    <Form onSubmit={handleSubmit}>
      <Textarea name="content" id="content" ref={textareaRef} onChange={onChangeContent} value={content} placeholder="댓글을 입력해주세요." />
      <Button type="submit">작성하기</Button>
      {error && <div>{error}</div>}
    </Form>
  );
}

export default CommentForm;