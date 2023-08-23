import { useUser } from 'apis/auth';
import { useCreateComment, useDeleteComment, useGetComment, useUpdateComment } from 'apis/comment';
import { useCreateReply, useDeleteReply, useGetReply, useUpdateReply } from 'apis/reply';
import { createContext, FC, ReactNode, useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Comment, Reply } from 'typings/db';

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
  const { data: user, isError } = useUser();
  const { data: commentsData } = useGetComment(id);
  const { data: repliesData } = useGetReply(id);
  const { mutateAsync: createComment } = useCreateComment();
  const { mutateAsync: updateComment } = useUpdateComment();
  const { mutateAsync: deleteComment } = useDeleteComment();
  const { mutateAsync: createReply } = useCreateReply();
  const { mutateAsync: updateReply } = useUpdateReply();
  const { mutateAsync: deleteReply } = useDeleteReply();

  const commentActions = {
    // 댓글 등록
    create: async (content: string) => {
      if (!content || !content.trim()) {
        alert('내용을 입력해주세요.');

        return;
      }
      const response = await createComment({ postId: id, content });
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
    },

    // 댓글 수정
    update: async (commentId: number, content: string) => {
      if (!content || !content.trim()) {
        alert('내용을 입력해주세요');

        return;
      }

      await updateComment({ commentId, content });

      setComments((prevComments) => {
        const newComments = [...prevComments];
        const commentIndex = newComments.findIndex((comment) => comment.id === commentId);

        newComments[commentIndex] = {
          ...newComments[commentIndex],
          content,
        };

        return newComments;
      });
    },

    // 댓글 삭제
    delete: async (commentId: number) => {
      await deleteComment(commentId);
      setComments((prevComments) => prevComments.filter((comment) => comment.id !== commentId));
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
      const addedReply = await createReply({ commentId, newReply });

      setReplies((prev) => [...prev, addedReply]);
    },

    // 답글 수정
    update: async (commentId: number, replyId: number, editedContent: string) => {
      if (!editedContent.trim()) {
        alert('글을 작성해주세요!');

        return;
      }

      const editedReply = await updateReply({ commentId, replyId, content: editedContent });

      setReplies((prev) =>
        prev.map((reply) => {
          if (reply.id === replyId) {
            return editedReply;
          }

          return reply;
        }),
      );
    },

    // 답글 삭제
    delete: async (commentId: number, replyId: number) => {
      if (window.confirm('정말 삭제하시겠습니까?')) {
        await deleteReply({ commentId, replyId });

        setReplies((prev) => prev.filter((reply) => reply.id !== replyId));
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
