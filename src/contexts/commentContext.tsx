import { createComment, deleteComment, updateComment } from 'apis/comment';
import { createReply, deleteReply, updateReply } from 'apis/reply';
import { backUrl } from 'config';
import { createContext, FC, ReactNode, useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import useSWR from 'swr';
import { Comment, Reply } from 'typings/db';
import fetcher from 'utils/fetcher';

interface CommentContextValue {
  comments: Comment[];
  setComments: React.Dispatch<React.SetStateAction<Comment[]>>;
  replies: Reply[];
  setReplies: React.Dispatch<React.SetStateAction<Reply[]>>;
  newComment: string;
  setNewComment: React.Dispatch<React.SetStateAction<string>>;
  commentActions: {
    create: (content: string) => Promise<void>;
    update: (commentId: number, content: string) => Promise<void>;
    delete: (commentId: number) => Promise<void>;
  };
  replyActions: {
    create: (commentId: number, content: string) => Promise<void>;
    update: (commentId: number, replyId: number, content: string) => Promise<void>;
    delete: (commentId: number, replyId: number) => Promise<void>;
  };
}

interface Props {
  children: ReactNode;
}

const CommentContext = createContext<CommentContextValue | undefined>(undefined);

export const CommentProvider: FC<Props> = ({ children }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [replies, setReplies] = useState<Reply[]>([]);
  const [newComment, setNewComment] = useState('');
  const { id } = useParams<{ id: string }>();
  const { data: user } = useSWR(`${backUrl}/api/users`, fetcher);
  const { data: commentsData } = useSWR(`${backUrl}/api/posts/${id}/comments`, fetcher);
  const { data: repliesData } = useSWR(`${backUrl}/api/posts/${id}/replies`, fetcher);

  const commentActions = {
    // 댓글 등록
    create: async (content: string) => {
      if (!content || !content.trim()) {
        alert('내용을 입력해주세요.');

        return;
      }

      try {
        const response = await createComment(id, content);
        const newComment = {
          id: response.id,
          content,
          User: { id: response.User.id, name: response.User.name },
        };

        setComments((prevComments) => {
          if (!Array.isArray(prevComments)) {
            console.warn('prevComments is not an array:', prevComments);

            return [newComment];
          }

          return [...prevComments, newComment];
        });

        mutateComments();
      } catch (error: any) {
        alert(error.response.data);
        console.error(error);
      }
    },

    // 댓글 수정
    update: async (commentId: number, content: string) => {
      if (!content || !content.trim()) {
        alert('내용을 입력해주세요');

        return;
      }

      try {
        const response = await updateComment(commentId, content);

        setComments((prevComments) => {
          const newComments = [...prevComments];
          const commentIndex = newComments.findIndex((comment) => comment.id === commentId);

          newComments[commentIndex] = {
            ...newComments[commentIndex],
            content,
          };

          return newComments;
        });
      } catch (error: any) {
        alert(error.response.data);
        console.error(error);
      }
    },

    // 댓글 삭제
    delete: async (commentId: number) => {
      try {
        await deleteComment(commentId);
        setComments((prevComments) => prevComments.filter((comment) => comment.id !== commentId));
      } catch (error: any) {
        alert(error.response.data);
        console.error(error);
      }
    },
  };

  const replyActions = {
    // 답글 생성
    create: async (commentId: number, replyContent: string) => {
      if (!replyContent) {
        alert('글을 작성해주세요!');

        return;
      }

      const newReply = {
        content: replyContent,
        User: { name: user.name },
        CommentId: commentId,
      };

      try {
        const addedReply = await createReply(commentId, newReply);

        setReplies((prev) => [...prev, addedReply]);
      } catch (error: any) {
        alert(error.response.data);
        console.error(error);
      }
    },

    // 답글 수정
    update: async (commentId: number, replyId: number, editedContent: string) => {
      if (!editedContent.trim()) {
        alert('글을 작성해주세요!');

        return;
      }

      try {
        const editedReply = await updateReply(commentId, replyId, editedContent);

        setReplies((prev) =>
          prev.map((reply) => {
            if (reply.id === replyId) {
              return editedReply;
            }

            return reply;
          }),
        );
      } catch (error: any) {
        alert(error.response.data);
        console.log(error);
      }
    },

    // 답글 삭제
    delete: async (commentId: number, replyId: number) => {
      if (window.confirm('정말 삭제하시겠습니까?')) {
        try {
          await deleteReply(commentId, replyId);

          setReplies((prev) => prev.filter((reply) => reply.id !== replyId));
        } catch (error: any) {
          alert(error.response.data);
          console.log(error);
        }
      }
    },
  };

  useEffect(() => {
    if (commentsData) {
      setComments(commentsData);
    }
  }, [commentsData]);

  useEffect(() => {
    if (repliesData) {
      setReplies(repliesData);
    }
  }, [repliesData]);

  return (
    <CommentContext.Provider
      value={{
        comments,
        setComments,
        replies,
        setReplies,
        newComment,
        setNewComment,
        commentActions,
        replyActions,
      }}
    >
      {children}
    </CommentContext.Provider>
  );
};

export const useCommentContext = () => {
  const context = useContext(CommentContext);

  if (!context) {
    throw new Error('useCommentContext must be used within a CommentProvider');
  }

  return context;
};

function mutateComments() {
  throw new Error('Function not implemented.');
}
