import React, { FormEvent, useCallback, useState, VFC } from "react";

interface Props {
  onSubmit: (content: string) => void;
  error: string;
}

const CommentForm: VFC<Props> = ({ onSubmit, error }) => {
  const [content, setContent] = useState("");

  const onChangeContent = useCallback((e: any) => {
    setContent(e.target.value);
  }, []);

  const handleSubmit = useCallback((e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(content);
    setContent("");
  }, [content, onSubmit]);

  if(content === undefined) return <div>로딩중...</div>

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="content">
          <textarea name="content" id="content" onChange={onChangeContent} />
        </label>
      </div>
      <button type="submit">작성하기</button>
      {error && <div>{error}</div>}
    </form>
  );
}

export default CommentForm;