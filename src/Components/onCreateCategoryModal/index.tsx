/* eslint-disable */
import Modal from 'Components/Modal';
import React, { FormEvent, useCallback } from 'react';

import useInput from '../../utils/useInput';
import { useCategory } from 'contexts/categoryContext';
import { useCategories, useCreateCategory } from 'apis/category';
import { Category } from 'typings/db';

const CreateCategoryModal = () => {
  const [newCategory, onChangeNewCategory, setNewCategory] = useInput('');
  const { data: categories } = useCategories();
  const { mutateAsync: createCategory } = useCreateCategory();
  const { onCloseModal, setShowCreateCategoryModal, showCreateCategoryModal } = useCategory();

  const onCreateCategory = useCallback(
    async (e: FormEvent) => {
      e.preventDefault();
      // 중복 확인
      if (categories?.some((category: Category) => category.name === newCategory.trim())) {
        alert('이미 존재하는 카테고리입니다.');
        return;
      }
      // 입력창 비우면 생성 x
      if (!newCategory || !newCategory.trim()) {
        alert('제목을 입력해주세요!');
        return;
      }

      await createCategory(newCategory);
      setShowCreateCategoryModal(false);
      setNewCategory('');
      alert('카테고리가 추가되었습니다.');
    },
    [newCategory, setNewCategory, setShowCreateCategoryModal, categories],
  );

  return (
    <Modal show={showCreateCategoryModal} onCloseModal={onCloseModal}>
      <div className="px-10 mt-3 lg:px-8">
        <h3 className="mb-4 text-lg font-medium text-gray-900 dark:text-white">Create Category</h3>
        <form className="space-y-6" onSubmit={onCreateCategory}>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Category
            </label>
            <input
              id="category"
              value={newCategory}
              onChange={onChangeNewCategory}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            생성하기
          </button>
        </form>
      </div>
    </Modal>
  );
};

export default CreateCategoryModal;
