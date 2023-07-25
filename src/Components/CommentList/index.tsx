/* eslint-disable */
import { RepliesProvider } from 'contexts/repliesContext';
import CommentItem from './CommentItem';
import { useCommentContext } from 'contexts/commentContext';

const CommentList = () => {
  const { comments } = useCommentContext();

  return (
    <>
      <RepliesProvider>
        {comments?.map((comment) => (
          <div key={comment?.id}>
            <CommentItem comment={comment} />
          </div>
        ))}
      </RepliesProvider>
    </>
  );
};

export default CommentList;
