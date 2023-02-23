import React from "react";
import { Modals } from "./styles";

const Modal = (props: any) => {
	const i = props.selected
  return (
    <Modals className="modal">
      <h2>{props.posts[i].title}</h2>
      <p>{props.posts[i].date}</p>
      <p>Contents</p>
    </Modals>
  );
}

export default Modal;