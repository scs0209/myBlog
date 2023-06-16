import axios from "axios";
import React, { FormEvent, VFC, useCallback, useEffect, useState } from "react";
import useSWR from 'swr';
import fetcher from "../../utils/fetcher";
import useInput from "../../utils/useInput";
import { backUrl } from "../../config";
import { Link } from "react-router-dom";
import CategoryLi from "../../Components/CategoryLi";
import CreateCategoryModal from "../../Components/onCreateCategoryModal";
import EditButton from "./EditButton";

interface Props {
  showSidebar: boolean;
}

const Category: VFC<Props> = ({ showSidebar }) => {
  const [edit, setEdit] = useState(false);
  const [editedCategoryId, setEditedCategoryId] = useState(null);
  const [editedCategoryName, onChangeCategoryName, setEditedCategoryName] = useInput("");
  const [showCreateCategoryModal, setShowCreateCategoryModal] = useState(false);
  const { data: userData, mutate: mutateUserData } = useSWR(
    `${backUrl}/api/users`,
    fetcher
  );
  const { data, error, mutate } = useSWR(`${backUrl}/api/categories`, fetcher);

  const onClickCreateCategory = useCallback(() => {
    setShowCreateCategoryModal(true);
  }, []);

  const onCloseModal = useCallback(() => {
    setShowCreateCategoryModal(false);
  }, []);

  //categoryId를 인자로 받아서 해당 ID가 'editedCategoryId'와 같으면 편집 모드를 토글하고, 다르면
  //editedCategoryId를 해당 ID로 변경한다.
  const toggleEdit = useCallback((categoryId: any) => {
    setEdit((prev) => !prev);
    setEditedCategoryName("");
    setEditedCategoryId(categoryId);
  }, []);

  const onSubmitEdit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
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
    (categoryId: number) => {
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
    <aside
      id="logo-sidebar"
      className={`fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform ${
        showSidebar ? "translate-x-0" : "-translate-x-full sm:translate-x-0"
      } bg-gray-800 border-gray-700`}
      aria-label="Sidebar"
    >
      <div className="h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800">
        <ul className="space-y-2 font-medium">
          <li>
            <Link
              to="/main/posts"
              className="border-b-2 border-blue-600 flex items-center p-2 text-gray-300 rounded-lg dark:texts-white hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <span className="ml-3">전체 게시글</span>
            </Link>
          </li>
          <CategoryLi
            categories={data}
            edit={edit}
            editedCategoryId={editedCategoryId}
            editedCategoryName={editedCategoryName}
            onChangeCategoryName={onChangeCategoryName}
            onSubmitEdit={onSubmitEdit}
            toggleEdit={toggleEdit}
            onDeleteCategory={onDeleteCategory}
          />
        </ul>
        {userData?.role === "admin" && (
          <div>
            {userData?.role === "admin" && (
              <EditButton
                type="button"
                onClick={onClickCreateCategory}
              >
                +
              </EditButton>
            )}
            <EditButton
              type="button"
              onClick={() => toggleEdit(null)}
            >
              {edit ? "x" : "편집"}
            </EditButton>
          </div>
        )}
      </div>
      <CreateCategoryModal
        show={showCreateCategoryModal}
        onCloseModal={onCloseModal}
        setShowCreateCategoryModal={setShowCreateCategoryModal}
      />
    </aside>
  );
}

export default Category;