import React, { VFC } from "react";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";

interface Props {
  likeCount: number;
  liked: boolean;
  onClick: () => void;
}

const LikeButton: VFC<Props> = ({ likeCount, liked, onClick }) => {
  return (
    <button onClick={onClick}>
      {liked ? <AiFillHeart color="red" /> : <AiOutlineHeart />}{" "}
    </button>
  );
}

export default LikeButton;