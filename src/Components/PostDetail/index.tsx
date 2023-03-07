import axios from "axios";
import React, { useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useSWR from 'swr';
import fetcher from "../../utils/fetcher";


const PostDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const {
    data: post,
    error
  } = useSWR(`/api/main/posts/${id}`, fetcher);

  const handleDeleteClick = useCallback(async () => {
    const confirmResult = window.confirm("정말로 삭제하시겠습니까?");
    if (confirmResult) {
      try {
        await axios.delete(`/api/main/posts/${id}`, {
          withCredentials: true,
        });
        navigate("/main/posts");
      } catch (error) {
        console.error(error);
      }
    }
  }, [id, history]);

  if (error) return <div>에러가 발생했습니다.</div>;
  if (!post) return <div>로딩 중...</div>;

  // 원래는 return문 이후에 변수를 선언하는 것은 허용되지 않지만, 조건부 렌더리을 사용하여 변수를 선언하고 렌더링하는 경우는 예외적으로 허용된다.
  const { title, content, createdAt } = post;

  const createdDate = new Date(createdAt);
  const dateString = `${createdDate.getFullYear()} - ${
    createdDate.getMonth() + 1
  } - ${createdDate.getDate()}`;



  return (
    <>
      {post && <div>
        <h2>{title}</h2>
        <div>{content}</div>
        <div>{dateString}</div>
        <button onClick={handleDeleteClick}>삭제하기</button>
      </div>}
    </>
  );
};

export default PostDetail;
