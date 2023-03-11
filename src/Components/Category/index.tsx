import React, { useCallback, useState } from "react";
import { Link } from "react-router-dom";
import useSWR from 'swr';
import fetcher from "../../utils/fetcher";
import { CategoryLi } from "./styles";

const Category = () => {
  const [edit, setEdit] = useState(false);
  const {data, error} = useSWR('/api/categories', fetcher);

  if(error) return <div>에러가 발생했습니다</div>
  if(!data) return <div>로딩중...</div>

  return (
    <div className="Category">
      <Link to={`/main/posts`}>
        <h2>전체 게시글</h2>
      </Link>
        <button>edit</button>
      <CategoryLi>
        {data.map((category: any) => (
          <li key={category.id}>
            <Link to={`/main/categories/${category.id}`}>{category.name}</Link>
          </li>
        ))}
      </CategoryLi>
    </div>
  );
}

export default Category;