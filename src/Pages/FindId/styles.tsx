import styled from "@emotion/styled"

export const FindIdContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 1rem;
`;

export const Label = styled.label`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
  fort-weight: bold;
`;

export const LabelContainer = styled.div`
  display: flex;
  margin-top: 1rem;
  color: black;
  flex-direction: flex-start;
`;

export const Name = styled.span`
  display: inline-block;
  width: 3rem;
  font-size: 0.9rem;
  font-weight: bold;
  margin-top: 0.5rem;
  text-align: left;
`;

export const Input = styled.input`
  padding: 0.5rem;
  border-radius: 0.25rem;
  border: 1px solid gray;
  margin-top: 0.25rem;
  margin-bottom: 0.5rem;
  width: 100%
`;

export const Button = styled.button`
  padding: 0.5rem;
  background-color: black;
  color: white;
  border: none;
  border-radius: 5px;
  width: 100%;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: gray;
  }
`;

export const Message = styled.div`
  margin-top: 1rem;
  color: red;
  font-size: 0.8rem;
  text-align: center;
`;

export const Email = styled.div`
  margin-top: 1rem;
  font-size: 0.8rem;
  text-align: center;
`;