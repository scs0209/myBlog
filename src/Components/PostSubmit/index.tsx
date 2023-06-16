import React, { VFC } from "react";
import { PostDiv, SubmitButton } from "./styles";


const PostSubmit = () => {
  return (
    <div>
      <div className="text-center mt-3">
        <button
          className="w-32 p-2 rounded-lg cursor-pointer hover:bg-rose-400 hover:text-white"
          style={{ border: "solid 1px lightgray"}}
          type="submit"
        >
          포스트 등록
        </button>
      </div>
    </div>
  );
}

export default PostSubmit;