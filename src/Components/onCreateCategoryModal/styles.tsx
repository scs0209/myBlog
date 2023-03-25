import styled from "@emotion/styled";

export const Form = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Label = styled.label`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
  width: 100%
`;

export const Span = styled.span`
  margin-bottom: 5px;
  font-weight: bold;
  font-size: 15px;
`;

export const Input = styled.input`
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
  width: 100%;
`;

export const SubmitButton = styled.button`
  background-color: black;
  color: #fff;
  border: none;
  border-radius: 5px;
  padding: 10px;
  font-size: 16px;
  cursor: pointer;
  width: 100%;

  &:hover {
    background-color: gray;
  }
`;