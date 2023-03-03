import React, { useEffect, useRef } from "react";
import { Input, Textarea } from "./styles";
import autosize from 'autosize'

const Post = () => {
  const textareaRef = useRef(null);

  useEffect(() => {
    if(textareaRef.current){
      autosize(textareaRef.current);
    }   
  });

  return(
    <div>
      <div>
        <Input type="text" placeholder="제목" />
      </div>
      <div>
        <Textarea 
          placeholder="내용을 입력하세요"
          ref={textareaRef}
        ></Textarea>
      </div>
    </div>
  )
}

export default Post;