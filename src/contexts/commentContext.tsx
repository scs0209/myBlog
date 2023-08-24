import { useUser } from 'apis/auth';
import { useCreateComment, useDeleteComment, useGetComment, useUpdateComment } from 'apis/comment';
import { useCreateReply, useDeleteReply, useGetReply, useUpdateReply } from 'apis/reply';
import { createContext, FC, ReactNode, useContext } from 'react';
import { useParams } from 'react-router';
import { Comment, Reply } from 'typings/db';

interface CommentContextValue {
  commentsData: Comment[];
  repliesData: Reply[];
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
  const { id } = useParams<{ id: string }>();
  const { data: user } = useUser();
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
      await createComment({ postId: id, content });
    },

    // 댓글 수정
    update: async (commentId: number, content: string) => {
      if (!content || !content.trim()) {
        alert('내용을 입력해주세요');

        return;
      }

      await updateComment({ commentId, content });
    },

    // 댓글 삭제
    delete: async (commentId: number) => {
      await deleteComment(commentId);
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

      await createReply({ commentId, newReply });
    },

    // 답글 수정
    update: async (commentId: number, replyId: number, editedContent: string) => {
      if (!editedContent.trim()) {
        alert('글을 작성해주세요!');

        return;
      }

      await updateReply({ commentId, replyId, content: editedContent });
    },

    // 답글 삭제
    delete: async (commentId: number, replyId: number) => {
      if (window.confirm('정말 삭제하시겠습니까?')) {
        await deleteReply({ commentId, replyId });
      }
    },
  };

  return (
    <CommentContext.Provider
      value={{
        commentsData,
        repliesData,
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
