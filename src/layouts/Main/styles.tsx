import styled from "@emotion/styled";
import { Link } from "react-router-dom";

export const Header = styled.nav`
  background: black;
  width: 100%;
  display: flex;
  color: white;
  padding: 20px;
  justify-content: space-between;
  align-items: center;
  padding-left: 30px;
`;

export const MainContainer = styled.div`
  display: grid;
  grid-template-columns: 19% 62% 19%;
  grid-template-rows: 100fr;
  text-align: center;
  margin-top: 1rem;
  grid: 1;
  .left-side {
    border-right: 1px solid black;
    border-top: 3px solid black;
    border-bottom: 3px solid black;
    border-radius: 10px;
    box-shadow: 5px 0px 5px rgba(0, 0, 0, 0.2);
  }
  .right-side {
    border-left: 1px solid black;
    border-top: 3px solid black;
    border-bottom: 3px solid black;
    border-radius: 10px;
    box-shadow: -5px 0px 5px rgba(0, 0, 0, 0.2);
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
  display: flex;
  align-items: center;
`;

export const Logo = styled.img`
  width: 60px;
  height: 60px;
  margin-right: 0.5rem;
`;

export const StyledLink = styled(Link)`
  padding: 1rem 1rem;
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

export const CreateCategoryButton = styled.button`
  margin-bottom: 0.5rem;
  padding: 0.1rem 2rem 0.1rem 2rem;
  border: none;
  color: white;
  background-color: black;
  border-radius: 5px;
  font-weight: bold;

  &:hover {
    background-color: gray;
  }
`;

export const Footer = styled.div`
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  margin: 2rem 0;
`;