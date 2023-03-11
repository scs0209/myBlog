import React, { FC, useCallback } from "react";
import useInput from "../../utils/useInput";

interface Props{
  children: React.ReactNode;
  show: boolean;
  onCloseModal: (e: any) => void;
}

const Modal: FC<Props> = ({ children, show, onCloseModal }) => {
  const stopPropagation = useCallback((e: any) => {
    e.stopPropagation();
  }, []);

  if(!show){
    return null;
  }

  return(
    <div onClick={onCloseModal}>
      <div onClick={stopPropagation}>
        <button onClick={onCloseModal}>&time;</button>
        {children}
      </div>
    </div>
  )
}

export default Modal;