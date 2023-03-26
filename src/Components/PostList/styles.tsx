import styled from "@emotion/styled";

export const ListContainer = styled.div`
  font-family: "Noto Sans KR", sans-serif;

  h2 {
    font-size: 32px;
    margin-bottom: 30px;
  }
`;

export const ListHeader = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  align-items: center;
  font-weight: bold;
  border-radius: 4px;
  background-color: #f9f9f9;
`;

export const View = styled.div`
  color: gray;
  font-weight: 200;
`;

export const Dates = styled.div`
  color: gray;
  font-weight: 200;
`;

export const PostLi = styled.ul`
  list-style: none;
  padding-left: 10px;
  padding-right: 10px;
  .list_grid {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    font-size: 14px;
    padding: 10px 20px;
    transition: all 0.2s ease-in-out;

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    }
    a {
      color: #000;
      text-decoration: none;
    }
  }
  .list_title {
    margin-bottom: 10px;
    color: darkgrey;
    border-bottom: 1px solid lightgrey;
  }
`;

export const PaginationContainer = styled.div`
  display: flex;
  position: relative;
  right: 20px;
  justify-content: center;
  align-items: center;

  ul {
    display: flex;
    list-style: none;
    flex-direction: row;
    
    li {
      cursor: pointer;
      transition: all 0.3s ease;

      &:hover {
        transform: scale(1.1);
      }
  }

  .page-item {
    padding: 1px 1px;
  }

  .page-link {
    border-radius: 4px;
    padding: 0 2px;
    border: 1px solid #ccc;
    background-color: #fff;
    text-decoration: none;
    color: #333;
    font-size: 13px;
    font-weight: 600;
    &:hover {
      background-color: #ccc;
      border-color: #ccc;
      color: #fff;
    }
    &.active {
      color: blue;
    }
  }
`;