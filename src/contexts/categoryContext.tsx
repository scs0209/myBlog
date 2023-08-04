import React, { createContext, ReactNode, useContext, useState } from 'react';
import { User } from 'typings/db';

interface CategoryContextState {
  // 기존 상태 추가
  showCreateCategoryModal: boolean;
  activeCategoryId: number | null;
  setShowCreateCategoryModal: React.Dispatch<React.SetStateAction<boolean>>;
  setActiveCategoryId: React.Dispatch<React.SetStateAction<number | null>>;
  // 새로운 상태 추가
  edit: boolean;
  editedCategoryId: number | null;
  editedCategoryName: string;
  setEdit: React.Dispatch<React.SetStateAction<boolean>>;
  setEditedCategoryId: React.Dispatch<React.SetStateAction<number | null>>;
  setEditedCategoryName: React.Dispatch<React.SetStateAction<string>>;
  userData: User;
}

interface Props {
  children: ReactNode;
  userData: User;
}

const CategoryContext = createContext<CategoryContextState | undefined>(undefined);

export const CategoryProvider: React.FC<Props> = ({ children, userData }) => {
  const [showCreateCategoryModal, setShowCreateCategoryModal] = useState(false);
  const [activeCategoryId, setActiveCategoryId] = useState<number | null>(null);
  // 새로운 상태 useState 추가
  const [edit, setEdit] = useState(false);
  const [editedCategoryId, setEditedCategoryId] = useState<number | null>(null);
  const [editedCategoryName, setEditedCategoryName] = useState('');

  return (
    <CategoryContext.Provider
      value={{
        // 기존 값 추가
        showCreateCategoryModal,
        activeCategoryId,
        setShowCreateCategoryModal,
        setActiveCategoryId,
        // 새로운 값 추가
        edit,
        editedCategoryId,
        editedCategoryName,
        setEdit,
        setEditedCategoryId,
        setEditedCategoryName,
        userData,
      }}
    >
      {children}
    </CategoryContext.Provider>
  );
};

export const useCategory = () => {
  const context = useContext(CategoryContext);

  if (!context) {
    throw new Error('useCategory must be used within a CategoryProvider');
  }

  return context;
};
