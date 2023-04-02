import React, { ChangeEvent, useCallback, useEffect, useRef, useState, VFC } from "react";
import { Input } from "./styles";
import axios from "axios";
import useSWR from 'swr';
import fetcher from "../../utils/fetcher";
import PostSubmit from "../../Components/PostSubmit";
import { Select } from "antd";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import QuillEditor from "../../Components/QuillEditor";


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
  const quillRef = useRef<ReactQuill>(null);

  const { data: postData, mutate } = useSWR(
    `${backUrl}/api/main/posts`,
    fetcher, {
      dedupingInterval: 10000,
    }
  );

  const { data: categoryData } = useSWR(`${backUrl}/api/categories`, fetcher);

  const onChangeTitle = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  }, []);

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
          mutate((cachedData: any) => [...cachedData, res.data], false);
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

  const handleImageUpload = useCallback(() => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();

    input.onchange = () => {
      const file = input.files?.[0];
      if (!file) {
        return;
      }

      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onloadend = () => {
        const image = new Image();
        if (reader.result) {
          image.src = reader.result as string;
        } else {
          image.src = "";
        }
        image.onload = () => {
          const quill = quillRef.current?.getEditor();
          if (!quill) {
            return;
          }
          const range = quill.getSelection();
          if (!range) return;
          quillRef.current
            ?.getEditor()
            .insertEmbed(range.index, "image", image.src);
        };
      };

      const formData = new FormData();
      formData.append("image", file);

      axios
        .post(`${backUrl}/api/upload`, formData, {
          withCredentials: true,
        })
        .then((response) => {
          // handle response
        })
        .catch((error) => {
          console.error(error);
        });
    };
  }, [quillRef]);



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
        <div style={{ display: "flex", justifyContent: "center"}}>
          <QuillEditor
            value={content}
            onChange={setContent}
            handleImageUpload={handleImageUpload}
            quillRef={quillRef}
          />
        </div>
        <div style={{ marginTop: "0.5rem" }}>
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