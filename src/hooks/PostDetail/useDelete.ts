import { usePostDelete } from 'apis/post';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

const useDeletePost = (postId: string | undefined) => {
  const navigate = useNavigate();
  const { mutateAsync: deletePost } = usePostDelete();

  const handleDeleteClick = useCallback(async () => {
    const confirmResult = window.confirm('정말로 삭제하시겠습니까?');

    if (confirmResult) {
      await deletePost(postId);

      navigate('/');
    }
  }, [postId, navigate]);

  return handleDeleteClick;
};

export default useDeletePost;
