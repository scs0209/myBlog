import styled from "@emotion/styled";

export const SignUpWrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  margin-top: 1rem;
  height: 100%;
`;

export const SignUpForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 70%;
  padding: 2rem;
  border: 1px solid #ddd;
  border-radius: 5px;
  background-color: #fff;
`;

export const Label = styled.label`
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
`;

export const Name = styled.span`
  display: inline-block;
  width: 6rem;
  margin-bottom: 0.5rem;
  margin-right: 0.5rem;
  font-size: 0.9rem;
  font-weight: bold;
`;

export const Input = styled.input`
  flex: 1;
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 3px;
  font-size: 0.8rem;
`;

export const LabelDiv = styled.div`
  display: flex;
  margin-top: 0.5rem;
  color: black;
  font-size: 0.8rem;
  flex-direction: flex-start;
`;

export const Button = styled.button`
  margin-top: 1rem;
  padding: 0.5rem;
  background-color: #333;
  color: #fff;
  font-size: 0.9rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: gray;
  }
`;

export const Error = styled.div`
  margin-top: 0.5rem;
  color: red;
  font-size: 0.8rem;
`;

export const Success = styled.div`
  margin-top: 0.5rem;
  color: blue;
  font-size: 0.8rem;
`;

export const LinkWrapper = styled.div`
    margin-top: 1rem;
  text-align: center;

  a {
    color: #999;
    font-size: 0.8rem;
    text-decoration: none;
    transition: all 0.2s ease-in-out;

    &:hover {
      color: black;
    }
  }
`;