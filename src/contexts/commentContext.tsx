import { useGetComment } from 'apis/comment';
import { useGetReply } from 'apis/reply';
import { createContext, FC, ReactNode, useContext } from 'react';
import { useParams } from 'react-router';
import { Comment, Reply } from 'typings/db';

interface CommentContextValue {
  commentsData: Comment[];
  repliesData: Reply[];
}

interface Props {
  children: ReactNode;
}

const CommentContext = createContext<CommentContextValue | undefined>(undefined);

export const CommentProvider: FC<Props> = ({ children }) => {
  const { id } = useParams<{ id: string }>();
  const { data: commentsData } = useGetComment(id);
  const { data: repliesData } = useGetReply(id);

  console.log(id);

  return (
    <CommentContext.Provider
      value={{
        commentsData,
        repliesData,
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
