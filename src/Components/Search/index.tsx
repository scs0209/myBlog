import React, { useCallback, useState, VFC } from "react";
import { Button, Form, Input, SearchContainer } from "./styles";
import useInput from "../../utils/useInput";

interface Props {
  onSearch: (keyword: string) => void;
}

const Search: VFC<Props> = ({onSearch}) => {
  const [keyword, onChangeKeyword] = useInput("");


  const handleSubmit = useCallback((e: any) => {
    e.preventDefault();
    onSearch(keyword);
  }, [onSearch, keyword]);

  return (
    <SearchContainer>
      <Form onSubmit={handleSubmit}>
        <Input
          type="text"
          value={keyword}
          onChange={onChangeKeyword}
          placeholder="검색어를 입력하세요."
        />
        <Button type="submit">검색</Button>
      </Form>
    </SearchContainer>
  );
}

export default Search;