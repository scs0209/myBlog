import HeadInfo from 'Components/common/HeadInfo';
import PostArticle from 'Components/Post/PostArticle';
import { CustomFlowbiteTheme, Pagination, Spinner } from 'flowbite-react';
import usePagination from 'hooks/PostList/usePagination';
import usePosts from 'hooks/PostList/usePost';
import { startTransition } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { formatDate } from 'utils/dateUtil';

import Search from '../../Components/Search';

const customTheme: CustomFlowbiteTheme['pagination'] = {
  pages: {
    base: 'list-none xs:mt-0 mt-2 inline-flex items-center -space-x-px',
  },
};

const PostList = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const pageNum = parseInt(params.get('page') || '1', 10);
  const search = params.get('search') || '';

  const { handlePostClick, currentPagePosts, totalPages } = usePosts(pageNum, search);
  const { handlePageChange } = usePagination(search);

  const handleSearch = (keyword: string) => {
    startTransition(() => {
      navigate(`/main/posts?page=1&search=${keyword}`);
    });
  };

  return (
    <>
      <HeadInfo title="Posts" />
      <div className="min-w-[345px]">
        <h1 className="text-3xl font-bold mb-3 dark:text-white mt-2">게시글 목록</h1>
        <div className="relative overflow-x-auto divide-y divide-gray-200 dark:divide-gray-100">
          {currentPagePosts?.map((post: any) => {
            const createdDate = new Date(post.createdAt);
            const dateString = formatDate(createdDate);

            return (
              <PostArticle
                key={post.id}
                title={post.title}
                onClick={() => handlePostClick(post?.id)}
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
            currentPage={pageNum}
            onPageChange={handlePageChange}
            nextLabel=""
            showIcons
            previousLabel=""
            totalPages={totalPages}
            theme={customTheme}
            className="mt-4"
          />
          <Search onSearch={handleSearch} />
        </div>
      </div>
    </>
  );
};

export default PostList;
