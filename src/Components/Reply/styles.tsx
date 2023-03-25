import styled from "@emotion/styled";

export const ReplyContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
`;

export const ReplyHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 0.5rem;
`;

export const Name = styled.span`
  margin-right: 0.5rem;
  font-size: 12px;
`;

export const Content = styled.span`
  font-size: 12px;
  margin-right: 0.5rem;
  color: black;
`;

export const EditButton = styled.button`
  min-height: 1.5rem;
  max-height: 1.5rem;
  min-width: 1.5rem;
  max-width: 1.5rem;
  background-color: transparent;
  color: gray;
  border: none;
  border-radius: 5px;;
  :hover {
    background-color: whitesmoke;
  }
`;

export const DeleteButton = styled.button`
  min-height: 1.5rem;
  max-height: 1.5rem;
  min-width: 1.5rem;
  max-width: 1.5rem;
  background-color: transparent;
  color: gray;
  border: none;
  border-radius: 5px;;
  :hover {
    background-color: whitesmoke;
  }
`;
