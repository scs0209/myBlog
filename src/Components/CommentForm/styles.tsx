import styled from "@emotion/styled";

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 1rem;
`;

export const Textarea = styled.textarea`
  width: 90%;
  height: 3rem;
  margin-bottom: 0.5rem;
  padding: 0.5rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 0.25rem;
  resize: none;

  &:focus {
    outline: none;
  }
`;

export const Button = styled.button`
  margin-top: 0.5rem;
  padding: 0.5rem 1rem;
  background-color: black;
  color: white;
  font-size: 1rem;
  border: none;
  border-radius: 0.25rem;
  cursor: pointer;

  &:hover {
    background-color: gray;
    border: none;
  }
`;