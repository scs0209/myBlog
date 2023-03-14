import styled from "@emotion/styled";

export const Container = styled.div`
  margin-top: 20px;
`;

export const Title = styled.h3`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 10px;
`;

export const List = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Comments = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  font-size: 15px;
  color: gray;
`;

export const Content = styled.span`
  flex: 1;
`;

export const DeleteButton = styled.button`
  margin-right: 5px;
  color: #fff;
  background-color: black;
  border: none;
  border-radius: 5px;
  padding: 5px 5px;
  font-size: 12px;
  cursor: pointer;

  &:hover {
    background-color: gray;
    border-color: #bd2130;
  }
`;

export const Name = styled.span`
  margin-left: 5px;
`
