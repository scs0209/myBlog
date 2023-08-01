/* eslint-disable */
import { Dropdown } from 'flowbite-react';
import React, { useCallback, useState } from 'react';

import CommentEditForm from './CommentEditForm';
import { useCommentContext } from 'contexts/commentContext';
import { useRepliesVisibilityContext } from 'contexts/repliesVisibilityContext';
import ReplySection from 'Components/Reply/ReplySection';
import CommentContent from './CommentContent';
import useEditComment from 'hooks/PostDetail/useEditComment';

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
        <footer className="flex justify-between items-center mb-2">
          <p className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white">
            {comment?.User?.name}
          </p>
          <Dropdown size="xs" label="..." style={{ backgroundColor: ' #2d3748' }}>
            {editId === comment?.id ? null : (
              <>
                <Dropdown.Item>
                  <button onClick={() => handleEditClick(comment?.id!, comment?.content!)}>
                    수정
                  </button>
                </Dropdown.Item>
                <Dropdown.Item>
                  <button onClick={() => handleDeleteClick(comment?.id)}>삭제</button>
                </Dropdown.Item>
              </>
            )}
          </Dropdown>
        </footer>

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
