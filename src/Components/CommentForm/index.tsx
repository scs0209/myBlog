import autosize from "autosize";
import React, { FormEvent, memo, useCallback, useEffect, useRef, useState, VFC } from "react";
import { Button, Form, Textarea } from "./styles";

interface Props {
  onSubmit: (content: string) => void;
  error: string;
}

const CommentForm: VFC<Props> = ({ onSubmit, error }) => {
  const [content, setContent] = useState("");
  const textareaRef = useRef(null);

  const onChangeContent = useCallback((e: any) => {
    setContent(e.target.value);
  }, []);

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
      <Textarea name="content" id="content" ref={textareaRef} onChange={onChangeContent} />
      <Button type="submit">작성하기</Button>
      {error && <div>{error}</div>}
    </Form>
  );
}

export default memo(CommentForm);