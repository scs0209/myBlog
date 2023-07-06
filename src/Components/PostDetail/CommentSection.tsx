import axios from 'axios';
import { backUrl } from 'config';
import React, { FC, useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import useSWR from 'swr';
import fetcher from 'utils/fetcher';

import CommentForm from '../../Components/CommentForm';
import CommentList from '../../Components/CommentList';
import styles from '../../styles/PostDetail.module.css';
import { Comment, Reply } from '../../typings/db';

const CommentSection = () => {
  const { id } = useParams<{ id: string }>();
  const { data: user } = useSWR(`${backUrl}/api/users`, fetcher);
  const {
    data: post,
    error,
    mutate: mutatePost,
  } = useSWR(`${backUrl}/api/main/posts/${id}`, fetcher);
  const { data: commentsData, mutate: mutateComments } = useSWR(
    `${backUrl}/api/posts/${id}/comments`,
    fetcher,
  );
  const { data: repliesData, mutate: mutateReplies } = useSWR(
    `${backUrl}/api/posts/${id}/replies`,
    fetcher,
  );

  const [comments, setComments] = useState<Comment[]>([]);
  const [commentError, setCommentError] = useState('');
  const [replies, setReplies] = useState<Reply[]>([]);
  const [replyContent, setReplyContent] = useState<string>('');

  // 댓글 등록
  const handleCommentSubmit = useCallback(
    (content: string) => {
      if (!content || !content.trim()) {
        alert('내용을 입력해주세요.');

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
          },
        )
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
          setCommentError('');
          mutateComments();
        })
        .catch((err) => {
          if (err.response && err.response.status === 401) {
            alert(err.response.data);
            setCommentError('');
          } else {
            console.error(err);
            setCommentError('댓글을 작성하는 도중 오류가 발생했습니다.');
          }
        });
    },
    [id, mutateComments],
  );

  // 댓글 수정
  const handleCommentEdit = useCallback(
    (commentId: number, content: string) => {
      if (!content || !content.trim()) {
        alert('내용을 입력해주세요');

        return;
      }
      axios
        .put(
          `${backUrl}/api/posts/comments/${commentId}`,
          {
            content,
          },
          {
            withCredentials: true,
          },
        )
        .then(() => {
          setComments((prevComments) => {
            const newComments = [...prevComments];
            const commentIndex = newComments.findIndex((comment) => comment.id === commentId);

            newComments[commentIndex] = {
              ...newComments[commentIndex],
              content,
            };

            return newComments;
          });
          setCommentError('');
        })
        .catch((err) => {
          console.error(err);
          if (err.response && err.response.status === 403) {
            alert('댓글 작성자만 수정할 수 있습니다.');
          } else if (err.response && err.response.status === 401) {
            alert(err.response.data);
          } else {
            setCommentError('댓글을 수정하는 도중 오류가 발생했습니다.');
          }
        });
    },
    [setComments, setCommentError],
  );

  // 댓글 삭제
  const handleCommentDelete = useCallback((commentId: number) => {
    axios
      .delete(`${backUrl}/api/posts/comments/${commentId}`, {
        withCredentials: true,
      })
      .then(() => {
        setComments((prevComments) => prevComments.filter((comment) => comment.id !== commentId));
        setCommentError('');
      })
      .catch((err) => {
        console.error(err);
        if (err.response && err.response.status === 403) {
          alert('댓글 작성자만 댓글을 삭제할 수 있습니다');
        } else if (err.response && err.response.status === 401) {
          alert(err.response.data);
        } else {
          setCommentError('댓글을 삭제하는 도중 오류가 발생했습니다.');
        }
      });
  }, []);

  // 답글 생성
  const handleReplySubmit = useCallback(
    (commentId: number, replyContent: string) => {
      if (!replyContent) {
        alert('글을 작성해주세요!');

        return;
      }

      const newReply = {
        content: replyContent,
        User: { name: user.name },
        CommentId: commentId,
      };

      // 댓글에 대한 답글 추가 API 호출
      axios
        .post(`${backUrl}/api/posts/comments/${commentId}/replies`, newReply, {
          withCredentials: true,
        })
        .then((response) => {
          const addedReply = response.data;

          setReplies((prev) => [...prev, addedReply]);
          setReplyContent('');
        })
        .catch((error) => {
          if (error.response && error.response.status === 401) {
            alert(error.response.data);
          }
          console.error(error);
        });
    },
    [user.name],
  );

  // 답글 수정
  const handleReplyEdit = useCallback(
    (commentId: number, replyId: number, editedContent: string) => {
      if (!editedContent.trim()) {
        alert('글을 작성해주세요!');

        return;
      }

      axios
        .put(
          `${backUrl}/api/posts/comments/${commentId}/replies/${replyId}`,
          { content: editedContent },
          {
            withCredentials: true,
          },
        )
        .then((res) => {
          const editedReply = res.data;

          setReplies((prev) =>
            prev.map((reply) => {
              if (reply.id === replyId) {
                return editedReply;
              }

              return reply;
            }),
          );
        })
        .catch((err) => {
          if (err.response && err.response.status === 403) {
            alert('댓글 작성자만 수정할 수 있습니다.');
          } else if (err.response && err.response.status === 401) {
            alert(err.response.data);
          } else {
            console.log(err);
          }
        });
    },
    [],
  );

  // 답글 삭제
  const handleReplyDelete = useCallback((commentId: number, replyId: number) => {
    if (window.confirm('정말 삭제하시겠습니까?')) {
      axios
        .delete(`${backUrl}/api/posts/comments/${commentId}/replies/${replyId}`, {
          withCredentials: true,
        })
        .then(() => {
          setReplies((prev) => prev.filter((reply) => reply.id !== replyId));
        })
        .catch((err) => {
          if (err.response && err.response.status === 403) {
            alert('삭제 권한이 없습니다.');
          } else if (err.response && err.response.status === 401) {
            alert(err.response.data);
          } else {
            console.log(err);
          }
        });
    }
  }, []);

  //post 객체가 변경될 때마다 실행되며, post 객체가 존재하면 해당 게시물의 댓글들을 comments 상태로 업데이트 함
  // 따라서 이 코드는 게시물의 댓글들을 표시하기 위한 코드이다. post 객체가 변경될 때마다 댓글 목록이 업데이트 되기때문에, 댓글이 추가되거나 삭제될 때도 자동으로 반영된다.
  useEffect(() => {
    if (commentsData) {
      setComments(commentsData);
    }
    if (repliesData) {
      setReplies(repliesData);
    }
  }, [commentsData, repliesData]);

  return (
    <section className={`${styles.section} dark:bg-gray-800`}>
      <div className="max-w-4xl mx-auto px-4">
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
      </div>
    </section>
  );
};

export default CommentSection;
