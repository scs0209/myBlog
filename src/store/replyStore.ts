import create from 'zustand';

// State 정의
interface ReplyState {
  isEditing: boolean;
}

// Actions 정의
interface ReplyActions {
  setIsEditing: (value: boolean) => void;
  handleEdit: () => void;
  handleEditCancel: () => void;
}

export const useReplyStore = create<ReplyState & { actions: ReplyActions }>((set) => ({
  // State
  isEditing: false,

  // Actions
  actions: {
    setIsEditing: (value) => set(() => ({ isEditing: value })),
    handleEdit: () => set({ isEditing: true }),
    handleEditCancel: () => set({ isEditing: false }),
  },
}));

// State 선택자
export const useIsEditing = () => useReplyStore((state) => state.isEditing);

// Actions 선택자
export const useReplyActions = () => useReplyStore((state) => state.actions);
