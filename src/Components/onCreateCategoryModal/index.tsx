import axios from "axios";
import Modal from "Components/Modal";
import React, { VFC, useCallback } from "react";
import useSWR from 'swr';
import fetcher from "../../utils/fetcher";
import useInput from "../../utils/useInput";
import { Form, Input, Label, Span, SubmitButton } from "./styles";
import { backUrl } from "config";

interface Props{
  show: boolean;
  onCloseModal: (e: any) => void;
  setShowCreateCategoryModal: (flag: boolean) => void;
}

const CreateCategoryModal: VFC<Props> = ({ show, onCloseModal, setShowCreateCategoryModal }) => {
  const [newCategory, onChangeNewCategory, setNewCategory] = useInput('');
  const { data: categories, error, mutate } = useSWR(`${backUrl}/api/categories`, fetcher)

  const onCreateCategory = useCallback(
    (e: any) => {
      e.preventDefault();
      // 중복 확인
      if (
        categories?.some((category: any) => category.name === newCategory.trim())
      ) {
        alert("이미 존재하는 카테고리입니다.");
        return;
      }
      // 입력창 비우면 생성 x
      if (!newCategory || !newCategory.trim()) {
        alert("제목을 입력해주세요!");
        return;
      }
      axios
        .post(`${backUrl}/api/categories`, {
          name: newCategory,
        }, {
          withCredentials: true,
        })
        .then(() => {
          setShowCreateCategoryModal(false);
          setNewCategory("");
          alert("카테고리가 추가되었습니다.");
          mutate([...(categories ?? []), newCategory], false); // 생성한 카테고리를 화면에 바로 반영
        })
        .catch((error) => {
          if (error.response && error.response.status === 403) {
            alert("권한이 없습니다.");
          } else {
            console.error(error);
          }
        });
    },
    [newCategory, setNewCategory, setShowCreateCategoryModal, categories, mutate]
  );

  return (
    <Modal show={show} onCloseModal={onCloseModal}>
      <div className="px-6 py-6 lg:px-8">
        <h3 className="mb-4 text-xl font-medium text-gray-900 dark:text-white">
          Create Category
        </h3>
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
}

export default CreateCategoryModal;