import { useIncreasePostViews } from 'apis/postList';
import HeadInfo from 'Components/common/HeadInfo';
import { CustomFlowbiteTheme, Pagination } from 'flowbite-react';
import { useCategoryList } from 'hooks/CategoryList/useCategoryList';
import { usePagination } from 'hooks/CategoryList/usePagination';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
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
      <div className="h-screen">
        <h1 className="mb-3 text-3xl font-bold dark:text-white">게시글 목록</h1>
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-3 py-3 md:px-6">
                  title
                </th>
                <th scope="col" className="hidden px-6 py-3 md:table-cell">
                  views
                </th>
                <th scope="col" className="px-1 py-3 md:px-6">
                  dates
                </th>
              </tr>
            </thead>
            <tbody>
              {posts?.map((post: any) => {
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
                    <td className="hidden px-6 py-3 md:table-cell">{post.views}</td>
                    <td className="px-1 py-4 md:px-6">{dateString}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
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
