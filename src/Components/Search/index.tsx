import React, { useCallback, VFC } from "react";
import useInput from "../../utils/useInput";
import { Button, TextInput } from "flowbite-react";

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
    <form className="flex max-w-md mt-2 gap-1" onSubmit={handleSubmit}>
      <TextInput
        type="text"
        sizing="sm"
        value={keyword}
        onChange={onChangeKeyword}
        placeholder="검색어를 입력하세요."
      />
      <Button size="sm" className="text-xs bg-gray-500 hover:bg-slate-500" type="submit">검색</Button>
    </form>
  );
}

export default Search;