import React, { ChangeEvent, useCallback, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router";
import fetcher from "../../utils/fetcher";
import useSWR from 'swr';
import autosize from "autosize";
import axios from "axios";

const PostEdit = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: post, mutate } = useSWR(`/api/main/posts/${id}`, fetcher);
  const [title, setTitle] = useState(post?.title || "");
  const [content, setContent] = useState(post?.content || "");
  const textareaRef = useRef(null);

  const onChangeTitle = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  }, []);

  const onChangeContent = useCallback(
    (e: ChangeEvent<HTMLTextAreaElement>) => {
      setContent(e.target.value);
    },
    []);

  useEffect(() => {
    if(textareaRef.current){
      autosize(textareaRef.current);
    }
  });

  const handleSubmit = useCallback((e: any) => {
    e.preventDefault();
    axios.put(`/api/main/posts/${id}`, {
      title,
      content
    }, {
      withCredentials: true,
    })
    .then(() => {
      mutate('api/main/posts');
      navigate(`/main/posts/${id}`)
    })
    .catch((error) => {
      console.error(error)
    })
  }, [id, title, content, navigate, mutate]);

  console.log(title);


  return (
    <div>
      <h2>게시글 수정</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">제목</label>
          <input
            placeholder="제목"
            type="text"
            id="title"
            name="title"
            value={title}
            onChange={onChangeTitle}
          />
        </div>
        <div>
          <label htmlFor="content">내용</label>
          <textarea
            placeholder="내용을 입력하세요"
            id="content"
            name="content"
            value={content}
            ref={textareaRef}
            onChange={onChangeContent}
          />
        </div>
        <button type="submit">수정</button>
      </form>
    </div>
  );
}

export default PostEdit;