import styled from "@emotion/styled";

export const PostLi = styled.ul`
  list-style: none;
  padding-left: 10px;
  padding-right: 10px;
  .list_grid{
    display: grid;
    grid-template-columns: 33% 33% 33%;
  }
  .list_title{
    margin-bottom: 10px;
    color: darkgrey;
    border-bottom: 1px solid lightgrey;
  }
`;