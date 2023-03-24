import styled from "@emotion/styled";
import { Link } from "react-router-dom";

export const Header = styled.nav`
  background: black;
  width: 100%;
  display: flex;
  color: white;
  padding: 20px;
  justify-content: space-between;
  padding-left: 30px;
`;

export const MainContainer = styled.div`
  display: grid;
  grid-template-columns: 19% 62% 19%;
  grid-template-rows: 100fr;
  text-align: center;
  grid: 1;
  .left-side {
    border-right: 1px solid black;
  }
  .right-side {
    border-left: 1px solid black;
  }
`;

export const Button = styled.button`
  background-color: white;
  color: black;
  border: none;
  border-radius: 3px;
  margin-left: 0.5rem;
  
  :hover{
    background-color: gray;
    color: white;
  }
`;

export const HomeLink = styled(Link)`
  font-size: 1.5rem;
  font-weight: bold;
  color: white;
  text-decoration: none;
  border-bottom: 2px solid black;
  padding-bottom: 0.25rem;
`;

export const StyledLink = styled(Link)`
  padding: 0.5rem 1rem;
  border-radius: 5px;
  background-color: #474544;
  color: white;
  font-size: 1rem;
  text-decoration: none;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #6B6B84;
  }
`;