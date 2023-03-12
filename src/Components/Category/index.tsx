import axios from "axios";
import React, { useCallback, useState } from "react";
import { Link, useParams } from "react-router-dom";
import useSWR from 'swr';
import fetcher from "../../utils/fetcher";
import { CategoryLi } from "./styles";

const Category = () => {
  const [edit, setEdit] = useState(false);
  const [editedCategoryName, setEditedCategoryName] = useState("");
  const {data, error, mutate} = useSWR('/api/categories', fetcher);

  const toggleEdit = useCallback(() => {
    setEdit((prev) => !prev);
    setEditedCategoryName("");
  }, []);


  const onChangeCategoryName = useCallback((e: any) => {
    setEditedCategoryName(e.target.value);
  }, []);


  if(error) return <div>에러가 발생했습니다</div>
  if(!data) return <div>로딩중...</div>


  return (
    <div className="Category">
      <Link to={`/main/posts`}>
        <h2>전체 게시글</h2>
      </Link>
      <button onClick={toggleEdit}>{edit ? "취소" : "편집"}</button>
      <CategoryLi>
        {data.map((category: any) => (
          <li key={category.id}>
            {edit ? (
              <form>
                <input
                  value={editedCategoryName || category.name}
                  onChange={onChangeCategoryName}
                />
                <button type="submit">수정</button>
              </form>
            ) : (
              <Link to={`/main/categories/${category.id}`}>
                {category.name}
              </Link>
            )}
          </li>
        ))}
      </CategoryLi>
    </div>
  );
}

export default Category;