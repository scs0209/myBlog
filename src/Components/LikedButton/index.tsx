import React, { VFC, memo } from "react";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";

interface Props {
  liked: boolean;
  onClick: () => void;
}

const LikeButton: VFC<Props> = ({ liked, onClick }) => {
  return (
    <button className="relative top-1 ml-1 cursor-pointer bg-transparent text-red-600" onClick={onClick}>
      {liked ? <AiFillHeart color="red" /> : <AiOutlineHeart />}{" "}
    </button>
  );
}

export default memo(LikeButton);