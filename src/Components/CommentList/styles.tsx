import styled from "@emotion/styled";

export const Container = styled.div`
  margin-top: 1rem;
  padding: 1rem;
  border: 1px solid #ddd;
`;

export const Title = styled.h3`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 10px;
  border-bottom: 1px solid lightgray;
`;

export const List = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  border: 1px solid #ddd;
`;

export const Comments = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  margin: 0.5rem 0 0 1rem;
  font-size: 15px;
  color: gray;
`;

export const CommentActions = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const Content = styled.span`
  flex-basis: 70%;
  margin-left: 1rem;
`;

export const Name = styled.span`
  font-weight: bold;
  margin-right: 5px;
  flex-basis: 30%
  min-width: 50px;
`;

export const EditForm = styled.form`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-top: 1rem;
`;

export const EditInput = styled.input`
  position: relative;
  top: -10px;
  margin-top: 0.5rem;
  padding: 0.5rem;
  border: 1px solid gray;
  border-radius: 0.25rem;
  font-size: 1rem;
  width: 80%;
  min-width: 395px;
  max-width: 395px;
  height: 30px;
  &:focus {
    outline: none;
    border: 1px solid #3f51b5;
    box-shadow: 0 0 0 2px rgba(63, 81, 181, 0.2);
  }
`;

export const EditButton = styled.button`
  color: gray;
  min-width: 35px;
  min-height: 20px;
  margin-left: 0.5rem;
  font-size: 8px;
  border: none;
  border-radius: 5px;
  padding: 5px 5px;
  background-color: transparent;
  cursor: pointer;

  &:hover {

    text-decoration: underline;
  }
`;

export const DeleteButton = styled.button`
  color: gray;
  min-width: 35px;
  min-height: 20px;
  margin-left: 0.1rem;
  background-color: transparent;
  border: none;
  border-left: 1px solid lightgray;
  border-right: 1px solid lightgray;
  font-size: 8px;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

export const CompleteButton = styled.button`
  position: relative;
  top: -6px;
  color: #fff;
  min-width: 35px;
  min-height: 20px;
  background-color: black;
  border: none;
  border-radius: 5px;
  padding: 5px 5px;
  font-size: 12px;
  margin-left: 31px;
  cursor: pointer;

  &:hover {
    background-color: gray;
    border-color: #bd2130;
    text-decoration: underline;
  }
`;

export const ReplyButton = styled.button`
  color: gray;
  min-width: 35px;
  min-height: 20px;
  margin-left: 0.1rem;
  margin-top: 0.5rem;
  background-color: transparent;
  border: none;
  border-radius: 5px;
  padding: 5px 5px;
  font-size: 8px;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;


export const CancelButton = styled.button`
  position: relative;
  top: -6px;
  color: #fff;
  min-width: 35px;
  min-height: 20px;
  background-color: black;
  border: none;
  border-radius: 5px;
  padding: 5px 5px;
  font-size: 12px;
  margin-left: 5px;
  cursor: pointer;

  &:hover {
    background-color: gray;
    border-color: #bd2130;
    text-decoration: underline;
  }
`;

export const ButtonWrapper = styled.div`
  display: flex;
`;

