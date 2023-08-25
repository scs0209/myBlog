import create from 'zustand';

interface State {
  isEditing: boolean;
  setIsEditing: (value: boolean) => void;
  handleEdit: () => void;
  handleEditCancel: () => void;
}

const useReplyStore = create<State>((set) => ({
  isEditing: false,
  setIsEditing: (value) => set(() => ({ isEditing: value })),
  handleEdit: () => set({ isEditing: true }),
  handleEditCancel: () => set({ isEditing: false }),
}));

export default useReplyStore;
