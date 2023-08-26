import { ChangeEvent } from 'react';
import create from 'zustand';

interface State {
  editId: number | null;
  editContent: string;
  setEditId: (id: number | null) => void;
  setEditContent: (content: string) => void;
  handleEditClick: (commentId: number, content: string) => void;
  handleEditCancel: () => void;
  onChangeEditContent: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

export const useCommentStore = create<State>((set) => ({
  editId: null,
  editContent: '',

  setEditId(id) {
    set({ editId: id });
  },

  setEditContent(content) {
    set({ editContent: content });
  },

  handleEditClick: (commentId, content) => {
    console.log('edit clicked');
    set({
      editId: commentId,
      editContent: content,
    });
  },

  handleEditCancel: () => {
    console.log('cancel clicked');
    set({
      editId: null,
      editContent: '',
    });
  },

  onChangeEditContent: (e) => {
    console.log('content changed');
    set({ editContent: e.target.value });
  },
}));
