import useLikes from 'hooks/PostDetail/useLikes';
import React, { memo } from 'react';
import { useParams } from 'react-router-dom';

import LikeButton from '../../Components/LikedButton';

const LikeSection = () => {
  const { id } = useParams<{ id: string }>();
  const { user, likeInfo, handleLikedClick } = useLikes(id);

  return (
    <div>
      <span className="text-gray-400 text-xs dark:text-white">좋아요: {likeInfo?.likeCount}</span>
      {user && <LikeButton liked={likeInfo?.liked} onClick={handleLikedClick} />}
    </div>
  );
};

export default memo(LikeSection);
