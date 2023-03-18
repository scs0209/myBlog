import ReplyEdit from "../../Components/ReplyEdit";
import React, { ChangeEvent, useCallback, useState, VFC } from "react";
import { Reply as ReplyType } from "typings/db";
import { Content, DeleteButton, EditButton, Name } from "./styles";

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
        <Name>{reply.User.name}</Name>
        <Content>{reply.content}</Content>
        {!isEditing && (
          <span>
            <EditButton onClick={handleEdit}>✏</EditButton>
            <DeleteButton onClick={handleDelete}>🗑</DeleteButton>
          </span>
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