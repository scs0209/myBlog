import { Comment } from 'typings/db';
import create from 'zustand';

interface RepliesVisibilityStoreState {
  comment: Comment | null;
  isRepliesVisible: { [commentId: number]: boolean };
  handleRepliesClick: (commentId: number) => void;
  setComment: (comment: Comment) => void;
}

const useRepliesVisibilityStore = create<RepliesVisibilityStoreState>((set) => ({
  comment: null,
  isRepliesVisible: {},
  handleRepliesClick: (commentId: number) =>
    set((state) => ({
      ...state,
      isRepliesVisible: {
        ...state.isRepliesVisible,
        [commentId]: !state.isRepliesVisible[commentId],
      },
    })),
  setComment: (comment: Comment) => set((state) => ({ ...state, comment })),
}));

export default useRepliesVisibilityStore;
