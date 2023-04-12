import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import useSWR from 'swr';
import fetcher from "../../utils/fetcher";
import { Border, Button, CategoryLi, CategoryWrapper, EditButton, HeaderLink, List, ModeButton, StyledLink } from "./styles";
import useInput from "../../utils/useInput";

const backUrl =
  process.env.NODE_ENV === "development"
    ? "http://localhost:5000"
    : "https://port-0-server-p8xrq2mlfsc6kg2.sel3.cloudtype.app";
const Category = () => {
  const [edit, setEdit] = useState(false);
  const [editedCategoryId, setEditedCategoryId] = useState(null);
  const [editedCategoryName, onChangeCategoryName, setEditedCategoryName] = useInput("");
  const { data: userData, mutate: mutateUserData } = useSWR(
    `${backUrl}/api/users`,
    fetcher
  );
  const { data, error, mutate } = useSWR(`${backUrl}/api/categories`, fetcher);

  //categoryId를 인자로 받아서 해당 ID가 'editedCategoryId'와 같으면 편집 모드를 토글하고, 다르면
  //editedCategoryId를 해당 ID로 변경한다.
  const toggleEdit = useCallback((categoryId: any) => {
    setEdit((prev) => !prev);
    setEditedCategoryName("");
    setEditedCategoryId(categoryId);
  }, []);

  const onSubmitEdit = useCallback(
    (e: any) => {
      e.preventDefault();
      if (!editedCategoryName || !editedCategoryName.trim()) {
        alert("글자를 입력해주세요.");
        return;
      }
      if (userData?.role !== "admin") {
        alert("관리자만 카테고리를 수정할 수 있습니다.");
        return;
      }
      axios
        .put(
          `${backUrl}/api/categories/${editedCategoryId}`,
          {
            name: editedCategoryName,
          },
          {
            withCredentials: true,
          }
        )
        .then(() => {
          mutate();
          toggleEdit(null);
        })
        .catch((error) => {
          console.error(error);
          alert("카테고리 수정에 실패했습니다.");
        });
      },
    [editedCategoryName, toggleEdit, mutate, editedCategoryId, userData]
  );

  // 카테고리 삭제
  const onDeleteCategory = useCallback(
    (categoryId: any) => {
      axios
        .delete(`${backUrl}/api/categories/${categoryId}`, {
          withCredentials: true,
        })
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

  useEffect(() => {
    // 수정할 카테고리가 선택되면 해당 카테고리의 이름으로 editedCategoryName 상태를 설정합니다.
    if (editedCategoryId !== null) {//editCategoryId가 null이 아니라면, 'data' 배열에서 해당 id와 일치하는 카테고리를 찾아서 'editedCategoryName' 상태를 그 카테고리의 이름으로 설정한다.
      const editedCategory = data.find(
        (category: any) => category.id === editedCategoryId
      );
      setEditedCategoryName(editedCategory.name);
    }
  }, [editedCategoryId, data]);


  if(error) return <div>에러가 발생했습니다</div>
  if(!data) return <div>로딩중...</div>


  return (
    <CategoryWrapper className="Category">
      <HeaderLink to="/main/posts">
        <h2>전체 게시글</h2>
      </HeaderLink>
      {userData?.role === "admin" && (
        <ModeButton onClick={() => toggleEdit(null)}>
          {edit ? "x" : "편집 모드"}
        </ModeButton>
      )}
      <Border></Border>
      <CategoryLi>
        {data.map((category: any) => (
          <List key={category.id}>
            {editedCategoryId === category.id ? (
              <form onSubmit={onSubmitEdit}>
                <input
                  value={editedCategoryName}
                  onChange={onChangeCategoryName}
                />
                <EditButton type="submit">수정</EditButton>
              </form>
            ) : (
              <StyledLink to={`/main/categories/${category.id}`}>
                {category.name}
              </StyledLink>
            )}
            {edit && (
              <div>
                <Button onClick={() => toggleEdit(category.id)}>✏</Button>
                <Button onClick={() => onDeleteCategory(category.id)}>
                  🗑
                </Button>
              </div>
            )}
          </List>
        ))}
      </CategoryLi>
    </CategoryWrapper>
  );
}

export default Category;