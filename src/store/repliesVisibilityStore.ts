import create from 'zustand';

interface RepliesVisibilityStoreState {
  isRepliesVisible: { [commentId: number]: boolean };
  handleRepliesClick: (commentId: number) => void;
}

const useRepliesVisibilityStore = create<RepliesVisibilityStoreState>((set) => ({
  isRepliesVisible: {},
  handleRepliesClick: (commentId: number) =>
    set((state) => ({
      ...state,
      isRepliesVisible: {
        ...state.isRepliesVisible,
        [commentId]: !state.isRepliesVisible[commentId],
      },
    })),
}));

export default useRepliesVisibilityStore;
