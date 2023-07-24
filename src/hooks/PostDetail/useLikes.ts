import { likePostAPI, unlikePostAPI } from 'apis/post';
import { backUrl } from 'config';
import { useCallback, useEffect, useState } from 'react';
import useSWR from 'swr';
import fetcher from 'utils/fetcher';

const useLikes = (postId: string | undefined) => {
  const { data: user } = useSWR(`${backUrl}/api/users`, fetcher);
  const { data: likeInfo, mutate: mutateLikeInfo } = useSWR(
    `${backUrl}/api/posts/${postId}/like-info`,
    fetcher,
  );

  const [likeCount, setLikeCount] = useState<number>(0);
  const [liked, setLiked] = useState<boolean>(false);

  const handleLikedClick = useCallback(async () => {
    try {
      if (liked) await unlikePostAPI(postId);
      else await likePostAPI(postId, user.id);

      mutateLikeInfo((prev: any) => ({
        ...prev,
        count: liked ? prev.count - 1 : prev.count + 1,
        liked: !liked,
      }));
    } catch (error) {
      console.error(error);
    }
  }, [postId, liked, mutateLikeInfo, user]);

  useEffect(() => {
    if (likeInfo) {
      setLikeCount(likeInfo.likeCount);
      setLiked(likeInfo.liked);
    }
  }, [likeInfo]);

  return {
    user,
    likeCount,
    liked,
    handleLikedClick,
  };
};

export default useLikes;
