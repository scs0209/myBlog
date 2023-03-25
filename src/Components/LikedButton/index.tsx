import React, { VFC } from "react";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { Button } from "./styles";

interface Props {
  likeCount: number;
  liked: boolean;
  onClick: () => void;
}

const LikeButton: VFC<Props> = ({ likeCount, liked, onClick }) => {
  return (
    <Button onClick={onClick}>
      {liked ? <AiFillHeart color="red" /> : <AiOutlineHeart />}{" "}
    </Button>
  );
}

export default LikeButton;