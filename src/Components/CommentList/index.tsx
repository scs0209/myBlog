/* eslint-disable */
import { RepliesVisibilityProvider } from 'contexts/repliesVisibilityContext';
import CommentItem from './CommentItem';
import { useCommentContext } from 'contexts/commentContext';

const CommentList = () => {
  const { comments } = useCommentContext();

  return (
    <>
      {comments?.map((comment) => (
        <RepliesVisibilityProvider key={comment?.id} comment={comment}>
          <CommentItem />
        </RepliesVisibilityProvider>
      ))}
    </>
  );
};

export default CommentList;
