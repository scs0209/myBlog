import { useUser } from 'apis/auth';
import { useCategories } from 'apis/category';
import EditButton from 'Components/Category/EditButton';
import CategoryEditForm from 'Components/CategoryNameEdit/CategoryEditForm';
import CategoryButton from 'Components/common/CategoryButton';
import CreateCategoryModal from 'Components/onCreateCategoryModal';
import { useCategoryActions } from 'hooks/Category/useCategoryAction';
import { FormEvent, useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useCategoryAction } from 'store/categoryStore';
import { Category } from 'typings/db';
import useInput from 'utils/useInput';

const SideBarPage = () => {
  const { data: userData, isError } = useUser();
  const { data: categories, isFetching } = useCategories();
  const [edit, setEdit] = useState(false);
  const [editedCategoryId, setEditedCategoryId] = useState(null);
  const [editedCategoryName, onChangeCategoryName, setEditedCategoryName] = useInput('');
  const [activeCategoryId, setActiveCategoryId] = useState<number | null>(null);
  const { openCreateCategory } = useCategoryAction();

  const { onSubmitEdit, onToggleHidden, onDeleteCategory } = useCategoryActions(userData);

  const handleClickCategory = (id: number) => {
    setActiveCategoryId(id);
  };

  const handleClickAllPosts = () => {
    setActiveCategoryId(null);
  };

  //categoryId를 인자로 받아서 해당 ID가 'editedCategoryId'와 같으면 편집 모드를 토글하고, 다르면 editedCategoryId를 해당 ID로 변경한다.
  const toggleEdit = useCallback((categoryId: any) => {
    setEdit((prev) => !prev);
    setEditedCategoryName('');
    setEditedCategoryId(categoryId);
  }, []);

  const handleSubmitEdit = useCallback(
    (e: FormEvent) => {
      e.preventDefault();
      onSubmitEdit(editedCategoryId, editedCategoryName, toggleEdit);
    },
    [editedCategoryId, editedCategoryName, onSubmitEdit, toggleEdit],
  );

  useEffect(() => {
    // 수정할 카테고리가 선택되면 해당 카테고리의 이름으로 editedCategoryName 상태를 설정합니다.
    if (editedCategoryId !== null) {
      //editCategoryId가 null이 아니라면, 'data' 배열에서 해당 id와 일치하는 카테고리를 찾아서 'editedCategoryName' 상태를 그 카테고리의 이름으로 설정한다.
      const editedCategory = categories.find((category: any) => category.id === editedCategoryId);

      setEditedCategoryName(editedCategory.name);
    }
  }, [editedCategoryId, categories]);

  if (isError) return <div>에러가 발생했습니다</div>;

  // if (isFetching) return <div>Loading...</div>;

  return (
    <>
      <ul className="space-y-2 mt-4 font-medium list-none min-h-dvh">
        <li className="text-center">
          <Link
            to="/main/posts"
            className="p-2 mb-4 font-black text-2xl text-black hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white"
            onClick={handleClickAllPosts}
          >
            <span>카테고리</span>
          </Link>
        </li>
        {categories.map(
          (category: Category) =>
            (userData?.role === 'admin' || !category.hidden) && (
              <li key={category.id}>
                {editedCategoryId === category.id ? (
                  <CategoryEditForm
                    editedCategoryName={editedCategoryName}
                    onChangeCategoryName={onChangeCategoryName}
                    onSubmitEdit={handleSubmitEdit}
                  />
                ) : (
                  <div className="flex items-center justify-between text-sm">
                    {/* 카테고리 이름 */}
                    <Link
                      to={`/main/categories/${category.id}`}
                      className={`${
                        activeCategoryId === category.id
                          ? 'font-bold bg-gray-300 dark:bg-gray-600'
                          : ''
                      } flex text-lg items-center p-2 text-gray-700 rounded-lg dark:texts-white hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-gray-300 ${
                        category.hidden ? 'line-through' : ''
                      }`}
                      onClick={() => handleClickCategory(category.id)}
                    >
                      - {category.name}
                    </Link>
                    {/* 편집버튼 */}
                    {edit && (
                      <div className="flex items-center max-h-10">
                        <CategoryButton type="button" onClick={() => toggleEdit(category.id)}>
                          ✏
                        </CategoryButton>
                        <CategoryButton type="button" onClick={() => onDeleteCategory(category.id)}>
                          🗑
                        </CategoryButton>
                        <CategoryButton
                          type="button"
                          onClick={() => onToggleHidden(category.id, !category.hidden)}
                        >
                          {category.hidden ? '🔓' : '🔒'}
                        </CategoryButton>
                      </div>
                    )}
                  </div>
                )}
              </li>
            ),
        )}
      </ul>
      {userData?.role === 'admin' && (
        <div className="flex justify-center">
          {userData?.role === 'admin' && (
            <EditButton type="button" onClick={openCreateCategory}>
              +
            </EditButton>
          )}
          <EditButton type="button" onClick={() => toggleEdit(null)}>
            {edit ? 'x' : '편집'}
          </EditButton>
        </div>
      )}
      <CreateCategoryModal />
    </>
  );
};

export default SideBarPage;
