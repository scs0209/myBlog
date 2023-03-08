import React, { useCallback, useState, VFC } from "react";

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
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" value={keyword} onChange={onChangeInput} placeholder="검색어를 입력하세요." />
        <button type="submit">검색</button>
      </form>
    </div>
  );
}

export default Search;