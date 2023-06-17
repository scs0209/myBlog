import React, { ChangeEvent, FormEvent, VFC, memo } from "react"
import { Category } from "../../typings/db";
import { Link } from "react-router-dom";
import CategoryButton from "../../Components/common/CategoryButton";

interface Props {
  categories: Category[];
  edit: boolean;
  editedCategoryId: number | null;
  editedCategoryName: string;
  onChangeCategoryName: (e: ChangeEvent<HTMLInputElement>) => void;
  onSubmitEdit: (e: FormEvent<HTMLFormElement>) => void;
  toggleEdit: (categoryId: any) => void;
  onDeleteCategory: (categoryId: number) => void;
}

const CategoryLi: VFC<Props> = ({ categories, edit, editedCategoryId, editedCategoryName, onChangeCategoryName, onSubmitEdit, toggleEdit, onDeleteCategory }: any) => {
  return (
    <>
      {categories.map((category: any) => (
        <li key={category.id}>
          {editedCategoryId === category.id ? (
            <form onSubmit={onSubmitEdit}>
              <div className="flex items-center">
                <input
                  value={editedCategoryName}
                  onChange={onChangeCategoryName}
                  className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                  required
                />
                <button
                  type="submit"
                  className="relative top-1 ml-1 text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm text-center mr-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800"
                >
                  수정
                </button>
              </div>
            </form>
          ) : (
            <div className="flex justify-between">
              <Link
                to={`/main/categories/${category.id}`}
                className="flex items-center p-2 text-gray-700 rounded-lg dark:texts-white hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-gray-300"
              >
                {category.name}
              </Link>
              {edit && (
                <div>
                  <CategoryButton
                    type="button"
                    onClick={() => toggleEdit(category.id)}
                  >
                    ✏
                  </CategoryButton>
                  <CategoryButton
                    type="button"
                    onClick={() => onDeleteCategory(category.id)}
                  >
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
}

export default memo(CategoryLi)