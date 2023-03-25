import styled from "@emotion/styled";

export const Input = styled.input`
  width: 91%;
  padding-top: 15px;
  padding-bottom: 15px;
  border: none;
  font-size: 22px;
  font-weight: bold;
  border-bottom: 1px solid lightgrey;

  &:focus {
    outline: none;
  }
`;

export const Textarea = styled.textarea`
  width: 91%;
  margin-top: 10px;
  color: black;
  border: 1px solid lightgrey;
  resize: none;

  &:focus {
    outline: none;
  }
`;