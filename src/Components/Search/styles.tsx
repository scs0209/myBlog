import styled from "@emotion/styled";

export const SearchContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top;
`;

export const Form = styled.form`
  display: flex;
  margin-top: 1rem;
  align-items: center;
`;

export const Input = styled.input`
  padding: 0.25rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 0.25rem;
  margin-right: 0.5rem;

  &:focus{
    outline: none;
  }
`;

export const Button = styled.button`
  padding: 0.37rem 0.5rem;
  font-size: 0.7rem;
  font-weight: bold;
  background-color: black;
  color: #fff;
  border: none;
  border-radius: 0.25rem;
  cursor: pointer;

  &:hover {
    background-color: #6b6b84;
  }
`;