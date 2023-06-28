import React, { memo, useCallback, useEffect, useState } from "react";
import LikeButton from "../../Components/LikedButton";
import useSWR from "swr";
import { backUrl } from "config";
import fetcher from "utils/fetcher";
import { useParams } from "react-router-dom";
import axios from "axios";

const LikeSection = () => {
  const { id } = useParams<{ id: string }>();
  const { data: user } = useSWR(`${backUrl}/api/users`, fetcher);
  const { data: likeInfo, mutate: mutateLikeInfo } = useSWR(
    `${backUrl}/api/posts/${id}/like-info`,
    fetcher
  );

  const [likeCount, setLikeCount] = useState<number>(0);
  const [liked, setLiked] = useState<boolean>(false);

  // 좋아요 추가
  const likePost = async () => {
    try {
      await axios.post(
        `${backUrl}/api/posts/${id}/like`,
        {
          UserId: user.id,
          PostID: id,
        },
        {
          withCredentials: true,
        }
      );

      // 서버 응답이 오면 다시 업데이트
      mutateLikeInfo((prev: any) => ({
        ...prev,
        count: prev.count + 1,
        liked: true,
      }));
    } catch (err) {
      console.error(err);
    }
  };

  // 좋아요 삭제
  const unlikePost = async () => {
    try {
      await axios.delete(`${backUrl}/api/posts/${id}/like`, {
        withCredentials: true,
      });

      // 서버 응답이 오면 다시 업데이트
      mutateLikeInfo((prev: any) => ({
        ...prev,
        count: prev.count - 1,
        liked: false,
      }));
    } catch (err) {
      console.error(err);
    }
  };

  // 좋아요 클릭
  const handleLikedClick = useCallback(async () => {
    // 좋아요 상태 변경을 눌렀을 때 (UI를 즉시 업데이트)
    mutateLikeInfo(
      (prev: any) => ({
        ...prev,
        count: liked ? prev.count - 1 : prev.count + 1,
        liked: !liked,
      }),
      false
    );

    if (liked) {
      await unlikePost();
    } else {
      await likePost();
    }
  }, [id, liked, mutateLikeInfo]);

  useEffect(() => {
    if (likeInfo) {
      setLikeCount(likeInfo.likeCount);
      setLiked(likeInfo.liked);
    }
  }, [likeInfo]);

  return (
    <div>
      <span className="text-gray-400 text-xs dark:text-white">
        좋아요: {likeCount}
      </span>
      {user && <LikeButton liked={liked} onClick={handleLikedClick} />}
    </div>
  );
};

export default memo(LikeSection);