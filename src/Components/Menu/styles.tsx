import styled from "@emotion/styled";

export const CreateMenu = styled.div`
  position: absolute;
  top: 70px;
  right: 0px;
  z-index: 10;
  width: 120px;
  background-color: #ffffff;
  border-radius: 5px;
  box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.3);
`;

export const CloseModalButton = styled.button`
  position: absolute;
  top: 5px;
  right: 10px;
  width: 20px;
  height: 20px;
  font-size: 15px;
  font-weight: bold;
  line-height: 1;
  color: #ffffff;
  background-color: #343a40;
  border: none;
  border-radius: 50%;
  cursor: pointer;

  &:hover {
    background-color: #868e96;
  }
`;
