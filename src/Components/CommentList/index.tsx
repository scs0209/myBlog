import React, { useCallback, VFC } from "react";
import { Comment } from "../../typings/db";

interface Props {
  comments: Comment[];
  onDelete: (commentId: number) => void;
}

const CommentList: VFC<Props> = ({ comments, onDelete }) => {
  const handleDeleteClick = useCallback((commentId: number) => {
    onDelete(commentId);
  }, [onDelete]);

  return(
    <div>
      <h3>댓글 목록</h3>
      {comments?.map((comment) => (
        <div key={comment?.id}>
          <span>{comment?.content}</span>
          <button onClick={() => handleDeleteClick(comment?.id)}>삭제</button>
        </div>
      ))}
    </div>
  )
}

export default CommentList;