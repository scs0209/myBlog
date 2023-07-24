import useLikes from 'hooks/PostDetail/useLikes';
import React, { memo } from 'react';
import { useParams } from 'react-router-dom';

import LikeButton from '../../Components/LikedButton';

const LikeSection = () => {
  const { id } = useParams<{ id: string }>();
  const { user, likeCount, liked, handleLikedClick } = useLikes(id);

  return (
    <div>
      <span className="text-gray-400 text-xs dark:text-white">좋아요: {likeCount}</span>
      {user && <LikeButton liked={liked} onClick={handleLikedClick} />}
    </div>
  );
};

export default memo(LikeSection);
