import ReplyEdit from "../../Components/ReplyEdit";
import React, { ChangeEvent, useCallback, useState, VFC } from "react";
import { Reply as ReplyType } from "typings/db";

interface Props{
  reply: ReplyType;
  onEdit: (commentId: number, replyId: number, content: string) => void
  onDelete: (commentId: number, replyId: number) => void
}

const ReplyComp: VFC<Props> = ({ reply, onEdit, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState(reply.content);

  const handleEdit = useCallback(() => {
    setIsEditing(true);
  }, []);

  const handleEditCancel = useCallback(() => {
    setIsEditing(false);
  }, []);

  const handleEditSave = useCallback(() => {
    onEdit(reply.CommentId, reply.id, editContent);
    setIsEditing(false);
  }, [onEdit, reply.id, editContent]);

  const handleContentChange = useCallback((e: ChangeEvent<HTMLTextAreaElement>) => {
    setEditContent(e.target.value);
  }, []);

  const handleDelete = useCallback(() => {
    onDelete(reply.CommentId, reply.id);
  }, [onDelete, reply])

  return(
    <div>
      <div>
        <span>{reply.User.name}</span>
        <span>{reply.content}</span>
        {!isEditing && (
          <div>
            <button onClick={handleEdit}>수정</button>
            <button onClick={handleDelete}>삭제</button>
          </div>
        )}
      </div>
      {isEditing && (
        <ReplyEdit
          onCancel={handleEditCancel}
          onSave={handleEditSave}
          value={editContent}
          onChange={handleContentChange}
        />
      )}
    </div>
  )
}

export default ReplyComp;