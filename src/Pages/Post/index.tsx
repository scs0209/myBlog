import React, { ChangeEvent, useCallback, useEffect, useRef, useState, VFC } from "react";
import { Input, Textarea } from "./styles";
import autosize from 'autosize'
import axios from "axios";
import useSWR from 'swr';
import fetcher from "../../utils/fetcher";
import PostSubmit from "../../Components/PostSubmit";
import { Select } from "antd";

const { Option } = Select;


const backUrl =
  process.env.NODE_ENV === "development"
    ? "http://localhost:5000"
    : "https://port-0-server-p8xrq2mlfsc6kg2.sel3.cloudtype.app";
const Post = () => {
  const { data: currentUser } = useSWR(`${backUrl}/api/users`, fetcher);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState(""); // 카테고리 추가
  const textareaRef = useRef(null);

  const { data: postData, mutate } = useSWR(`${backUrl}/api/posts`, fetcher, {
    revalidateOnMount: true,
  });

  const { data: categoryData } = useSWR(`${backUrl}/api/categories`, fetcher);

  const onChangeTitle = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  }, []);

  const onChangeContents = useCallback(
    (e: ChangeEvent<HTMLTextAreaElement>) => {
      setContent(e.target.value);
    },
    []
  );

  useEffect(() => {
    if (textareaRef.current) {
      autosize(textareaRef.current);
    }
  });

  const onChangeCategory = useCallback(
    (value: string) => {
      setCategory(value);
    },
    []
  );

  const onSubmit = useCallback(
    (e: any) => {
      e.preventDefault();
      console.log(content);
      if (!title || !content || !category) {
        alert("제목과 내용, 카테고리를 입력해주세요!");
        return;
      }
      axios
        .post(
          `${backUrl}/api/posts`,
          {
            title,
            content,
            categoryId: category,
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
          setCategory("");
          mutate((cachedData: any) => [...cachedData, res.data], false);
        })
        .catch((err) => {
          console.error(err);
        });
    },
    [title, content, category, mutate, setTitle, setContent, setContent, currentUser.id]
  );

  return (
    <div>
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
        </div>
        <div>
          <Select value={category} onChange={onChangeCategory}>
            <Option value="">카테고리 선택</Option>
            {categoryData &&
              categoryData.map((category: any) => (
                <Option key={category.id} value={category.id}>
                  {category.name}
                </Option>
              ))}
          </Select>
        </div>
        <PostSubmit />
      </form>
    </div>
  );
}

export default Post;