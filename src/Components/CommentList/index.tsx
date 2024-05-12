/* eslint-disable */
import { RepliesVisibilityProvider } from 'contexts/repliesVisibilityContext';
import CommentItem from './CommentItem';
import { useParams } from 'react-router';
import { useGetComment } from 'apis/comment';
import { Comment } from 'typings/db';

const CommentList = () => {
  const { id } = useParams<{ id: string }>();
  const { data: commentsData } = useGetComment(id);

  return (
    <>
      {commentsData?.map((comment: Comment) => (
        <RepliesVisibilityProvider key={comment?.id} comment={comment}>
          <CommentItem />
        </RepliesVisibilityProvider>
      ))}
    </>
  );
};

export default CommentList;
