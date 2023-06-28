import React, { Dispatch, SetStateAction, VFC, memo, useCallback, useState } from "react"
import { Comment, Reply } from "../../typings/db";
import useInput from "utils/useInput";
import { Dropdown } from "flowbite-react";
import CommentEditForm from "./CommentEditForm";
import RepliesButton from "Components/RepliesButton";

interface Props {
  comment: Comment;
  replies: Reply[];
  onDelete: (commentId: number) => void;
  onEdit: (commentId: number, content: string) => void;
  onReply: (commentId: number, content: string) => void;
  onDeleteReply: (commentId: number, replyId: number) => void;
  onReplyEdit: (commentId: number, replyId: number, content: string) => void;
  isRepliesVisible: { [commentId: number]: boolean };
  setIsRepliesVisible: Dispatch<SetStateAction<{ [commentId: number]: boolean }>>;
  toggleShow: () => void;
}

const CommentItem:VFC<Props> = ({ comment, replies, onDelete, onEdit, toggleShow, isRepliesVisible, setIsRepliesVisible }) => {
  const [editId, setEditId] = useState<number | null>(null);
  const [editContent, onChangeEditContent, setEditContent] = useInput("");

  const handleDeleteClick = useCallback(
    (commentId: number) => {
      onDelete(commentId);
    },
    [onDelete]
  );

  const handleEditClick = useCallback((commentId: number, content: string) => {
    setEditId(commentId);
    setEditContent(content);
  }, []);

  const handleEditCancel = useCallback(() => {
    setEditId(null);
    setEditContent("");
  }, []);

  const handleEditSubmit = useCallback(() => {
    if (editId === null) {
      return;
    }

    onEdit(editId, editContent);
    setEditId(null);
    setEditContent("");
  }, [editId, editContent, onEdit]);

  const handleRepliesClick = useCallback((commentId: number) => {
    setIsRepliesVisible((prev) => {
      return {
        ...prev,
        [commentId]: !prev[commentId],
      };
    });
  }, []);

  return (
    <article className="p-6 mb-6 text-base bg-white rounded-lg dark:bg-gray-900">
      <footer className="flex justify-between items-center mb-2">
        <p className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white">
          {comment?.User?.name}
        </p>
        <Dropdown size="xs" label="..." style={{ backgroundColor: " #2d3748" }}>
          {editId === comment?.id ? null : (
            <>
              <Dropdown.Item>
                <button
                  onClick={() =>
                    handleEditClick(comment?.id!, comment?.content!)
                  }
                >
                  수정
                </button>
              </Dropdown.Item>
              <Dropdown.Item>
                <button onClick={() => handleDeleteClick(comment?.id)}>
                  삭제
                </button>
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
              {`(${
                replies?.filter((reply) => reply.CommentId === comment?.id)
                  .length
              })`}
            </RepliesButton>
          </div>
        </>
      )}
    </article>
  );

}

export default memo(CommentItem)