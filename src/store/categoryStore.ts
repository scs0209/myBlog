import create from 'zustand';

interface CategoryModalState {
  showCreateCategoryModal: boolean;
}

// Actions 정의
interface CategoryModalActions {
  setShowCreateCategoryModal: (value: boolean) => void;
  openCreateCategory: () => void;
  onCloseModal: () => void;
}

const useCategoryStore = create<CategoryModalState & { actions: CategoryModalActions }>(
  (set, get) => {
    return {
      showCreateCategoryModal: false,
      actions: {
        setShowCreateCategoryModal: (value) => set({ showCreateCategoryModal: value }),
        openCreateCategory: () => set({ showCreateCategoryModal: true }),
        onCloseModal: () => set({ showCreateCategoryModal: false }),
      },
    };
  },
);

export const useShowCreateCategoryModal = () =>
  useCategoryStore((state) => state.showCreateCategoryModal);

export const useCategoryAction = () => useCategoryStore((state) => state.actions);
