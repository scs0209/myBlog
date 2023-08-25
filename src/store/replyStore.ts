import { ChangeEvent } from 'react';
import create from 'zustand';

interface State {
  isEditing: boolean;
  editContent: string;
  setIsEditing: (value: boolean) => void;
  setEditContent: (value: string) => void;
  handleEdit: () => void;
  handleEditCancel: () => void;
  handleContentChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
}

const useReplyStore = create<State>((set) => ({
  isEditing: false,
  editContent: '',
  setIsEditing: (value) => set(() => ({ isEditing: value })),
  setEditContent: (value) => set(() => ({ editContent: value })),
  handleEdit: () => set({ isEditing: true }),
  handleEditCancel: () => set({ isEditing: false }),
  handleContentChange(e) {
    set({ editContent: e.target.value });
  },
}));

export default useReplyStore;
