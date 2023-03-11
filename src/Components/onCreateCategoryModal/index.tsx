import axios from "axios";
import Modal from "Components/Modal";
import React, { FC, useCallback } from "react";
import useSWR from 'swr';
import fetcher from "../../utils/fetcher";
import useInput from "../../utils/useInput";

interface Props{
  show: boolean;
  onCloseModal: (e: any) => void;
  setShowCreateCategoryModal: (flag: boolean) => void;
}

const CreateCategoryModal: FC<Props> = ({ show, onCloseModal, setShowCreateCategoryModal }) => {
  const [newCategory, onChangeNewCategory, setNewCategory] = useInput('');
  const { data: categories, error, mutate } = useSWR("/api/categories", fetcher)

  const onCreateCategory = useCallback(
    (e: any) => {
      e.preventDefault();
      if (!newCategory || !newCategory.trim()) return; //중복된 이름 못 만들게하기
      axios
        .post("/api/categories", {
          name: newCategory,
        })
        .then(() => {
          setShowCreateCategoryModal(false);
          setNewCategory("");
          alert("카테고리가 추가되었습니다.");
          mutate([...(categories ?? []), newCategory], false);// 생성한 카테고리를 화면에 바로 반영
        })
        .catch((err) => {
          console.error(err);
        });
    },
    [newCategory, setNewCategory, setShowCreateCategoryModal, categories, mutate]
  );

  return (
    <Modal show={show} onCloseModal={onCloseModal}>
      <form onSubmit={onCreateCategory}>
        <label id="category-label">
          <span>카테고리 이름</span>
          <input
            id="category"
            value={newCategory}
            onChange={onChangeNewCategory}
          />
        </label>
        <button type="submit">생성하기</button>
      </form>
    </Modal>
  );
}

export default CreateCategoryModal;