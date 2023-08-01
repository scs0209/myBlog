import UserDropDown from 'Components/common/DropDown';
import { useCommentContext } from 'contexts/commentContext';
import { Dropdown } from 'flowbite-react';
import React, { ChangeEvent, useCallback, useState, VFC } from 'react';
import { Reply as ReplyType } from 'typings/db';

import ReplyEdit from './ReplyEdit';

interface Props {
  reply: ReplyType;
}

const ReplyComp: VFC<Props> = ({ reply }) => {
  const { replyActions } = useCommentContext();
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState(reply.content);

  const handleEdit = useCallback(() => {
    setIsEditing(true);
  }, []);

  const handleEditCancel = useCallback(() => {
    setIsEditing(false);
  }, []);

  const handleEditSave = useCallback(() => {
    replyActions.update(reply.CommentId, reply.id, editContent);
    setIsEditing(false);
  }, [replyActions, reply.id, editContent]);

  const handleContentChange = useCallback((e: ChangeEvent<HTMLTextAreaElement>) => {
    setEditContent(e.target.value);
  }, []);

  const handleDelete = useCallback(() => {
    replyActions.delete(reply.CommentId, reply.id);
  }, [replyActions, reply]);

  return (
    <>
      <UserDropDown
        username={reply.User.name}
        isEditing={isEditing}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <p className="text-gray-500 dark:text-gray-400 mb-4">{reply.content}</p>
      {isEditing && (
        <ReplyEdit
          onCancel={handleEditCancel}
          onSave={handleEditSave}
          value={editContent}
          onChange={handleContentChange}
        />
      )}
    </>
  );
};

export default ReplyComp;
