import { ChangeEvent } from 'react';
import create from 'zustand';

// State 정의
interface CommentState {
  editId: number | null;
  editContent: string;
}

// Actions 정의
interface CommentActions {
  setEditId: (id: number | null) => void;
  setEditContent: (content: string) => void;
  handleEditClick: (commentId: number, content: string) => void;
  handleEditCancel: () => void;
  onChangeEditContent: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

const useCommentStore = create<CommentState & { actions: CommentActions }>((set) => ({
  // State
  editId: null,
  editContent: '',

  // Actions
  actions: {
    setEditId(id) {
      set({ editId: id });
    },
    setEditContent(content) {
      set({ editContent: content });
    },
    handleEditClick(commentId, content) {
      console.log('edit clicked');
      set({
        editId: commentId,
        editContent: content,
      });
    },
    handleEditCancel() {
      console.log('cancel clicked');
      set({
        editId: null,
        editContent: '',
      });
    },

    onChangeEditContent(e) {
      console.log('content changed');
      set({ editContent: e.target.value });
    },
  },
}));

export const useEditId = () => useCommentStore((state) => state.editId);
export const useEditContent = () => useCommentStore((state) => state.editContent);

export const useCommentActions = () => useCommentStore((state) => state.actions);
