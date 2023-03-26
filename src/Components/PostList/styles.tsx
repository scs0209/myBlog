import styled from "@emotion/styled";
import Pagination from "react-js-pagination";

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

export const StyledPagination = styled(Pagination)`
  display: flex;
  justify-content: center;
  align-items: center;
  list-style: none;
  padding: 0;
  margin: 0;

  li {
    margin: 0 4px;
  }

  a {
    padding: 6px 12px;
    border-radius: 5px;
    background-color: #f2f2f2;
    color: #333;
    text-decoration: none;
  }

  a:focus {
    outline: none;
  }

  a:hover {
    background-color: #ddd;
  }

  & .active a {
    background-color: #007bff;
    color: #fff;
  }

  & .disabled a {
    background-color: #f2f2f2;
    color: #999;
    pointer-events: none;
  }
`;