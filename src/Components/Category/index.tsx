import axios from "axios";
import React, { useCallback, useState } from "react";
import { Link } from "react-router-dom";
import useSWR from 'swr';
import fetcher from "../../utils/fetcher";
import { CategoryLi } from "./styles";

const Category = () => {
  const [edit, setEdit] = useState(false);
  const [editedCategoryId, setEditedCategoryId] = useState(null);
  const [editedCategoryName, setEditedCategoryName] = useState("");
  const { data: userData, mutate: mutateUserData } = useSWR("/api/users", fetcher, {
    dedupingInterval: 5000,
  });
  const {data, error, mutate} = useSWR('/api/categories', fetcher);

  const toggleEdit = useCallback((categoryId: any) => {
    setEdit((prev) => !prev);
    setEditedCategoryName("");
    setEditedCategoryId(categoryId);
  }, []);

  const onSubmitEdit = useCallback(
    (e: any) => {
      e.preventDefault();
      if(!editedCategoryName) {
        alert("글자를 입력해주세요.")
        return;
      }
      axios
        .put(`/api/categories/${editedCategoryId}`, { name: editedCategoryName })
        .then(() => {
          mutate();
          toggleEdit(null);
        })
        .catch((error) => console.error(error));
    },
    [editedCategoryName, toggleEdit, mutate, editedCategoryId]
  );

  // 카테고리 삭제
  const onDeleteCategory = useCallback(
    (categoryId: any) => {
      axios
        .delete(`/api/categories/${categoryId}`)
        .then(() => {
          mutate();
        })
        .catch((error) => {
          if (error.response && error.response.status === 403) {
            alert("권한이 없습니다.");
          } else {
            console.error(error);
          }
        });
    },
    [mutate]
  );


  const onChangeCategoryName = useCallback(
    (e: any) => {
      setEditedCategoryName(e.target.value);
    },
    [setEditedCategoryName]
  );


  if(error) return <div>에러가 발생했습니다</div>
  if(!data) return <div>로딩중...</div>


  return (
    <div className="Category">
      <Link to="/main/posts">
        <h2>전체 게시글</h2>
      </Link>
      {userData?.role === 'admin' && <button onClick={() => toggleEdit(null)}>
        {edit ? "취소" : "편집모드"}
      </button>}
      <CategoryLi>
        {data.map((category: any) => (
          <li key={category.id}>
            {editedCategoryId === category.id ? (
              <form onSubmit={onSubmitEdit}>
                <input
                  value={editedCategoryName}
                  onChange={onChangeCategoryName}
                />
                <button type="submit">수정</button>
              </form>
            ) : (
              <Link to={`/main/categories/${category.id}`}>
                {category.name}
              </Link>
            )}
            {edit && (
              <div>
                <button onClick={() => toggleEdit(category.id)}>편집</button>
                <button onClick={() => onDeleteCategory(category.id)}>
                  삭제
                </button>
              </div>
            )}
          </li>
        ))}
      </CategoryLi>
    </div>
  );
}

export default Category;