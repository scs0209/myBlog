import React, { ChangeEvent, useCallback, useEffect, useRef, useState } from "react";
import { Input, Textarea } from "./styles";
import autosize from 'autosize'
import axios from "axios";
import useSWR from 'swr';
import useInput from "../../utils/useInput";
import fetcher from "../../utils/fetcher";

const Post = () => {
  const { data: currentUser } = useSWR('/api/users', fetcher, {
    dedupingInterval: 5000,
  });
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const textareaRef = useRef(null);

  const { data: postData, mutate } = useSWR("/api/posts", {
    revalidateOnMount: true,
  });

  const onChangeTitle = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setTitle(e.target.value);
    },
    []
  );

  const onChangeContents = useCallback((e: ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  }, [])

  useEffect(() => {
    if(textareaRef.current){
      autosize(textareaRef.current);
    }   
  });

  const onSubmit = useCallback(
    (e: any) => {
      e.preventDefault();
      console.log(content);
      if (!title || !content) {
        alert("제목과 내용을 입력해주세요!");
        return;
      }
      axios
        .post(
          "/api/posts",
          {
            title,
            content,
            UserId: currentUser.id,
          },
          {
            withCredentials: true,
          }
        )
        .then((res) => {
          alert("게시글이 작성되었습니다.");
          setTitle("");
          setContent("");
          mutate((cachedData: any) => [...cachedData, res.data], false);
        })
        .catch((err) => {
          console.error(err);
        });
    },
    [title, content, mutate, setTitle, setContent]
  );

  return(
    <form onSubmit={onSubmit}>
      <div>
        <Input 
          type="text" 
          name="title" 
          value={title}
          onChange={onChangeTitle} 
          placeholder="제목" 
        />
      </div>
      <div>
        <Textarea 
          placeholder="내용을 입력하세요"
          name="content"
          value={content}
          ref={textareaRef}
          onChange={onChangeContents}
        ></Textarea>
        <button type="submit">작성하기</button>
      </div>
    </form>
  )
}

export default Post;