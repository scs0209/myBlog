import styled from "@emotion/styled";

export const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
`;

export const Label = styled.label`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

export const Name = styled.span`
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
  font-weight: bold;
`;

export const Input = styled.input`
  padding: 0.5rem;
  border-radius: 0.25rem;
  border: 1px solid gray;
  margin-top: 0.25rem;
  margin-bottom: 0.5rem;
  width: 100%;
`;

export const Error = styled.div`
  margin-top: 0.5rem;
  color: red;
  font-size: 0.8rem;
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

export const Links = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 1rem;

  & > a {
    margin-top: 0.5rem;
    text-decoration: none;
    color: #999;
    font-size: 0.8rem;
  }

  & > a:hover {
    color: black;
  }
`;

export const Paragraph = styled.p`
  margin-top: 1rem;
  text-align: center;
  font-size: 0.8rem;
  & > a {
    margin-top: 0.5rem;
    text-decoration: none;
    color: #999;
    font-size: 0.8rem;
  }

  & > a:hover {
    color: black;
  }
`;