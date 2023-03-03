import React from "react";
import { PostDiv, SubmitButton } from "./styles";

const PostSubmit = () => {
  return(
    <div>
      <PostDiv className="post_submit">
        <SubmitButton type="submit">포스트 등록</SubmitButton>
      </PostDiv>
    </div>
  )
}

export default PostSubmit;