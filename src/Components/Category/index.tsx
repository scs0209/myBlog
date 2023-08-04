import { deleteCategory, editCategory, toggleCategoryHidden } from 'apis/category';
import axios from 'axios';
import React, { FormEvent, useCallback, useEffect, useState, VFC } from 'react';
import { Link } from 'react-router-dom';
import useSWR from 'swr';

import CreateCategoryModal from '../../Components/onCreateCategoryModal';
import { backUrl } from '../../config';
import fetcher from '../../utils/fetcher';
import useInput from '../../utils/useInput';
import CategoryNameEdit from '../CategoryNameEdit';
import EditButton from './EditButton';
import SideBar from './SideBar';
import Visitor from './Visitor';

interface Props {
  showSidebar: boolean;
}

const Category: VFC<Props> = ({ showSidebar }) => {
  const [edit, setEdit] = useState(false);
  const [editedCategoryId, setEditedCategoryId] = useState(null);
  const [editedCategoryName, onChangeCategoryName, setEditedCategoryName] = useInput('');
  const [showCreateCategoryModal, setShowCreateCategoryModal] = useState(false);
  const [activeCategoryId, setActiveCategoryId] = useState<number | null>(null);

  const { data: userData, mutate: mutateUserData } = useSWR(`${backUrl}/api/users`, fetcher);
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
    setEditedCategoryName('');
    setEditedCategoryId(categoryId);
  }, []);

  const onSubmitEdit = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (!editedCategoryName || !editedCategoryName.trim()) {
        alert('글자를 입력해주세요.');

        return;
      }
      if (userData?.role !== 'admin') {
        alert('관리자만 카테고리를 수정할 수 있습니다.');

        return;
      }
      try {
        await editCategory(editedCategoryId, editedCategoryName);
        mutate();
        toggleEdit(null);
      } catch (error) {
        console.error(error);
        alert('카테고리 수정에 실패했습니다.');
      }
    },
    [editedCategoryName, toggleEdit, mutate, editedCategoryId, userData],
  );

  const onToggleHidden = useCallback(
    async (categoryId: number, hidden: boolean) => {
      if (userData?.role !== 'admin') {
        alert('관리자만 카테고리를 숨길 수 있습니다.');

        return;
      }

      try {
        await toggleCategoryHidden(categoryId, hidden);
        mutate();
      } catch (error) {
        console.error(error);
        alert('카테고리 숨기기/보이기 변경에 실패했습니다.');
      }
    },
    [mutate, userData],
  );

  // 카테고리 삭제
  const onDeleteCategory = useCallback(
    async (categoryId: number) => {
      try {
        await deleteCategory(categoryId);
        mutate();
      } catch (error: any) {
        alert(error.response.data);
        console.error(error);
      }
    },
    [mutate],
  );

  useEffect(() => {
    // 수정할 카테고리가 선택되면 해당 카테고리의 이름으로 editedCategoryName 상태를 설정합니다.
    if (editedCategoryId !== null) {
      //editCategoryId가 null이 아니라면, 'data' 배열에서 해당 id와 일치하는 카테고리를 찾아서 'editedCategoryName' 상태를 그 카테고리의 이름으로 설정한다.
      const editedCategory = data.find((category: any) => category.id === editedCategoryId);

      setEditedCategoryName(editedCategory.name);
    }
  }, [editedCategoryId, data]);

  const handleClickCategory = useCallback((id: number) => {
    setActiveCategoryId(id);
  }, []);

  const handleClickAllPosts = () => {
    setActiveCategoryId(null);
  };

  if (error) return <div>에러가 발생했습니다</div>;
  if (!data) return <div>로딩중...</div>;

  return (
    <aside
      id="logo-sidebar"
      className={`fixed z-40 w-64 top-20 transition-transform ${
        showSidebar ? 'left-2 translate-x-0 sm:translate-x-0' : '-translate-x-full sm:-left-2'
      }`}
      aria-label="Sidebar"
    >
      <Visitor />
      <SideBar />
      <div className="h-[calc(85vh-20rem)] px-3 pb-4 overflow-y-auto bg-gray-200 dark:bg-gray-800 border-gray-700 rounded-lg shadow-md">
        <ul className="space-y-2 font-medium">
          <li>
            <Link
              to="/main/posts"
              className="border-b-2 font-bold border-blue-600 flex justify-center items-center p-2 text-black dark:texts-white hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-gray-300"
              onClick={handleClickAllPosts}
            >
              <span className="ml-3">전체 게시글</span>
            </Link>
          </li>
          <CategoryNameEdit
            categories={data}
            edit={edit}
            editedCategoryId={editedCategoryId}
            editedCategoryName={editedCategoryName}
            onChangeCategoryName={onChangeCategoryName}
            onSubmitEdit={onSubmitEdit}
            toggleEdit={toggleEdit}
            onDeleteCategory={onDeleteCategory}
            handleClickCategory={handleClickCategory}
            activeCategoryId={activeCategoryId}
            onToggleHidden={onToggleHidden}
          />
        </ul>
        {userData?.role === 'admin' && (
          <div className="flex justify-center">
            {userData?.role === 'admin' && (
              <EditButton type="button" onClick={onClickCreateCategory}>
                +
              </EditButton>
            )}
            <EditButton type="button" onClick={() => toggleEdit(null)}>
              {edit ? 'x' : '편집'}
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
};

export default Category;
