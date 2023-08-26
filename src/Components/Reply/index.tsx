import { useDeleteReply, useUpdateReply } from 'apis/reply';
import UserDropDown from 'Components/common/DropDown';
import React, { ChangeEvent, useCallback, useState, VFC } from 'react';
import useReplyStore from 'store/replyStore';
import { Reply as ReplyType } from 'typings/db';

import ReplyEdit from './ReplyEdit';

interface Props {
  reply: ReplyType;
}

const ReplyComp: VFC<Props> = ({ reply }) => {
  const { mutateAsync: updateReply } = useUpdateReply();
  const { mutateAsync: deleteReply } = useDeleteReply();
  const { isEditing, setIsEditing, handleEdit } = useReplyStore();
  const [editContent, setEditContent] = useState(reply.content);

  const handleEditSave = useCallback(() => {
    updateReply({ commentId: reply.CommentId, replyId: reply.id, content: editContent });
    setIsEditing(false);
  }, [updateReply, reply.CommentId, reply.id, editContent]);

  const handleContentChange = useCallback((e: ChangeEvent<HTMLTextAreaElement>) => {
    setEditContent(e.target.value);
  }, []);

  const handleDelete = useCallback(() => {
    deleteReply({ commentId: reply.CommentId, replyId: reply.id });
  }, [deleteReply, reply.CommentId, reply.id]);

  return (
    <>
      <UserDropDown
        username={reply.User.name}
        isEditing={isEditing}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      {isEditing ? (
        <ReplyEdit onSave={handleEditSave} value={editContent} onChange={handleContentChange} />
      ) : (
        <p className="mb-4 text-gray-500 dark:text-gray-400">{reply.content}</p>
      )}
    </>
  );
};

export default ReplyComp;
