import { deleteCategory, editCategory, toggleCategoryHidden } from 'apis/category';
import { useCallback, useMemo } from 'react';
import { User } from 'typings/db';

export const useCategoryActions = (userData: User, mutate: any) => {
  const onSubmitEdit = useCallback(
    async (
      editedCategoryId: number | null,
      editedCategoryName: string,
      toggleEdit: (categoryId: any) => void,
    ) => {
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
      } catch (error: any) {
        console.error(error.response.data);
        alert('카테고리 수정에 실패했습니다.');
      }
    },
    [mutate, userData],
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
      } catch (error: any) {
        console.error(error.response.data);
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

  const actions = useMemo(
    () => ({
      onSubmitEdit,
      onToggleHidden,
      onDeleteCategory,
    }),
    [onSubmitEdit, onToggleHidden, onDeleteCategory],
  );

  return actions;
};
