import axios from "axios";
import React, { useCallback } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import useSWR from 'swr';
import fetcher from "../../utils/fetcher";
import { backUrl } from "../../config";
import HeadInfo from "Components/common/HeadInfo";
import styles from "../../styles/PostDetail.module.css"
import PostInfo from "Components/PostDetail/PostInfo";
import LikeSection from "Components/PostDetail/LikeSection";
import CommentSection from "Components/PostDetail/CommentSection";

const PostDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: user } = useSWR(`${backUrl}/api/users`, fetcher);
  const {
    data: post,
    error,
    mutate: mutatePost,
  } = useSWR(`${backUrl}/api/main/posts/${id}`, fetcher);

  // 글 삭제
  const handleDeleteClick = useCallback(() => {
    const confirmResult = window.confirm("정말로 삭제하시겠습니까?");
    if (confirmResult) {
      axios
        .delete(`${backUrl}/api/main/posts/${id}`, {
          withCredentials: true,
        })
        .then(() => {
          mutatePost(`${backUrl}/api/main/posts`, false);
          navigate("/");
        })
        .catch((error) => {
          if (error.response.status === 403) {
            alert("삭제 권한이 없습니다.");
          } else if (error.response && error.response.status === 401) {
            alert(error.response.data);
          } else {
            console.error(error);
          }
        });
    }
  }, [id, navigate, mutatePost]);

  if (error) return <div>에러가 발생했습니다.</div>;
  if (!post) return <div className="h-screen">로딩 중...</div>;

  // 원래는 return문 이후에 변수를 선언하는 것은 허용되지 않지만, 조건부 렌더링을 사용하여 변수를 선언하고 렌더링하는 경우는 예외적으로 허용된다.
  const { title, content, createdAt } = post;

  const createdDate = new Date(createdAt);
  const dateString = `${createdDate.getFullYear()} - ${
    createdDate.getMonth() + 1
  } - ${createdDate.getDate()}`;

  //이걸 해주지 않으면 중간에 NaN이 나온다.
  if (`${createdDate.getFullYear()}` === "NaN") return <div>로딩중...</div>;

  return (
    <>
      <HeadInfo title={post.title} />
      <div
        className={`${styles.postDetailContainer} dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700`}
      >
        {post && (
          <>
            <PostInfo title={title} content={content} createdAt={dateString} />
            <div className={styles.flexContainer}>
              <LikeSection />
              <div>
                {user && user.role === "admin" && (
                  <>
                    <div className="flex items-center flex-wrap ">
                      <span
                        className={styles.deleteSpan}
                        onClick={handleDeleteClick}
                      >
                        삭제
                      </span>
                      <span className={styles.editSpan}>
                        <Link to={`/main/posts/${id}/edit`}>수정</Link>
                      </span>
                    </div>
                  </>
                )}
              </div>
            </div>
          </>
        )}
        <CommentSection />
      </div>
    </>
  );
};

export default PostDetail;
