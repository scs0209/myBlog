import { useDeleteCategory, useEditCategory, useToggleCategoryHidden } from 'apis/category';
import { useCallback, useMemo } from 'react';
import { User } from 'typings/db';

export const useCategoryActions = (userData: User) => {
  const { mutateAsync: editCategory } = useEditCategory();
  const { mutateAsync: toggleCategoryHidden } = useToggleCategoryHidden();
  const { mutateAsync: deleteCategory } = useDeleteCategory();

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

      await editCategory({ categoryId: editedCategoryId, categoryName: editedCategoryName });
      toggleEdit(null);
    },
    [userData],
  );

  const onToggleHidden = async (categoryId: number, hidden: boolean) => {
    if (userData?.role !== 'admin') {
      alert('관리자만 카테고리를 숨길 수 있습니다.');

      return;
    }

    await toggleCategoryHidden({ categoryId, hidden });
  };

  const onDeleteCategory = async (categoryId: number) => {
    await deleteCategory(categoryId);
  };

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
