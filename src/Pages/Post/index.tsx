import React, { ChangeEvent, useCallback, useState, VFC } from "react";
import { Input } from "./styles";
import axios from "axios";
import useSWR from 'swr';
import fetcher from "../../utils/fetcher";
import PostSubmit from "../../Components/PostSubmit";
import { Select } from "antd";
import { EditorState } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import MyEditor from "../../Components/CustomEditor";

const { Option } = Select;

const backUrl =
  process.env.NODE_ENV === "development"
    ? "http://localhost:5000"
    : "https://port-0-server-p8xrq2mlfsc6kg2.sel3.cloudtype.app";
const Post = () => {
  const { data: currentUser } = useSWR(`${backUrl}/api/users`, fetcher);
  const [title, setTitle] = useState("");
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [category, setCategory] = useState(""); // 카테고리 추가

  const { data: postData, mutate } = useSWR(
    `${backUrl}/api/main/posts`,
    fetcher
  );

  const { data: categoryData } = useSWR(`${backUrl}/api/categories`, fetcher);

  const onChangeTitle = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  }, []);

  const onChangeEditor = useCallback((editorState: EditorState) => {
    setEditorState(editorState);
  }, []);

  const onChangeCategory = useCallback((value: string) => {
    setCategory(value);
  }, []);

  const onSubmit = useCallback(
    (e: any) => {
      e.preventDefault();
      if (!title || !editorState.getCurrentContent().hasText() || !category) {
        alert("제목과 내용, 카테고리를 입력해주세요!");
        return;
      }
      axios
        .post(
          `${backUrl}/api/main/posts`,
          {
            title,
            content: editorState.getCurrentContent().getPlainText(),
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
          setEditorState(EditorState.createEmpty());
          setCategory("");
          mutate((cachedData: any) => [...cachedData, res.data], false);
        })
        .catch((err) => {
          console.error(err);
        });
    },
    [
      title,
      editorState,
      category,
      mutate,
      setTitle,
      setEditorState,
      setCategory,
      currentUser.id,
    ]
  );

  return (
    <div>
      <form onSubmit={onSubmit}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <div>
            <Input
              type="text"
              name="title"
              value={title}
              onChange={onChangeTitle}
              placeholder="제목"
            />
          </div>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <MyEditor onChange={onChangeEditor} editorState={editorState} />
          </div>
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