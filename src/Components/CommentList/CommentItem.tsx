/* eslint-disable */
import React, { useCallback, useState } from 'react';

import CommentEditForm from './CommentEditForm';
import { useRepliesVisibilityContext } from 'contexts/repliesVisibilityContext';
import ReplySection from 'Components/Reply/ReplySection';
import CommentContent from './CommentContent';
import useEditComment from 'hooks/PostDetail/useEditComment';
import UserDropDown from 'Components/common/DropDown';
import { useDeleteComment } from 'apis/comment';

const CommentItem = () => {
  const { mutateAsync: deleteComment } = useDeleteComment();
  const { comment } = useRepliesVisibilityContext();
  const {
    editId,
    editContent,
    handleEditCancel,
    handleEditSubmit,
    handleEditClick,
    onChangeEditContent,
  } = useEditComment();
  const [show, setShow] = useState(false);

  const handleDeleteClick = useCallback(
    (commentId: number) => {
      deleteComment(commentId);
    },
    [deleteComment],
  );

  const toggleShow = useCallback(() => {
    setShow((prev) => !prev);
  }, []);

  return (
    <>
      <article className="p-6 mb-6 text-base bg-white rounded-lg dark:bg-gray-900">
        <UserDropDown
          username={comment?.User?.name}
          isEditing={editId === comment?.id}
          onEdit={() => handleEditClick(comment?.id!, comment?.content!)}
          onDelete={() => handleDeleteClick(comment?.id)}
        />

        {editId === comment?.id ? (
          <CommentEditForm
            value={editContent}
            onChange={onChangeEditContent}
            onCancel={handleEditCancel}
            onSubmit={handleEditSubmit}
          />
        ) : (
          <CommentContent toggleShow={toggleShow} />
        )}
      </article>
      <ReplySection show={show} />
    </>
  );
};

export default CommentItem;
