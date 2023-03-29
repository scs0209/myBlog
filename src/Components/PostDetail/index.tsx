import axios from "axios";
import CommentForm from "../../Components/CommentForm";
import CommentList from "../../Components/CommentList";
import React, { memo, useCallback, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import useSWR from 'swr';
import fetcher from "../../utils/fetcher";
import { Comment, Reply } from "../../typings/db";
import LikeButton from "../../Components/LikedButton";
import { LikeSpan, PostActions, PostContainer, PostContent, PostDate, PostDeleteButton, PostEditButton, PostHeader, PostTitle } from "./styles";


const backUrl =
  process.env.NODE_ENV === "development"
    ? "http://localhost:5000"
    : "https://port-0-server-p8xrq2mlfsc6kg2.sel3.cloudtype.app";
const PostDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: user } = useSWR(`${backUrl}/api/users`, fetcher);
  const {
    data: post,
    error,
    mutate: mutatePost,
  } = useSWR(`${backUrl}/api/main/posts/${id}`, fetcher);
  const { data: commentsData, mutate: mutateComments } = useSWR(
    `${backUrl}/api/posts/${id}/comments`,
    fetcher
  );
  const { data: likeInfo, mutate: mutateLikeInfo } = useSWR(
    `${backUrl}/api/posts/${id}/like-info`,
    fetcher
  );
  const { data: repliesData, mutate: mutateReplies } = useSWR(
    `${backUrl}/api/posts/${id}/replies`,
    fetcher
  );
  

  const [comments, setComments] = useState<Comment[]>([]);
  const [commentError, setCommentError] = useState("");
  const [replies, setReplies] = useState<Reply[]>([]);
  const [replyContent, setReplyContent] = useState<string>("");
  const [likeCount, setLikeCount] = useState<number>(0);
  const [liked, setLiked] = useState<boolean>(false);

  // 글 삭제
  const handleDeleteClick = useCallback(() => {
    const confirmResult = window.confirm("정말로 삭제하시겠습니까?");
    if (confirmResult) {
      axios
        .delete(`${backUrl}/api/main/posts/${id}`, {
          withCredentials: true,
        })
        .then(() => {
          mutatePost(`${backUrl}/api/main/posts`, false);
          navigate("/");
        })
        .catch((error) => {
          if (error.response.status === 403) {
            alert("삭제 권한이 없습니다.");
          } else if (error.response && error.response.status === 401) {
            alert(error.response.data);
          } else {
            console.error(error);
          }
        });
    }
  }, [id, navigate, mutatePost]);

  // 댓글 등록
  const handleCommentSubmit = useCallback(
    (content: string) => {
      if (!content || !content.trim()) {
        alert("내용을 입력해주세요.");
        return;
      }
      axios
        .post(
          `${backUrl}/api/posts/${id}/comments`,
          {
            content,
            postId: id,
          },
          {
            withCredentials: true,
          }
        )
        .then((response) => {
          const newComment = {
            id: response.data.id,
            content,
            User: { id: response.data.User.id, name: response.data.User.name },
          };
          setComments((prevComments) => {
            if (!Array.isArray(prevComments)) {
              console.warn("prevComments is not an array:", prevComments);
              return [newComment];
            }
            return [...prevComments, commentsData];
          });
          setCommentError("");
          mutateComments();
        })
        .catch((err) => {
          if (err.response && err.response.status === 401) {
            alert(err.response.data);
            setCommentError("");
          } else {
            console.error(err);
            setCommentError("댓글을 작성하는 도중 오류가 발생했습니다.");
          }
        });
    },
    [id, mutateComments]
  );
  console.log(comments);

  // 댓글 수정
  const handleCommentEdit = useCallback(
    (commentId: number, content: string) => {
      if (!content || !content.trim()) {
        alert("내용을 입력해주세요");
        return;
      }
      axios
        .patch(
          `${backUrl}/api/posts/comments/${commentId}`,
          {
            content: content,
          },
          {
            withCredentials: true,
          }
        )
        .then(() => {
          setComments((prevComments) => {
            const newComments = [...prevComments];
            const commentIndex = newComments.findIndex(
              (comment) => comment.id === commentId
            );
            newComments[commentIndex] = {
              ...newComments[commentIndex],
              content,
            };
            return newComments;
          });
          setCommentError("");
        })
        .catch((err) => {
          console.error(err);
          if (err.response && err.response.status === 403) {
            alert("댓글 작성자만 수정할 수 있습니다.");
          } else if (err.response && err.response.status === 401) {
            alert(err.response.data);
          } else {
            setCommentError("댓글을 수정하는 도중 오류가 발생했습니다.");
          }
        });
    },
    [setComments, setCommentError]
  );

  // 댓글 삭제
  const handleCommentDelete = useCallback((commentId: number) => {
    axios
      .delete(`${backUrl}/api/posts/comments/${commentId}`, {
        withCredentials: true,
      })
      .then(() => {
        setComments((prevComments) =>
          prevComments.filter((comment) => comment.id !== commentId)
        );
        setCommentError("");
      })
      .catch((err) => {
        console.error(err);
        if (err.response && err.response.status === 403) {
          alert("댓글 작성자만 댓글을 삭제할 수 있습니다");
        } else if (err.response && err.response.status === 401) {
          alert(err.response.data);
        } else {
          setCommentError("댓글을 삭제하는 도중 오류가 발생했습니다.");
        }
      });
  }, []);

  // 답글 생성
  const handleReplySubmit = useCallback((commentId: number, replyContent: string) => {
    if(!replyContent) {
      alert("글을 작성해주세요!")
      return
    }

    const newReply = {
      content: replyContent,
      User: { name: user.name },
      CommentId: commentId,
    }

    // 댓글에 대한 답글 추가 API 호출
    axios
      .post(`${backUrl}/api/posts/comments/${commentId}/replies`, newReply, {
      withCredentials: true,
      })
      .then((response) => {
        const addedReply = response.data;
        setReplies((prev) => [...prev, addedReply]);
        setReplyContent("");
      })
      .catch(error => {
        if (error.response && error.response.status === 401) {
          alert(error.response.data);
        }
        console.error(error);
      })
  }, [user.name]);


  // 답글 수정
  const handleReplyEdit = useCallback(
    (commentId: number, replyId: number, editedContent: string) => {
      if (!editedContent.trim()) {
        alert("글을 작성해주세요!");
        return;
      }

      axios
        .put(
          `${backUrl}/api/posts/comments/${commentId}/replies/${replyId}`,
          { content: editedContent },
          {
            withCredentials: true,
          }
        )
        .then((res) => {
          const editedReply = res.data;
          setReplies((prev) =>
            prev.map((reply) => {
              if (reply.id === replyId) {
                return editedReply;
              }
              return reply;
            })
          );
        })
        .catch((err) => {
          if (err.response && err.response.status === 403) {
            alert("댓글 작성자만 수정할 수 있습니다.");
          } else if (err.response && err.response.status === 401) {
            alert(err.response.data);
          } else {
            console.log(err);
          }
        });
      },
    []
  );

  // 답글 삭제
  const handleReplyDelete = useCallback(
    (commentId: number, replyId: number) => {
      if (window.confirm("정말 삭제하시겠습니까?")) {
        axios
          .delete(`${backUrl}/api/posts/comments/${commentId}/replies/${replyId}`, {
            withCredentials: true,
          })
          .then(() => {
            setReplies((prev) => prev.filter((reply) => reply.id !== replyId));
          })
          .catch((err) => {
            if (err.response && err.response.status === 403) {
              alert("삭제 권한이 없습니다.");
            } else if (err.response && err.response.status === 401) {
              alert(err.response.data);
            } else {
              console.log(err);
            }
          });
      }
    },
    []
  );

  //좋아요 클릭
  const handleLikedClick = useCallback(() => {
    if (liked) {
      // 좋아요 취소를 눌렀을 때
      mutateLikeInfo(
        (prev: any) => ({
          ...prev,
          count: prev.count - 1,
          liked: false,
        }),
        false
      );

      axios
        .post(`${backUrl}/posts/${id}/like`, {
          withCredentials: true,
          method: "DELETE"
        })
        .then(() => {
          // 서버 응답이 오면 다시 업데이트
          mutateLikeInfo((prev: any) => ({
            ...prev,
            count: prev.count - 1,
            liked: false,
          }));
        })
        .catch((err) => {
          console.error(err);
          // 에러 발생 시 UI를 롤백
          mutateLikeInfo((prev: any) => ({
            ...prev,
            count: prev.count + 1,
            liked: true,
          }));
        });
    } else {
      // 좋아요를 눌렀을 때
      mutateLikeInfo(
        (prev: any) => ({
          ...prev,
          count: prev.count + 1,
          liked: true,
        }),
        false
      );

      axios
        .post(
          `${backUrl}/api/posts/${id}/like`,
          {
            UserId: user.id,
            PostID: id,
          },
          {
            withCredentials: true,
          }
        )
        .then(() => {
          // 서버 응답이 오면 다시 업데이트
          mutateLikeInfo((prev: any) => ({
            ...prev,
            count: prev.count + 1,
            liked: true,
          }));
        })
        .catch((err) => {
          console.error(err);
          // 에러 발생 시 UI를 롤백
          mutateLikeInfo((prev: any) => ({
            ...prev,
            count: prev.count - 1,
            liked: false,
          }));
        });
    }
  }, [id, liked, mutateLikeInfo, user.id]);

  //post 객체가 변경될 때마다 실행되며, post 객체가 존재하면 해당 게시물의 댓글들을 comments 상태로 업데이트 함
  // 따라서 이 코드는 게시물의 댓글들을 표시하기 위한 코드이다. post 객체가 변경될 때마다 댓글 목록이 업데이트 되기때문에, 댓글이 추가되거나 삭제될 때도 자동으로 반영된다.
  useEffect(() => {
    if (commentsData) {
      setComments(commentsData);
    }
    if (likeInfo) {
      setLikeCount(likeInfo.likeCount);
      setLiked(likeInfo.liked);
    }
    if (repliesData) {
      setReplies(repliesData);
    }
  }, [commentsData, likeInfo, repliesData]);
  console.log(repliesData);

  if (error) return <div>에러가 발생했습니다.</div>;
  if (!post) return <div>로딩 중...</div>;

  // 원래는 return문 이후에 변수를 선언하는 것은 허용되지 않지만, 조건부 렌더링을 사용하여 변수를 선언하고 렌더링하는 경우는 예외적으로 허용된다.
  const { title, content, createdAt } = post;

  const createdDate = new Date(createdAt);
  const dateString = `${createdDate.getFullYear()} - ${
    createdDate.getMonth() + 1
  } - ${createdDate.getDate()}`;

  //이걸 해주지 않으면 중간에 NaN이 나온다.
  if (`${createdDate.getFullYear()}` === "NaN") return <div>로딩중...</div>;

  return (
    <PostContainer>
      {post && (
        <>
          <PostHeader>
            <PostTitle>{title}</PostTitle>
            <PostDate>{dateString}</PostDate>
          </PostHeader>
          <PostContent>{content}</PostContent>
          <PostActions>
            <div>
              <LikeSpan>좋아요: {likeCount}</LikeSpan>
              {user && (
                <LikeButton
                  likeCount={likeCount}
                  liked={liked}
                  onClick={handleLikedClick}
                />
              )}
            </div>
            <div>
              {user && user.role === "admin" && (
                <>
                  <PostDeleteButton onClick={handleDeleteClick}>
                    삭제하기
                  </PostDeleteButton>
                  <PostEditButton>
                    <Link to={`/main/posts/${id}/edit`}>수정하기</Link>
                  </PostEditButton>
                </>
              )}
            </div>
          </PostActions>
        </>
      )}
      <CommentForm onSubmit={handleCommentSubmit} error={commentError} />
      <CommentList
        comments={comments}
        replies={replies}
        onDelete={handleCommentDelete}
        onEdit={handleCommentEdit}
        onReply={handleReplySubmit}
        onDeleteReply={handleReplyDelete}
        onReplyEdit={handleReplyEdit}
      />
    </PostContainer>
  );
};

export default memo(PostDetail);
