import axios from "axios";
import Modal from "Components/Modal";
import React, { FC, useCallback } from "react";
import useSWR from 'swr';
import fetcher from "../../utils/fetcher";
import useInput from "../../utils/useInput";
import { Form, Input, Label, Span, SubmitButton } from "./styles";

interface Props{
  show: boolean;
  onCloseModal: (e: any) => void;
  setShowCreateCategoryModal: (flag: boolean) => void;
}

const backUrl =
  process.env.NODE_ENV === "development"
    ? "http://localhost:5000"
    : "https://port-0-server-p8xrq2mlfsc6kg2.sel3.cloudtype.app";
const CreateCategoryModal: FC<Props> = ({ show, onCloseModal, setShowCreateCategoryModal }) => {
  const [newCategory, onChangeNewCategory, setNewCategory] = useInput('');
  const { data: categories, error, mutate } = useSWR(`${backUrl}/categories`, fetcher)

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
      if(!newCategory) {
        alert("제목을 입력해주세요!");
        return;
      }
      axios
        .post(`${backUrl}/categories`, {
          name: newCategory,
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
      <Form onSubmit={onCreateCategory}>
        <Label id="category-label">
          <Span>카테고리 이름</Span>
          <Input
            id="category"
            value={newCategory}
            onChange={onChangeNewCategory}
          />
        </Label>
        <SubmitButton type="submit">생성하기</SubmitButton>
      </Form>
    </Modal>
  );
}

export default CreateCategoryModal;