import React, { useCallback, useState } from "react";
import axios from "axios";
import useSWR from 'swr';
import fetcher from "../../utils/fetcher";
import PostSubmit from "../../Components/PostSubmit";
import { Select } from "antd";
import useInput from "../../utils/useInput";
import MDEditor from "@uiw/react-md-editor";
import { backUrl } from "../../config";
import HeadInfo from "Components/common/HeadInfo";


const { Option } = Select;
const Post = () => {
  const { data: currentUser } = useSWR(`${backUrl}/api/users`, fetcher);
  const [title, onChangeTitle, setTitle] = useInput("");
  const [content, setContent] = useState<string | undefined>("");
  const [category, setCategory] = useState(""); // 카테고리 추가

  const { data: postData, mutate } = useSWR(
    `${backUrl}/api/main/posts`,
    fetcher, {
      dedupingInterval: 10000,
    }
  );

  const { data: categoryData } = useSWR(`${backUrl}/api/categories`, fetcher);

  const onChangeCategory = useCallback((value: string) => {
    setCategory(value);
  }, []);


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
          `${backUrl}/api/main/posts`,
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
          mutate((cachedData: any) => {
            if (Array.isArray(cachedData)) {
              return [...cachedData, res.data];
            }
            return cachedData;
          }, false);
        })
        .catch((err) => {
          console.error(err);
        });
    },
    [
      title,
      content,
      category,
      mutate,
      setTitle,
      setContent,
      setContent,
      currentUser.id,
    ]
  );

  return (
    <>
    <HeadInfo title="Write" />
      <div>
        <form onSubmit={onSubmit}>
          <input
            className="w-full rounded-md pt-3.5 pb-3.5 border-none text-2xl font-bold border-b-gray-400 focus:outline-none"
            type="text"
            name="title"
            value={title}
            onChange={onChangeTitle}
            placeholder="제목"
          />
          <div className="markarea">
            <div data-color-mode="light">
              <MDEditor
                style={{ width: "100%" }}
                height={600}
                value={content}
                onChange={setContent}
                preview="live"
              />
            </div>
          </div>
          <div className="mt-5 text-center">
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
    </>
  );
}

export default Post;