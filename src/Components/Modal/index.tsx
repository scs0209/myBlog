import React, { FC, useCallback } from "react";
import { CloseButton, Content, ModalWrapper } from "./styles";

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
    <ModalWrapper show={show} onClick={onCloseModal}>
      <Content onClick={stopPropagation}>
        <CloseButton onClick={onCloseModal}>&times;</CloseButton>
        {children}
      </Content>
    </ModalWrapper>
  )
}

export default Modal;