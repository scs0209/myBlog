import axios from "axios";
import CommentForm from "../../Components/CommentForm";
import CommentList from "../../Components/CommentList";
import React, { useCallback, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import useSWR from 'swr';
import fetcher from "../../utils/fetcher";
import { Comment } from "../../typings/db";


const PostDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const {
    data: post,
    error,
    mutate: mutatePost
  } = useSWR(`/api/main/posts/${id}`, fetcher);
  const { data: commentsData, mutate: mutateComments } = useSWR(`/api/posts/${id}/comments`, fetcher)

  const [comments, setComments] = useState<Comment[]>([]);
  const [commentError, setCommentError] = useState("");

  const handleDeleteClick = useCallback(() => {
    const confirmResult = window.confirm("정말로 삭제하시겠습니까?");
    if (confirmResult) {
      axios
        .delete(`/api/main/posts/${id}`, {
          withCredentials: true,
        })
        .then(() => {
          mutatePost("/api/main/posts", false);
          navigate("/");
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [id, navigate, mutatePost]);

  //post 객체가 변경될 때마다 실행되며, post 객체가 존재하면 해당 게시물의 댓글들을 comments 상태로 업데이트 함
  // 따라서 이 코드는 게시물의 댓글들을 표시하기 위한 코드이다. post 객체가 변경될 때마다 댓글 목록이 업데이트 되기때문에, 댓글이 추가되거나 삭제될 때도 자동으로 반영된다.
  useEffect(() => {
    if (commentsData) {
      setComments(commentsData);
    }
  }, [commentsData]);

  // 댓글 등록
  const handleCommentSubmit = useCallback((content: string) => {
    axios
      .post(`/api/posts/${id}/comments`,
      {
        content,
        postId: id,
      }, {
        withCredentials: true,
      })
      .then((response) => {
        const newComment = {
          id: response.data.id,
          content,
          User: { id: response.data.User.id, name: response.data.User.name },
        };
        setComments((prevComments) => {
          if (!Array.isArray(prevComments)) {
            console.warn('prevComments is not an array:', prevComments);
            return [newComment];
          }
          return [...prevComments, commentsData];
        });
        setCommentError("");
        mutateComments();
      })
      .catch((err) => {
        console.error(err);
        setCommentError("댓글을 작성하는 도중 오류가 발생했습니다.")
      })
  }, [id, mutateComments]);
  console.log(comments);


  // 댓글 삭제
  const handleCommentDelete = useCallback((commentId: number) => {
    axios
      .delete(`/api/posts/comments/${commentId}`, {
        withCredentials: true,
      })
      .then(() => {
        setComments((prevComments) => 
          prevComments.filter((comment) => comment.id !== commentId)
        )
        setCommentError("");
      })
      .catch((err) => {
        console.error(err);
        setCommentError("댓글을 삭제하는 도중 오류가 발생했습니다.");
      })
  }, [])

  if (error) return <div>에러가 발생했습니다.</div>;
  if (!post) return <div>로딩 중...</div>;

  // 원래는 return문 이후에 변수를 선언하는 것은 허용되지 않지만, 조건부 렌더링을 사용하여 변수를 선언하고 렌더링하는 경우는 예외적으로 허용된다.
  const { title, content, createdAt } = post;

  const createdDate = new Date(createdAt);
  const dateString = `${createdDate.getFullYear()} - ${
    createdDate.getMonth() + 1
  } - ${createdDate.getDate()}`;

  //이걸 해주지 않으면 중간에 NaN이 나온다.
  if (`${createdDate.getFullYear()}` === 'NaN') return <div>로딩중...</div>

  return (
    <>
      {post && (
        <div>
          <h2>{title}</h2>
          <div>{content}</div>
          <div>{dateString}</div>
          <button onClick={handleDeleteClick}>삭제하기</button>
          <button>
            <Link to={`/main/posts/${id}/edit`}>수정하기</Link>
          </button>
        </div>
      )}
      <CommentForm onSubmit={handleCommentSubmit} error={commentError} />
      <CommentList comments={comments} onDelete={handleCommentDelete} />
    </>
  );
};

export default PostDetail;
