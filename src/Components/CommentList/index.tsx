import RepliesButton from "../../Components/RepliesButton";
import React, { ChangeEvent, memo, useCallback, useState, VFC } from "react";
import { Comment, Reply } from "../../typings/db";
import { ButtonWrapper, CancelButton, Comments, CompleteButton, Container, Content, DeleteButton, EditButton, EditForm, EditInput, List, Name, ReplyButton, ReplyContainer, Textarea, Title } from "./styles";
import ReplyComp from "Components/Reply";
import useInput from "../../utils/useInput";

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
  const [replyContent, onChangeReplyContent, setReplyContent] = useInput<string>("");
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

  const handleReplyCancel = useCallback(() => {
    setReplyId(null);
    setReplyContent("");
  }, []);

  const handleReplySubmit = useCallback(
    (commentId: number | null) => {
      if (commentId === null) {
        return;
      }

      onReply(commentId, replyContent);
      setReplyId(null);
      setReplyContent("");
    },
    [replyContent, onReply]
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
            <ButtonWrapper>
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
              <RepliesButton
                onClick={() => handleRepliesClick(comment?.id)}
                isRepliesVisible={isRepliesVisible[comment?.id!]}
              >
                (
                {
                  replies?.filter((reply) => reply.CommentId === comment?.id)
                    .length
                }
                )
              </RepliesButton>
            </ButtonWrapper>
            {isRepliesVisible[comment?.id!] && (
              <ReplyContainer>
                {replies
                  ?.filter((reply) => reply.CommentId === comment?.id)
                  .map((reply) => (
                    <ReplyComp
                      key={reply.id}
                      reply={reply}
                      onEdit={onReplyEdit}
                      onDelete={onDeleteReply}
                    />
                  ))}
                <div style={{ display: "flex", width: "100%", marginBottom: "0.6rem" }}>
                  <Textarea
                    placeholder="댓글을 입력해주세요."
                    value={replyContent}
                    onChange={onChangeReplyContent}
                  />
                  <ReplyButton onClick={() => handleReplySubmit(comment?.id)}>
                    완료
                  </ReplyButton>
                  <ReplyButton onClick={handleReplyCancel}>취소</ReplyButton>
                </div>
              </ReplyContainer>
            )}
          </Comments>
        ))}
      </List>
    </Container>
  );
}

export default CommentList;