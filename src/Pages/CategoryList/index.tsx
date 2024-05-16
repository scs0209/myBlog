import { useIncreasePostViews } from 'apis/postList';
import HeadInfo from 'Components/common/HeadInfo';
import PostArticle from 'Components/Post/PostArticle';
import { CustomFlowbiteTheme, Pagination } from 'flowbite-react';
import { useCategoryList } from 'hooks/CategoryList/useCategoryList';
import { usePagination } from 'hooks/CategoryList/usePagination';
import { useParams } from 'react-router';
import { formatDate } from 'utils/dateUtil';

const customTheme: CustomFlowbiteTheme['pagination'] = {
  pages: {
    base: 'list-none xs:mt-0 mt-2 inline-flex items-center -space-x-px',
  },
};

const PAGE_SIZE = 10;

const CategoryList = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const { postData, postError, currentPage } = useCategoryList(categoryId);
  const { mutateAsync: increasePostViews } = useIncreasePostViews();
  const { handlePageChange } = usePagination(categoryId);

  const posts = postData?.data.posts;
  const totalPosts = postData?.data.count ?? 0;
  const totalPages = Math.ceil(totalPosts / PAGE_SIZE);

  const handlePostClick = async (postId: any) => {
    await increasePostViews(postId);
  };

  if (postError) return <div>에러가 발생했습니다.</div>;

  return (
    <>
      <HeadInfo title="Category" />
      <div className="min-h-dvh">
        <h1 className="mb-3 text-3xl font-bold dark:text-white">게시글 목록</h1>
        <div className="relative overflow-x-auto divide-y divide-gray-200 dark:divide-gray-100">
          {posts?.map((post: any) => {
            const createdDate = new Date(post.createdAt);
            const dateString = formatDate(createdDate);

            return (
              <PostArticle
                onClick={() => handlePostClick(post?.id)}
                key={post.id}
                title={post.title}
                content={post.content}
                views={post.views}
                date={dateString}
                id={post.id}
              />
            );
          })}
        </div>
        <div className="flex flex-col items-center justify-center text-center">
          <Pagination
            currentPage={currentPage}
            onPageChange={handlePageChange}
            nextLabel=""
            showIcons
            previousLabel=""
            totalPages={totalPages}
            theme={customTheme}
            className="mt-4"
          />
        </div>
      </div>
    </>
  );
};

export default CategoryList;
