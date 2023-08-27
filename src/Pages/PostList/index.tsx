import HeadInfo from 'Components/common/HeadInfo';
import { CustomFlowbiteTheme, Pagination, Spinner } from 'flowbite-react';
import usePagination from 'hooks/PostList/usePagination';
import usePosts from 'hooks/PostList/usePost';
import { startTransition } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
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
      <div>
        <h1 className="text-3xl font-bold mb-3 dark:text-white">게시글 목록</h1>
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-3 md:px-6 py-3">
                  title
                </th>
                <th scope="col" className="hidden md:table-cell px-6 py-3">
                  views
                </th>
                <th scope="col" className="px-1 md:px-6 py-3">
                  dates
                </th>
              </tr>
            </thead>
            <tbody>
              {currentPagePosts?.map((post: any) => {
                const createdDate = new Date(post.createdAt);
                const dateString = formatDate(createdDate);

                return (
                  <tr
                    key={post.id}
                    onClick={() => handlePostClick(post.id)}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                  >
                    <th
                      scope="row"
                      className="px-2 md:px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white truncate max-w-[150px]"
                    >
                      <Link to={`/main/posts/${post.id}`}>{post.title}</Link>
                    </th>
                    <td className="hidden md:table-cell px-6 py-3">{post.views}</td>
                    <td className="px-1 md:px-6 py-4">{dateString}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
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
