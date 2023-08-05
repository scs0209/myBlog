import React, { createContext, ReactNode, useCallback, useContext, useState } from 'react';

interface CategoryContextState {
  // 기존 상태 추가
  showCreateCategoryModal: boolean;
  setShowCreateCategoryModal: React.Dispatch<React.SetStateAction<boolean>>;
  openCreateCategory: () => void;
  onCloseModal: () => void;
}

interface Props {
  children: ReactNode;
}

const CategoryContext = createContext<CategoryContextState | undefined>(undefined);

export const CategoryProvider: React.FC<Props> = ({ children }) => {
  const [showCreateCategoryModal, setShowCreateCategoryModal] = useState(false);

  const openCreateCategory = useCallback(() => {
    setShowCreateCategoryModal(true);
  }, []);

  const onCloseModal = useCallback(() => {
    setShowCreateCategoryModal(false);
  }, []);

  return (
    <CategoryContext.Provider
      value={{
        // 기존 값 추가
        showCreateCategoryModal,
        setShowCreateCategoryModal,
        openCreateCategory,
        onCloseModal,
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
