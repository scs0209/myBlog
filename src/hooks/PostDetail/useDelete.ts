import { usePostDelete } from 'apis/post';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

const useDeletePost = (postId: string | undefined) => {
  const navigate = useNavigate();
  const { mutateAsync: deletePost } = usePostDelete();

  const handleDeleteClick = useCallback(async () => {
    const confirmResult = window.confirm('정말로 삭제하시겠습니까?');

    if (confirmResult) {
      try {
        await deletePost(postId);

        navigate('/');
      } catch (error: any) {
        alert(error.response.data);
        console.error(error);
      }
    }
  }, [postId, navigate]);

  return handleDeleteClick;
};

export default useDeletePost;
