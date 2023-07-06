import React, { ChangeEvent, FormEvent, memo, VFC } from 'react';
import { Link } from 'react-router-dom';

import { Category } from '../../typings/db';
import CategoryButton from '../common/CategoryButton';
import CategoryEditForm from './CategoryEditForm';

interface Props {
  categories: Category[];
  edit: boolean;
  editedCategoryId: number | null;
  editedCategoryName: string;
  onChangeCategoryName: (e: ChangeEvent<HTMLInputElement>) => void;
  onSubmitEdit: (e: FormEvent<HTMLFormElement>) => void;
  toggleEdit: (categoryId: any) => void;
  onDeleteCategory: (categoryId: number) => void;
  handleClickCategory: (id: number) => void;
  activeCategoryId: any;
}

const CategoryNameEdit: VFC<Props> = ({
  categories,
  edit,
  editedCategoryId,
  editedCategoryName,
  onChangeCategoryName,
  onSubmitEdit,
  toggleEdit,
  onDeleteCategory,
  handleClickCategory,
  activeCategoryId,
}) => {
  return (
    <>
      {categories.map((category: Category) => (
        <li key={category.id}>
          {editedCategoryId === category.id ? (
            <CategoryEditForm
              editedCategoryName={editedCategoryName}
              onChangeCategoryName={onChangeCategoryName}
              onSubmitEdit={onSubmitEdit}
            />
          ) : (
            <div className="flex justify-between items-center text-sm">
              {/* 카테고리 이름 */}
              <Link
                to={`/main/categories/${category.id}`}
                className={`flex items-center p-2 text-gray-700 rounded-lg dark:texts-white hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-gray-300 ${
                  activeCategoryId === category.id ? 'font-bold bg-gray-300 dark:bg-gray-600' : ''
                }`}
                onClick={() => handleClickCategory(category.id)}
              >
                {category.name}
              </Link>
              {/* 편집버튼 */}
              {edit && (
                <div className="flex max-h-10 items-center">
                  <CategoryButton type="button" onClick={() => toggleEdit(category.id)}>
                    ✏
                  </CategoryButton>
                  <CategoryButton type="button" onClick={() => onDeleteCategory(category.id)}>
                    🗑
                  </CategoryButton>
                </div>
              )}
            </div>
          )}
        </li>
      ))}
    </>
  );
};

export default memo(CategoryNameEdit);
