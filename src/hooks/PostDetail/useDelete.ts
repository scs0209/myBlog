import { deletePost } from 'apis/post';
import { backUrl } from 'config';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

const useDeletePost = (postId: string | undefined, mutatePost: any) => {
  const navigate = useNavigate();

  const handleDeleteClick = useCallback(async () => {
    const confirmResult = window.confirm('정말로 삭제하시겠습니까?');

    if (confirmResult) {
      try {
        await deletePost(postId);
        mutatePost(`${backUrl}/api/main/posts`, false);
        navigate('/');
      } catch (error: any) {
        alert(error.response.data);
        console.error(error);
      }
    }
  }, [postId, navigate, mutatePost]);

  return handleDeleteClick;
};

export default useDeletePost;
