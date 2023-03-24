import styled from "@emotion/styled";

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
`