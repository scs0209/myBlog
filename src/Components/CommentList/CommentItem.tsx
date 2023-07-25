/* eslint-disable */
import RepliesButton from 'Components/RepliesButton';
import { Dropdown } from 'flowbite-react';
import React, { useCallback, useState, VFC } from 'react';
import useInput from 'utils/useInput';

import { Comment } from '../../typings/db';
import CommentEditForm from './CommentEditForm';
import { useCommentContext } from 'contexts/commentContext';
import ReplyComp from 'Components/Reply';
import ReplyForm from 'Components/Reply/ReplyForm';

interface Props {
  comment: Comment;
}

const CommentItem: VFC<Props> = ({ comment }) => {
  const { replies, commentActions } = useCommentContext();
  const [isRepliesVisible, setIsRepliesVisible] = useState<{ [commentId: number]: boolean }>({});
  const [show, setShow] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [editContent, onChangeEditContent, setEditContent] = useInput('');

  const handleDeleteClick = useCallback(
    (commentId: number) => {
      commentActions.delete(commentId);
    },
    [commentActions],
  );

  const handleEditClick = useCallback((commentId: number, content: string) => {
    setEditId(commentId);
    setEditContent(content);
  }, []);

  const handleEditCancel = useCallback(() => {
    setEditId(null);
    setEditContent('');
  }, []);

  const handleEditSubmit = useCallback(() => {
    if (editId === null) {
      return;
    }

    commentActions.update(editId, editContent);
    setEditId(null);
    setEditContent('');
  }, [editId, editContent, commentActions]);

  const handleRepliesClick = useCallback((commentId: number) => {
    setIsRepliesVisible((prev) => {
      return {
        ...prev,
        [commentId]: !prev[commentId],
      };
    });
  }, []);

  const toggleShow = useCallback(() => {
    setShow((prev) => !prev);
  }, []);

  return (
    <>
      <article className="p-6 mb-6 ml-6 lg:ml-12 text-base bg-white rounded-lg dark:bg-gray-800 dark:text-white">
        {isRepliesVisible[comment?.id!] && (
          <>
            {replies
              ?.filter((reply) => reply.CommentId === comment?.id)
              .map((reply) => (
                <ReplyComp key={reply.id} reply={reply} />
              ))}
          </>
        )}
        {show && <ReplyForm comment={comment} />}
      </article>
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
          <>
            <p className="text-gray-500 dark:text-gray-400">{comment?.content}</p>
            <div className="flex items-center mt-4 space-x-4">
              <button
                type="button"
                onClick={toggleShow}
                className="flex items-center text-sm text-gray-500 hover:underline dark:text-gray-400"
              >
                <svg
                  aria-hidden="true"
                  className="mr-1 w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                  ></path>
                </svg>
                답글
              </button>
              <RepliesButton
                onClick={() => handleRepliesClick(comment?.id)}
                isRepliesVisible={isRepliesVisible[comment?.id!]}
              >
                {`(${replies?.filter((reply) => reply.CommentId === comment?.id).length})`}
              </RepliesButton>
            </div>
          </>
        )}
      </article>
    </>
  );
};

export default CommentItem;
