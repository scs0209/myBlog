import styled from "@emotion/styled";

export const ModalWrapper = styled.div<{ show: boolean }>`
  display: ${({ show }) => (show ? "flex" : "none")};
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.5);
`;

export const Content = styled.div`
  width: 300px;
  background-color: white;
  border-radius: 5px;
  padding: 20px;
`;

export const CloseButton = styled.button`
  position: relative;
  top: -10px;
  right: -250px;
  font-size: 20px;
  font-weight: bold;
  border: none;
  background-color: transparent;
  cursor: pointer;

  &:hover{
    color: red;
  }
`;
