/* eslint-disable */
import React, { useCallback, useState } from 'react';

import CommentEditForm from './CommentEditForm';
import { useCommentContext } from 'contexts/commentContext';
import { useRepliesVisibilityContext } from 'contexts/repliesVisibilityContext';
import ReplySection from 'Components/Reply/ReplySection';
import CommentContent from './CommentContent';
import useEditComment from 'hooks/PostDetail/useEditComment';
import UserDropDown from 'Components/common/DropDown';

const CommentItem = () => {
  const { commentActions } = useCommentContext();
  const { comment } = useRepliesVisibilityContext();
  const {
    editId,
    editContent,
    handleEditCancel,
    handleEditSubmit,
    handleEditClick,
    onChangeEditContent,
  } = useEditComment(commentActions);
  const [show, setShow] = useState(false);

  const handleDeleteClick = useCallback(
    (commentId: number) => {
      commentActions.delete(commentId);
    },
    [commentActions],
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
