import React, { ChangeEvent, useCallback, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router";
import fetcher from "../../utils/fetcher";
import useSWR from "swr";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from "axios";
import { Input } from "../../Pages/Post/styles";
import { PostDiv, SubmitButton } from "../../Components/PostSubmit/styles";
import QuillEditor from "../../Components/QuillEditor";

const backUrl =
  process.env.NODE_ENV === "development"
    ? "http://localhost:5000"
    : "https://port-0-server-p8xrq2mlfsc6kg2.sel3.cloudtype.app";
const PostEdit = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: post, mutate } = useSWR(`${backUrl}/api/main/posts/${id}`, fetcher);
  const [title, setTitle] = useState(post?.title || "");
  const [content, setContent] = useState(post?.content || "");
  const quillRef = useRef<ReactQuill>(null);

  const onChangeTitle = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  }, []);


  const handleSubmit = useCallback((e: any) => {
    e.preventDefault();
    if (!title || !content) {
      alert("제목과 내용, 카테고리를 입력해주세요!");
      return;
    }
    axios
      .put(
        `${backUrl}/api/main/posts/${id}`,
        {
          title,
          content,
        },
        {
          withCredentials: true,
        }
      )
      .then(() => {
        mutate(`${backUrl}/api/main/posts`);
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
      <h2>게시글 수정</h2>
      <form onSubmit={handleSubmit}>
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
          <QuillEditor
            value={content}
            onChange={setContent}
            handleImageUpload={handleImageUpload}
          />
        </div>
        <PostDiv>
          <SubmitButton type="submit">수정</SubmitButton>
        </PostDiv>
      </form>
    </div>
  );
}

export default PostEdit;