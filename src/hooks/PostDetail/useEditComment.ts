import { useUpdateComment } from 'apis/comment';
import { useCallback, useState } from 'react';
import useInput from 'utils/useInput';

const useEditComment = () => {
  const { mutateAsync: updateComment } = useUpdateComment();
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

    updateComment({ commentId: editId, content: editContent });
    setEditId(null);
    setEditContent('');
  }, [editId, editContent]);

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
