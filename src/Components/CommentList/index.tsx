import React, { ChangeEvent, memo, useCallback, useState, VFC } from "react";
import { Comment } from "../../typings/db";
import { CancelButton, Comments, CompleteButton, Container, Content, DeleteButton, EditButton, EditForm, EditInput, List, Name, Title } from "./styles";

interface Props {
  comments: Comment[];
  onDelete: (commentId: number) => void;
  onEdit: (commentId: number, content: string) => void;
}

const CommentList: VFC<Props> = ({ comments, onDelete, onEdit }) => {
  const [editId, setEditId] = useState<number | null>(null);
  const [editContent, setEditContent] = useState<string>("");


  const handleDeleteClick = useCallback((commentId: number) => {
    onDelete(commentId);
  }, [onDelete]);

  const handleEditClick = useCallback((commentId: number, content: string) => {
    setEditId(commentId);
    setEditContent(content);
  }, []);

  const handleEditCancel = useCallback(() => {
    setEditId(null);
    setEditContent("");
  }, []);

  const handleEditSubmit = useCallback(() => {
    if(editId === null){
      return;
    }
    
    onEdit(editId, editContent);
    setEditId(null);
    setEditContent("");
  }, [editId, editContent, onEdit]);

  const onChangeEditContent = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setEditContent(e.target.value);
  }, [])

  return (
    <Container>
      <Title>댓글</Title>
      <List>
        {comments?.map((comment) => (
          <Comments key={comment?.id}>
            <div>
              <Name>{comment?.User?.name}</Name>
              {editId === comment?.id ? (
                <EditForm>
                  <EditInput
                    type="text"
                    value={editContent}
                    onChange={onChangeEditContent}
                  />
                  <CompleteButton onClick={handleEditSubmit}>완료</CompleteButton>
                  <CancelButton onClick={handleEditCancel}>취소</CancelButton>
                </EditForm>
              ) : (
                <Content>{comment?.content}</Content>
              )}
            </div>
            {editId === comment?.id ? null : (
              <div>
                <EditButton
                  onClick={() =>
                    handleEditClick(comment?.id!, comment?.content!)
                  }
                >
                  수정
                </EditButton>
                <DeleteButton onClick={() => handleDeleteClick(comment?.id)}>
                  삭제
                </DeleteButton>
              </div>
            )}
          </Comments>
        ))}
      </List>
    </Container>
  );
}

export default memo(CommentList);