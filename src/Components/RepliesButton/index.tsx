import React, { FC } from "react";
import { Button } from "./styles";

interface Props {
  onClick: () => void;
  isRepliesVisible: boolean;
  children: React.ReactNode;
}


const RepliesButton:FC<Props> = ({ onClick, isRepliesVisible, children }) => {
  return (
    <Button onClick={onClick}>
      {isRepliesVisible ? `숨기기` : `보기`} {children}
    </Button>
  );
};

export default RepliesButton;