import React, { useCallback, useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router";
import useSWR from 'swr';
import fetcher from "../../utils/fetcher";
import { Link } from "react-router-dom";
import { backUrl } from "../../config";
import { Pagination } from "flowbite-react";
import HeadInfo from "Components/common/HeadInfo";

const CategoryList = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const PAGE_SIZE = 10;

  const [currentPage, setCurrentPage] = useState(1);

  const { data: categoryData, error: categoryError } = useSWR(
    `${backUrl}/api/categories/${categoryId}`,
    fetcher
  );

  const {
    data: postData,
    error: postError,
    mutate,
  } = useSWR(
    `${backUrl}/api/categories/${categoryId}/posts?page=${currentPage}`,
    fetcher
  );

  const posts = postData?.posts;
  const totalPosts = postData?.count ?? 0;
  const totalPages = Math.ceil(totalPosts / PAGE_SIZE);
  const startIdx = 0;
  const endIdx = PAGE_SIZE;
  const [currentPagePosts, setCurrentPagePosts] = useState([]);

  const handlePageChange = useCallback(
    (pageNum: number) => {
      setCurrentPage(pageNum);
      navigate(`/main/categories/${categoryId}?page=${pageNum}`);
      mutate(`${backUrl}/api/categories/${categoryId}/posts?page=${pageNum}`);
    },
    [setCurrentPage, categoryId, mutate, navigate]
  );

  // 추가
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const pageNum = parseInt(params.get("page") || "1", 10);
    setCurrentPage(pageNum);
    mutate(`${backUrl}/api/categories/${categoryId}/posts?page=${pageNum}`);
  }, [location, mutate]);

  //currentPagePosts 변경 될 때마다 업데이트 해줘서 페이지네이션할 때 오류 안나게 해주기 위해 사용
  useEffect(() => {
    if (posts) {
      setCurrentPagePosts(posts?.slice(startIdx, endIdx));
    }
  }, [postData, startIdx, endIdx]);

  if (categoryError || postError) return <div>에러가 발생했습니다.</div>;
  if (!categoryData || !postData) return <div>로딩중</div>;
  if (!Array.isArray(posts)) return <div>게시글 몰록을 불러오는 중입니다.</div>;

  return (
    <>
    <HeadInfo title="Category" />
      <div className="h-screen">
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
                const dateString = `${createdDate.getFullYear()} - ${
                  createdDate.getMonth() + 1
                } - ${createdDate.getDate()}`;
                return (
                  <tr
                    key={post.id}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                  >
                    <th
                      scope="row"
                      className="px-2 md:px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white truncate max-w-[150px]"
                    >
                      <Link to={`/main/posts/${post.id}`}>{post.title}</Link>
                    </th>
                    <td className="hidden md:table-cell px-6 py-3">
                      {post.views}
                    </td>
                    <td className="px-1 md:px-6 py-4">{dateString}</td>
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
            className="mt-4"
          />
        </div>
      </div>
    </>
  );
}

export default CategoryList;