/* eslint-disable */
import { RepliesVisibilityProvider } from 'contexts/repliesVisibilityContext';
import CommentItem from './CommentItem';
import { useCommentContext } from 'contexts/commentContext';

const CommentList = () => {
  const { commentsData } = useCommentContext();

  return (
    <>
      {commentsData?.map((comment) => (
        <RepliesVisibilityProvider key={comment?.id} comment={comment}>
          <CommentItem />
        </RepliesVisibilityProvider>
      ))}
    </>
  );
};

export default CommentList;
