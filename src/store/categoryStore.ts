import create from 'zustand';

interface CategoryModalState {
  showCreateCategoryModal: boolean;
  setShowCreateCategoryModal: (value: boolean) => void;
  openCreateCategory: () => void;
  onCloseModal: () => void;
}

const useCategoryStore = create<CategoryModalState>((set, get) => {
  return {
    showCreateCategoryModal: false,
    setShowCreateCategoryModal: (value) => set(() => ({ showCreateCategoryModal: value })),
    openCreateCategory: () => set(() => ({ showCreateCategoryModal: true })),
    onCloseModal: () => set(() => ({ showCreateCategoryModal: false })),
  };
});

export default useCategoryStore;
