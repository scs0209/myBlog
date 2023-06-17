import React, { FC } from "react";
import { Button } from "./styles";

interface Props {
  onClick: () => void;
  isRepliesVisible: boolean;
  children: React.ReactNode;
}


const RepliesButton:FC<Props> = ({ onClick, isRepliesVisible, children }) => {
  return (
    <button
      type="button"
      className="flex items-center text-sm text-gray-500 hover:underline dark:text-gray-400"
      onClick={onClick}
    >
      {isRepliesVisible ? `숨기기` : `보기`} {children}
    </button>
  );
};

export default RepliesButton;