import React, { ChangeEvent, useCallback, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router";
import fetcher from "../../utils/fetcher";
import useSWR from 'swr';
import autosize from "autosize";
import axios from "axios";

const backUrl =
  process.env.NODE_ENV === "development"
    ? "http://localhost:5000"
    : "https://port-0-server-p8xrq2mlfsc6kg2.sel3.cloudtype.app";
const PostEdit = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: post, mutate } = useSWR(`${backUrl}/main/posts/${id}`, fetcher);
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
    axios
      .put(
        `${backUrl}/main/posts/${id}`,
        {
          title,
          content,
        },
        {
          withCredentials: true,
        }
      )
      .then(() => {
        mutate(`${backUrl}/main/posts`);
        // 수정하고 나면 내가 수정한 내용을 보기 위해 그 페이지로 가게 해주기!
        navigate(`/main/posts/${id}`);
      })
      .catch((error) => {
        console.error(error);
        if (error.response && error.response.status === 403) {
          alert("게시글 작성자만 수정할 수 있습니다.");
        } else if (error.response && error.response.status === 401) {
          alert(error.response.data);
        } else {
          alert("게시글을 수정하는 도중 오류가 발생했습니다.");
        }
      });
  }, [id, title, content, navigate, mutate]);


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