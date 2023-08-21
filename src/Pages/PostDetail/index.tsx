/* eslint-disable */
import HeadInfo from 'Components/common/HeadInfo';
import CommentSection from 'Components/PostDetail/CommentSection';
import LikeSection from 'Components/PostDetail/LikeSection';
import PostInfo from 'Components/PostDetail/PostInfo';
import { Link, useParams } from 'react-router-dom';

import styles from '../../styles/PostDetail.module.css';
import useDeletePost from 'hooks/PostDetail/useDelete';
import { formatDate } from 'utils/dateUtil';
import { useUser } from 'apis/auth';
import { usePostById } from 'apis/post';

const PostDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { data: user, isLoading, isError } = useUser();
  const { data: post, isError: postError } = usePostById(id);

  const handleDeleteClick = useDeletePost(id);

  if (isError || postError) return <div>에러가 발생했습니다.</div>;
  if (!post) return <div className="h-screen">로딩 중...</div>;

  // 원래는 return문 이후에 변수를 선언하는 것은 허용되지 않지만, 조건부 렌더링을 사용하여 변수를 선언하고 렌더링하는 경우는 예외적으로 허용된다.
  const { title, content, createdAt } = post;

  const createdDate = new Date(createdAt);
  const dateString = formatDate(createdDate);

  if (`${createdDate.getFullYear()}` === 'NaN') return <div>로딩중...</div>;

  return (
    <>
      <HeadInfo title={post.title} />
      <div className={`${styles.postDetailContainer} dark:bg-gray-800 dark:border-gray-700`}>
        {post && (
          <>
            <PostInfo title={title} content={content} createdAt={dateString} />
            <div className={styles.flexContainer}>
              <LikeSection />
              <div>
                {user && user.role === 'admin' && (
                  <>
                    <div className="flex flex-wrap items-center ">
                      <span className={styles.deleteSpan} onClick={handleDeleteClick}>
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
