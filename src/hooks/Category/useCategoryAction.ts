import { deleteCategory, editCategory, toggleCategoryHidden } from 'apis/category';
import { useCategory } from 'contexts/categoryContext';
import { FormEvent, useCallback } from 'react';

export const useCategoryActions = (mutate: any) => {
  const { userData, editedCategoryId, editedCategoryName, setEdit, setEditedCategoryId } =
    useCategory();

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
        setEdit(false);
        setEditedCategoryId(null);
      } catch (error) {
        console.error(error);
        alert('카테고리 수정에 실패했습니다.');
      }
    },
    [editedCategoryName, mutate, editedCategoryId, userData],
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

  return {
    onSubmitEdit,
    onToggleHidden,
    onDeleteCategory,
  };
};
