import React, { useCallback, useState, VFC } from "react";
import { Button, Form, Input, SearchContainer } from "./styles";

interface Props {
  onSearch: (keyword: string) => void;
}

const Search: VFC<Props> = ({onSearch}) => {
  const [keyword, setKeyword] = useState('');


  const handleSubmit = useCallback((e: any) => {
    e.preventDefault();
    onSearch(keyword);
  }, [onSearch, keyword]);

  const onChangeInput = useCallback((e: any) => {
    setKeyword(e.target.value);
  }, []);


  return (
    <SearchContainer>
      <Form onSubmit={handleSubmit}>
        <Input type="text" value={keyword} onChange={onChangeInput} placeholder="검색어를 입력하세요." />
        <Button type="submit">검색</Button>
      </Form>
    </SearchContainer>
  );
}

export default Search;