import styled from "@emotion/styled";
import { Link } from "react-router-dom";

export const CategoryWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const HeaderLink = styled(Link)`
  color: black;
  text-decoration: none;

  &:hover {
    color: gray;
  }
`;

export const Border = styled.div`
  border-top: 1px solid gray;
  margin-top: 1rem;
  width: 100%;
`;

export const CategoryLi = styled.ul`
  list-style: none;
  padding: 0;
  margin-bottom: 10px;
`;

export const List = styled.li`
  display: flex;
  align-items: center;
  margin-bottom: 0.5rem;
`;

export const StyledLink = styled(Link)`
  color: black;
  text-decoration: none;
  font-weight: bold;

  &:hover {
    color: gray;
  }
`;

export const ModeButton = styled.button`
  color: white;
  background-color: black;
  border: none;
  border-radius: 5px;
  font-weight: bold;
  padding: 5px 10px 5px 10px;
`;

export const EditButton = styled.button`
  text-align: right;
  background-color: transparent;
  border: none;
  cursor: pointer;
  font-size: 0.25rem;

  &:hover{
    color: blue;
  }
`

export const Button = styled.button`
  text-align: right;
  background-color: transparent;
  border: none;
  cursor: pointer;

  &:hover{
    color: red;
  }
`;