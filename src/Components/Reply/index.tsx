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
      <footer className="flex items-center justify-between mb-2">
        <p className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white">
          {reply.User.name}
        </p>
        <Dropdown size="xs" label="...">
          {!isEditing && (
            <>
              <Dropdown.Item>
                <button onClick={handleEdit}>수정</button>
              </Dropdown.Item>
              <Dropdown.Item>
                <button onClick={handleDelete}>삭제</button>
              </Dropdown.Item>
            </>
          )}
        </Dropdown>
      </footer>
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
