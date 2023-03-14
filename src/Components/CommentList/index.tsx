import React, { memo, useCallback, VFC } from "react";
import { Comment } from "../../typings/db";
import { Comments, Container, Content, DeleteButton, List, Name, Title } from "./styles";

interface Props {
  comments: Comment[];
  onDelete: (commentId: number) => void;
}

const CommentList: VFC<Props> = ({ comments, onDelete }) => {
  const handleDeleteClick = useCallback((commentId: number) => {
    onDelete(commentId);
  }, [onDelete]);

  return (
    <Container>
      <Title>댓글</Title>
      <List>
        {comments?.map((comment) => (
          <Comments key={comment?.id}>
            <Name>{comment?.User?.name}</Name>
            <Content>{comment?.content}</Content>
            <DeleteButton onClick={() => handleDeleteClick(comment?.id)}>삭제</DeleteButton>
          </Comments>
        ))}
      </List>
    </Container>
  );
}

export default memo(CommentList);