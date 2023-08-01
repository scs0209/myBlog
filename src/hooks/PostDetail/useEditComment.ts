import { useCallback, useState } from 'react';
import useInput from 'utils/useInput';

interface CommentActions {
  update: (id: number, content: string) => void;
}

const useEditComment = (commentActions: CommentActions) => {
  const [editId, setEditId] = useState<number | null>(null);
  const [editContent, onChangeEditContent, setEditContent] = useInput('');

  const handleEditClick = useCallback((commentId: number, content: string) => {
    setEditId(commentId);
    setEditContent(content);
  }, []);

  const handleEditCancel = useCallback(() => {
    setEditId(null);
    setEditContent('');
  }, []);

  const handleEditSubmit = useCallback(() => {
    if (editId === null) {
      return;
    }

    commentActions.update(editId, editContent);
    setEditId(null);
    setEditContent('');
  }, [editId, editContent, commentActions]);

  return {
    editId,
    editContent,
    onChangeEditContent,
    handleEditClick,
    handleEditCancel,
    handleEditSubmit,
  };
};

export default useEditComment;
