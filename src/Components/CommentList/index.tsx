import RepliesButton from "../../Components/RepliesButton";
import React, { ChangeEvent, memo, useCallback, useState, VFC } from "react";
import { Comment, Reply } from "../../typings/db";
import { CancelButton, Comments, CompleteButton, Container, Content, DeleteButton, EditButton, EditForm, EditInput, List, Name, Title } from "./styles";
import ReplyComp from "Components/Reply";

interface Props {
  comments: Comment[];
  replies: Reply[];
  onDelete: (commentId: number) => void;
  onEdit: (commentId: number, content: string) => void;
  onReply: (commentId: number, content: string) => void;
  onDeleteReply: (commentId: number, replyId: number) => void;
  onReplyEdit: (commentId: number, replyId: number, content: string) => void;
}

const CommentList: VFC<Props> = ({ comments, onDelete, onEdit, onReply, onReplyEdit, onDeleteReply, replies }) => {
  const [editId, setEditId] = useState<number | null>(null);
  const [editContent, setEditContent] = useState<string>("");
  const [replyId, setReplyId] = useState<number | null>(null);
  const [replyContent, setReplyContent] = useState<string>("");
  const [isRepliesVisible, setIsRepliesVisible] = useState<{[commentId: number]: boolean;}>({});

  const handleRepliesClick = useCallback((commentId: number) => {
    setIsRepliesVisible((prev) => {
      return {
        ...prev,
        [commentId]: !prev[commentId],
      };
    });
  }, []);

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
  }, []);


  
  const handleReplyClick = useCallback((commentId: number) => {
    setReplyId(commentId);
    setReplyContent("");
  }, []);

  const handleReplyCancel = useCallback(() => {
    setReplyId(null);
    setReplyContent("");
  }, []);

  const handleReplySubmit = useCallback(() => {
    if (replyId === null) {
      return;
    }

    onReply(replyId, replyContent);
    setReplyId(null);
    setReplyContent("");
  }, [replyId, replyContent, onReply]);

  const onChangeReplyContent = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setReplyContent(e.target.value);
    },
    []
  );

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
                  <CompleteButton onClick={handleEditSubmit}>
                    완료
                  </CompleteButton>
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
                <button onClick={() => handleReplyClick(comment?.id)}>
                  답글
                </button>
              </div>
            )}
            {replyId === comment?.id ? (
              <div>
                <input
                  type="text"
                  value={replyContent}
                  onChange={onChangeReplyContent}
                />
                <button onClick={handleReplySubmit}>완료</button>
                <button onClick={handleReplyCancel}>취소</button>
              </div>
            ) : null}
            <RepliesButton
              onClick={() => handleRepliesClick(comment?.id)}
              isRepliesVisible={isRepliesVisible[comment?.id!]}
            >
              ({replies?.filter((reply) => reply.CommentId === comment?.id).length})
            </RepliesButton>
            {isRepliesVisible[comment?.id!] &&
              replies
                ?.filter((reply) => reply.CommentId === comment?.id)
                .map((reply) => (
                  <ReplyComp 
                    key={reply.id}
                    reply={reply}
                    onEdit={onReplyEdit}
                    onDelete={onDeleteReply}
                  />
                ))}
          </Comments>
        ))}
      </List>
    </Container>
  );
}

export default memo(CommentList);