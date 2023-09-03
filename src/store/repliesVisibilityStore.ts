import create from 'zustand';

// State 정의
interface RepliesVisibilityState {
  isRepliesVisible: { [commentId: number]: boolean };
}

// Actions 정의
interface RepliesVisibilityActions {
  handleRepliesClick: (commentId: number) => void;
}

export const useRepliesVisibilityStore = create<
  RepliesVisibilityState & { actions: RepliesVisibilityActions }
>((set) => ({
  // State
  isRepliesVisible: {},

  // Actions
  actions: {
    handleRepliesClick(commentId) {
      set((state) => ({
        ...state,
        isRepliesVisible: {
          ...state.isRepliesVisible,
          [commentId]: !state.isRepliesVisible[commentId],
        },
      }));
    },
  },
}));

// State 선택자
export const useIsRepliesVisible = () =>
  useRepliesVisibilityStore((state) => state.isRepliesVisible);

// Actions 선택자
export const useHandleReplyActions = () => useRepliesVisibilityStore((state) => state.actions);
