import { useUser } from 'apis/auth';
import { useLikeInfo, useLikePost, useUnlikePost } from 'apis/like';
import { useCallback } from 'react';

const useLikes = (postId: string | undefined) => {
  const { data: user } = useUser();
  const { data: likeInfo } = useLikeInfo(postId);
  const { mutateAsync: likePost, isLoading } = useLikePost();
  const { mutateAsync: unlikePost } = useUnlikePost();

  const handleLikedClick = useCallback(async () => {
    if (likeInfo.liked) await unlikePost(postId);
    else await likePost({ postId, userId: user.id });
  }, [postId, likeInfo, user]);

  return {
    user,
    likeInfo,
    isLoading,
    handleLikedClick,
  };
};

export default useLikes;
