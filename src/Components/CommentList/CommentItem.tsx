/* eslint-disable */
import { useState } from 'react';

import CommentEditForm from './CommentEditForm';
import { useRepliesVisibilityContext } from 'contexts/repliesVisibilityContext';
import ReplySection from 'Components/Reply/ReplySection';
import CommentContent from './CommentContent';
import UserDropDown from 'Components/common/DropDown';
import { useDeleteComment } from 'apis/comment';
import { useEditId, useCommentActions } from 'store/commentStore';

const CommentItem = () => {
  const { mutateAsync: deleteComment } = useDeleteComment();
  const { comment } = useRepliesVisibilityContext();
  const editId = useEditId();
  const { handleEditClick } = useCommentActions();
  const [show, setShow] = useState(false);

  const handleDeleteClick = (commentId: number) => {
    deleteComment(commentId);
  };

  const toggleShow = () => {
    setShow((prev) => !prev);
  };

  return (
    <>
      <article className="p-6 mb-6 text-base bg-white rounded-lg dark:bg-gray-900">
        <UserDropDown
          username={comment?.User?.name}
          isEditing={editId === comment?.id}
          onEdit={() => handleEditClick(comment?.id, comment?.content)}
          onDelete={() => handleDeleteClick(comment?.id)}
        />

        {editId === comment?.id ? <CommentEditForm /> : <CommentContent toggleShow={toggleShow} />}
      </article>
      <ReplySection show={show} />
    </>
  );
};

export default CommentItem;
